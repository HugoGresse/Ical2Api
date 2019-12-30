export interface Event {
  id?: string;
  organizationId: string;
  icalId: string;
  title: string;
  description: string;
  startDate: number;
  endDate: number;
  durationInMinutes: number;
  location: string;
  url: string;
  meetupId: string;
}
