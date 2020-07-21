/* eslint-env jest */
const firebase = require('@firebase/testing')
const path = require('path')
const fs = require('fs')

const projectId = 'ical2api'

const uid = 'hugo'

function createApp(
    auth = {
        uid,
        email_verified: true,
    }
) {
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

    // describe('Collection "events"', () => {
    //     it('Read 2 event for a public org', async () => {
    //         const app = createApp()
    //
    //         await createOrg(app, 'org1', {
    //             public: true,
    //             name: 'ORG 1111',
    //             owner: uid,
    //             members: [uid],
    //         })
    //         await createOrg(app, 'orgXXXX', {
    //             public: false,
    //             name: 'orgXXXX',
    //             owner: uid,
    //             members: [uid],
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 1',
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 2',
    //             readToken: "" // not used, event is count
    //         })
    //         await createEvent(app, {
    //             organizationId: 'orgXXXX',
    //             title: 'Event 22XXX',
    //         })
    //         await createEvent(app, {
    //             organizationId: 'orgXXXX',
    //             title: 'Event 333',
    //         })
    //         await createOrgPrivate(app, {
    //             organizationId: 'org1',
    //             readToken: 'azerty',
    //         })
    //
    //         const eventsGet = await app
    //             .collection('events')
    //             .where('organizationId', '==', 'org1')
    //             .get()
    //
    //         const result = await firebase.assertSucceeds(eventsGet)
    //         expect(result.docs.length).toEqual(2)
    //     })
    //
    //     it('Read zero event for a private org with wrong token', async () => {
    //         const app = createApp()
    //
    //         await createOrg(app, 'org1', {
    //             public: false,
    //             name: 'ORG 1111',
    //             owner: uid,
    //             members: [uid],
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 1',
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 1',
    //             readToken: 'azerty',
    //         }) // only this event is fetched because it has a token inside, the other are masked
    //         await createOrgPrivate(app, {
    //             organizationId: 'org1',
    //             readToken: 'not-used-for-event',
    //         })
    //
    //         const eventsGet = await app
    //             .collection('events')
    //             .where('organizationId', '==', 'org1')
    //             .where('readToken', '==', 'rrrRRRrrr')
    //             .get()
    //
    //         const result = await firebase.assertSucceeds(eventsGet)
    //         expect(result.docs.length).toEqual(0)
    //     })
    //
    //     it('Fails to reads event for a private org without token', async () => {
    //         const app = createApp()
    //
    //         await createOrg(app, "org1", {
    //             public: false,
    //             name: "ORG 1111",
    //             owner: uid,
    //             members: [uid]
    //         })
    //         await createOrgPrivate(app, {
    //             organizationId: "org1",
    //             readToken: "azerty"
    //         })
    //         await createEvent(app, {
    //             organizationId: "org1",
    //             title: "Event 1",
    //             readToken: "azerty"
    //         })
    //         await createEvent(app, {
    //             organizationId: "org1",
    //             title: "Event 1"
    //         }) // no token
    //
    //         const eventsGet = app
    //             .collection('events')
    //             .where('organizationId', "==", "org1")
    //             .get()
    //
    //         firebase.assertFails(eventsGet)
    //     })
    //
    //     it('Read one event for a private org with valid token', async () => {
    //         const app = createApp()
    //
    //         await createOrg(app, 'org1', {
    //             public: false,
    //             name: 'ORG 1111',
    //             owner: uid,
    //             members: [uid],
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 1',
    //         })
    //         await createEvent(app, {
    //             organizationId: 'org1',
    //             title: 'Event 1',
    //             readToken: 'azerty',
    //         }) // only this event is fetched because it has a token inside, the other are masked
    //         await createOrgPrivate(app, {
    //             organizationId: 'org1',
    //             readToken: 'not-used-for-event',
    //         })
    //
    //         const eventsGet = await app
    //             .collection('events')
    //             .where('organizationId', '==', 'org1')
    //             .where('readToken', '==', 'azerty')
    //             .get()
    //
    //         const result = await firebase.assertSucceeds(eventsGet)
    //         expect(result.docs.length).toEqual(1)
    //     })
    // })

    describe('Collection "organizations"', () => {
        it('Create and read public org', async () => {
            const app = createApp()

            await createOrg(app, 'org1', {
                public: true,
                name: 'ORG 123',
                owner: uid,
                members: [uid],
            })

            const get = await app
                .collection('organizations')
                .doc('org1')
                .get()

            const result = await firebase.assertSucceeds(get)
            const data = result.data()
            expect(data.public).toEqual(true)
            expect(data.name).toEqual('ORG 123')
        })
        //
        // it('Create a private org and fail to read it (no token)', async () => {
        //     const app = createApp()
        //
        //     const create = await createOrg(app, 'org1', {
        //         public: false,
        //         name: 'ORG 123',
        //         owner: uid,
        //         members: [uid],
        //     })
        //     firebase.assertSucceeds(create)
        //
        //     const get = app
        //         .collection('organizations')
        //         .doc('org1')
        //         .get()
        //
        //     await firebase.assertFails(get)
        // })
        //
        // it('Create a private org and fail to read it (no token, from list)', async () => {
        //     const app = createApp()
        //
        //     const create = await createOrg(app, 'org1', {
        //         public: false,
        //         name: 'ORG 123',
        //         owner: uid,
        //         members: [uid],
        //     })
        //     firebase.assertSucceeds(create)
        //
        //     const get = app
        //         .collection('organizations')
        //         .where('organizationId', '==', 'org1')
        //         .get()
        //
        //     await firebase.assertFails(get)
        // })

        it('Create a private org and succeed to read it (with token, from list)', async () => {
            const app = createApp()

            const orgId = 'org1'
            const create = await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })
            firebase.assertSucceeds(create)

            const get = await app
                .collection('organizations')
                .where('readToken', '==', 'myToken')
                .where('organizationId', '==', orgId)
                .get()

            const result = await firebase.assertSucceeds(get)
            expect(result.docs.length).toEqual(1)
            const data = result.docs[0].data()
            expect(data.public).toEqual(false)
            expect(data.name).toEqual('ORG Tartiflette')
        })

        it('Create some private org and failed to read it without: admin & token', async () => {
            const app = createApp()
            const appWithoutAdmin = createApp({
                uid: 'notme',
                email_verified: true,
            })

            const orgId = 'org1'
            const create = await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })
            firebase.assertSucceeds(create)

            const get = appWithoutAdmin
                .collection('organizations')
                .where('organizationId', '==', orgId)
                .get()

            await firebase.assertFails(get)
        })

        it('Create some private org and list zero due to another admin do not have any one for him', async () => {
            const app = createApp()
            const appWithoutAdmin = createApp({
                uid: 'NOTME',
                email_verified: true,
            })

            const orgId = 'org1'
            const create = await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })
            firebase.assertSucceeds(create)

            const get = await appWithoutAdmin
                .collection('organizations')
                .where('members', 'array-contains', 'NOTME')
                .get()

            const result = await firebase.assertSucceeds(get)
            expect(result.docs.length).toEqual(0)
        })

        it('Create some private org and list one of them as a member with another login', async () => {
            const app = createApp()
            const appWithoutAdmin = createApp({
                uid: 'Tortue1',
                email_verified: true,
            })

            const orgId = 'org1'
            const orgId2 = 'org22'
            await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })
            await createOrg(app, orgId2, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId2,
                owner: uid,
                members: [uid, 'Tortue1'],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId2,
                readToken: 'myToken',
            })

            const getMember = await appWithoutAdmin
                .collection('organizations')
                .where('members', 'array-contains', 'Tortue1')
                .get()

            const getAdmin = await app
                .collection('organizations')
                .where('members', 'array-contains', uid)
                .get()

            const result = await firebase.assertSucceeds(getMember)
            expect(result.docs.length).toEqual(1)
            const result2 = await firebase.assertSucceeds(getAdmin)
            expect(result2.docs.length).toEqual(2)
        })

        it('Create some private org and success to list all', async () => {
            const app = createApp()
            const appWithoutAdmin = createApp({
                uid: 'notme',
                email_verified: true,
            })

            const orgId = 'org1'
            const orgId2 = 'org2'
            const orgIdNotMe = 'orgIdNotMe'
            await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })
            await createOrg(app, orgId2, {
                public: false,
                name: 'ORG orgId2',
                organizationId: orgId2,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId2,
                readToken: 'myToken',
            })
            await createOrg(appWithoutAdmin, orgIdNotMe, {
                public: false,
                name: 'ORG orgIdNotMe',
                organizationId: orgIdNotMe,
                owner: 'notme',
                members: ['notme'],
                readToken: 'aaaa',
            })
            await createOrgPrivate(appWithoutAdmin, {
                organizationId: orgIdNotMe,
                readToken: 'aaaa',
            })

            const get = await app
                .collection('organizations')
                .where('members', 'array-contains', uid)
                .get()

            const result = await firebase.assertSucceeds(get)
            expect(result.docs.length).toEqual(2)
        })

        it('Create a private org ad fail to read it (read, not list)', async () => {
            const app = createApp()
            const appWithoutAdmin = createApp({
                uid: 'notme',
                email_verified: true,
            })

            const orgId = 'org1'
            await createOrg(app, orgId, {
                public: false,
                name: 'ORG Tartiflette',
                organizationId: orgId,
                owner: uid,
                members: [uid],
                readToken: 'myToken',
            })
            await createOrgPrivate(app, {
                organizationId: orgId,
                readToken: 'myToken',
            })

            const get = app
                .collection('organizations')
                .doc(orgId)
                .get()

            await firebase.assertFails(get)
        })

        // UPDATE

        // DELETE
    })
})
