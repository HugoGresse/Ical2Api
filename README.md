# Meetup 2 Api

Provide a read-only api for Meetup.com.

1. Add your meetupto Meetup2Api
2. Events will be sync when adding it to Meetup2Api and every 30 minutes.
3. Query the API (WIP)
4. (optional) force refresh the events on Meetup2Api if needed.

#### TODO List:

- [ ] Front end to manage the meetup list
- [ ] Firestore rules: only allow owner to write, read everyone
- [x] API
- [ ] Change owner

#### Api Specs

`https://meetup2api.web.app/api/v1/events/`

> get all events

Parameters:

- `status=upcoming` = get only upcoming events
- `status=passed` = get only passed events
- `meetups=<id1,id2, id3>` = query only events for those meetups (max 10 id)

`https://meetup2api.web.app/api/v1/meetups/`

> get all meetups
