import { defaultMarkdown } from "./defaultMarkdown";
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const defaultEvent = {
  maxParticipants: 0,
  minParticipants: 0,
  alias: "",
  time: "",
  about: defaultMarkdown,
  banner: "",
  date: tomorrow.toISOString().substring(0, 10),
  eventId: "",
  eventName: "",
  location: {
    street: "",
    houseNumber: "",
    postalCode: 0,
    town: ""
  },
  organizer: {
    uid: "",
    name: ""
  }
};
