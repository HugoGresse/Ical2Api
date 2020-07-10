# Ical 2 Api

Provide a read-only api for any ical feed.

1. Add your ical feed to Ical2Api
2. Events will be synced every 30 minutes.
3. Query the API (see below)

Interested by the service? Contact me at hugo.gresse@gmail.com

### TODO List:

-   [ ] Add slack webhook within iCal2Api using a Slack App
-   [ ] User management
-   [ ] Translation for reminders

# API

#### Get all Events

`https://ical2api.web.app/api/v1/events/`

Parameters:

-   `status=upcoming` = get only upcoming events
-   `status=passed` = get only passed events
-   `icals=<id1,id2, id3>` = query only events for those ical(s) (max 10 id, comma separated)
-   `organizations=<id1,id2, id3>` = query only events parts of the given organisation(s) (max 10 id, comma separated)

#### Get all icals

`https://ical2api.web.app/api/v1/icals/?organizationId=<orgId>`

-   `organizationId=orgId` (required) the organization your icals are linked to
