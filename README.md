# Ical 2 Api

Provide a read-only api for any ical feed.

1. Add your ical feed to Ical2Api
2. Events will be synced every 30 minutes.
3. Query the API (see below)

#### TODO List:

-   [ ] reformat the api to include organization
-   [ ] Front end to manage the ical list and organization
-   [ ] User management
-   [ ] Translation for reminders

#### API

##### Get all Events

`https://ical2api.web.app/api/v1/events/`

Parameters:

-   `status=upcoming` = get only upcoming events
-   `status=passed` = get only passed events
-   `meetups=<id1,id2, id3>` = query only events for those icals (max 10 id)

###### Get all icals

`https://ical2api.web.app/api/v1/icals/?organizationId=<orgId>`

-   `organizationId=orgId` (required) the organization your icals are linked to
    (TODO)
