export interface Event {
  eventId: string;
  eventName: string;
  organizer: Organizer;
  date: string;
  location: string;
  about: string;
  banner: string;
}

export interface Organizer {
  uid: string;
  name: string;
}
