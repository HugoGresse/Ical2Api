# Meetup 2 Api

Provide a read-only api for Meetup.com.

1. Add your meetupto Meetup2Api
2. Events will be sync when adding it to Meetup2Api and every 30 minutes.
3. Query the API (WIP)
4. (optional) force refresh the events on Meetup2Api if needed.

#### TODO List:

- [ ] Front end to manage the meetup list
- [ ] Firestore rules: only allow owner to write, read everyone
- [ ] API
- [ ] Change owner

#### Api Specs

`https://meetup2api.web.app/api/v1/events/`

> get all events

Parameters:

- `filter=upcoming` = filter only for upcoming events
- `filter=passed` = filter only for passed events
- `meetup=<meetupId>` = query only events for this meetup
- `meetups=<id1,id2, id3>` = query only events for those meetups
