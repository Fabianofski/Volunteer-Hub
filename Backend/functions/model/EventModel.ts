export interface EventModel {
  eventId: string;
  eventName: string;
  date: string;
  time: string;
  alias: string;
  organizer: Organizer;
  minParticipants: number;
  maxParticipants: number;
  location: Location;
  banner: string;
  about: string;
}

export interface Organizer {
  uid: string;
  name: string;
}

export interface Location {
  street: string;
  houseNumber: string;
  postalCode: number;
  town: string;
}
