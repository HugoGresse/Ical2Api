# Ical 2 Api

Provide a read-only api for any ical feed.

1. Add your ical feed to Ical2Api
2. Events will be synced every 30 minutes.
3. Query the API (see below)

#### Use it: [ical2api.web.app](https://ical2api.web.app/)  
#### Event demo: [🖥 here](https://ical2api.web.app/o/9Y6UMiuKiWTyu12Sjetn/events-upcoming)
#### API: [here](https://github.com/HugoGresse/Ical2Api#api)

----

[<img alt="website" src="https://raw.githubusercontent.com/HugoGresse/Ical2Api/master/public/screenshot-website.png" width="500">](https://github.com/HugoGresse/Ical2Api/raw/master/public/screenshot-website.png)

Slack reminders (upon creation, before X hours, weekly sumup)

[<img alt="Slack reminder" src="https://raw.githubusercontent.com/HugoGresse/Ical2Api/master/public/screenshot-reminder.png" width="500" height="300">](https://github.com/HugoGresse/Ical2Api/raw/master/public/screenshot-website.png)

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

#### Add/Edit organization, icals & events

The API to write on iCal2Api is not yet made. While you can use the website to do this, you can also vote on those issues if you want this prioritized:

-   [organization edit](https://github.com/HugoGresse/Ical2Api/issues/8)
-   [icals add/edit](https://github.com/HugoGresse/Ical2Api/issues/10)
-   [reminders add/edit/read](https://github.com/HugoGresse/Ical2Api/issues/9)
-   [events manual add/edit](https://github.com/HugoGresse/Ical2Api/issues/11)


# About
Open source project made by [Hugo Gresse](https://hugo.gresse.io)  
My other open source projects:
- [Open Feedback (speaker/conference/meetup event feedback SASS)](https://openfeedback.io/)
- [Fill My Slides (Google Slide as template for generating thumbnail using .json data)](https://github.com/HugoGresse/Fill-My-Slides)
