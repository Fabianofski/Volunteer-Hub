import { defaultMarkdown } from "./defaultMarkdown";
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const defaultEvent = {
  _id: "",
  maxParticipants: 0,
  minParticipants: 0,
  currentParticipants: 0,
  alias: "",
  time: "",
  about: defaultMarkdown,
  banner:
    "https://firebasestorage.googleapis.com/v0/b/volunteerhub-2ff2b.appspot.com/o/DefaultEvent.png?alt=media&token=1d0a16ba-fa2c-45fe-89c5-182d05d292ff",
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
