/* eslint-env jest */
const firebase = require('@firebase/testing')
const path = require('path')
const fs = require('fs')

const projectId = 'ical2api'

const uid = 'hugo'

function createApp() {
    const auth = {
        uid,
        email_verified: true,
    }
    return firebase.initializeTestApp({ projectId, auth }).firestore()
}

function createOrg(app, orgId, data) {
    return app
        .collection('organizations')
        .doc(orgId)
        .set(data, { merge: true })
}
function createOrgPrivate(app, data) {
    return app
        .collection('organizationsPrivateData')
        .doc(data.organizationId)
        .set(data)
}
function createEvent(app, data) {
    return app.collection('events').add(data)
}

describe('Firestore rules', () => {
    beforeAll(async () => {
        const rulesPath = path.join(__dirname, 'firestore.rules')
        const rules = fs.readFileSync(rulesPath, 'utf8')
        await firebase.loadFirestoreRules({ projectId, rules })
    })

    afterAll(async () => {
        await Promise.all(firebase.apps().map(app => app.delete()))
    })

    beforeEach(async () => {
        await firebase.clearFirestoreData({ projectId })
    })

    describe('Collection "events"', () => {
        it('Read one event for a public org', async () => {
            const app = createApp()

            await createOrg(app, 'org1', {
                public: true,
                name: 'ORG 1111',
                owner: uid,
                members: [uid],
            })
            await createEvent(app, {
                organizationId: 'org1',
                title: 'Event 1',
            })
            await createOrgPrivate(app, {
                organizationId: 'org1',
                readToken: 'azerty',
            })

            const eventsGet = await app
                .collection('events')
                .where('organizationId', '==', 'org1')
                .get()

            const result = await firebase.assertSucceeds(eventsGet)
            expect(result.docs.length).toEqual(1)
        })

        // it('Read zero event for a private org with wrong token', async () => {
        //     const app = createApp()
        //
        //     await createOrg(app, "org1", {
        //         public: false,
        //         name: "ORG 1111",
        //         owner: uid,
        //         members: [uid]
        //     })
        //     await createEvent(app, {
        //         organizationId: "org1",
        //         title: "Event 1"
        //     })
        //     await createOrgPrivate(app, {
        //         organizationId: "org1",
        //         readToken: "azerty"
        //     })
        //
        //     const eventsGet = await app
        //         .collection('events')
        //         .where('organizationId', "==", "org1")
        //         .where('token', 'in', ['azerty', ""])
        //         .get()
        //
        //     // TO FIX
        //     const result = await firebase.assertFails(eventsGet)
        //     // expect(result.docs.length).toEqual(0)
        // })

        // TO FIX
        // it('Fails to reads event for a private org without token', async () => {
        //     const app = createApp()
        //
        //     await createOrg(app, "org1", {
        //         public: false,
        //         name: "ORG 1111",
        //         owner: uid,
        //         members: [uid]
        //     })
        //     await createEvent(app, {
        //         organizationId: "org1",
        //         title: "Event 1"
        //     })
        //     await createOrgPrivate(app, {
        //         organizationId: "org1",
        //         readToken: "azerty"
        //     })
        //
        //     const eventsGet = await app
        //         .collection('events')
        //         .where('organizationId', "==", "org1")
        //         .get()
        //
        //     const result = await firebase.assertFails(eventsGet)
        // })

        it('Read one event for a private org with valid token', async () => {
            const app = createApp()

            await createOrg(app, 'org1', {
                public: false,
                name: 'ORG 1111',
                owner: uid,
                members: [uid],
            })
            await createEvent(app, {
                organizationId: 'org1',
                title: 'Event 1',
            })
            await createEvent(app, {
                organizationId: 'org1',
                title: 'Event 1',
                token: '',
            }) // only this event is fetched because it has an empty token value in it
            await createOrgPrivate(app, {
                organizationId: 'org1',
                readToken: 'azerty',
            })

            const eventsGet = await app
                .collection('events')
                .where('organizationId', '==', 'org1')
                .where('token', 'array-contains-any', ['', 'azerty'])
                .get()

            const result = await firebase.assertSucceeds(eventsGet)
            expect(result.docs.length).toEqual(1)
        })
    })
})
