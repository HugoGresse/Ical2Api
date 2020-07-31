export interface Event {
    id?: string
    organizationId: string
    icalFileId: string
    title: string
    description: string
    startDate: number
    endDate: number
    durationInMinutes: number
    location: string
    url: string
    icalId: string
    icalName: string
}
