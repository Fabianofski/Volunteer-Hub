import { EventModel } from "./model/EventModel";
import { EventFilter } from "./model/EventFilter";

const { MongoClient } = require("mongodb");

const uri = `mongodb://${process.env.MONGO_HOST}`;

async function createEvent(event: EventModel) {
  try {
    const client = new MongoClient(uri);

    const db = client.db("volunteer-hub");
    const collection = db.collection("events");
    const result = await collection.insertOne(event);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

    const data = await collection.findOne({ _id: result.insertedId });
    console.log(data);

    await client.close();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getEvents(filter: EventFilter): Promise<EventModel[]> {
  try {
    const client = new MongoClient(uri);

    const db = client.db("volunteer-hub");
    const collection = db.collection("events");

    const documents = await collection.find();
    const documentArray: EventModel[] = await documents.toArray();

    await client.close();

    return documentArray;
  } catch (e) {
    console.error("Error adding document: ", e);
    return [];
  }
}

module.exports = { createEvent, getEvents };
