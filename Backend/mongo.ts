import { EventModel } from "./model/EventModel";
import { EventFilter } from "./model/EventFilter";
import { User } from "./model/User";
import { ObjectId } from "mongodb";

const { MongoClient } = require("mongodb");

const uri = `mongodb://${process.env.MONGO_AUTH}@${process.env.MONGO_HOST}`;

async function updateEvent(event: EventModel, id: string | ObjectId | undefined = undefined) {
  try {
    const client = new MongoClient(uri);

    const db = client.db("volunteer-hub");
    const collection = db.collection("events");
    if (id !== undefined) {
      event._id = new ObjectId(id);
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: event }, { upsert: true });
    } else await collection.insertOne(event);

    await client.close();
  } catch (e) {
    console.error("Error adding Event: ", e);
  }
}

async function createUser(user: User) {
  try {
    const client = new MongoClient(uri);

    const db = client.db("volunteer-hub");
    const collection = db.collection("users");
    await collection.updateOne({ _id: user._id }, { $set: user }, { upsert: true });

    await client.close();
  } catch (e) {
    console.error("Error adding Event: ", e);
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
    console.error("Error getting Esvents: ", e);
    return [];
  }
}

async function getDocument(collectionName: string, filter: object = {}): Promise<object> {
  try {
    const client = new MongoClient(uri);

    const db = client.db("volunteer-hub");
    const collection = db.collection(collectionName);

    const document = await collection.findOne(filter);

    await client.close();

    return document;
  } catch (e) {
    console.error("Error getting document: ", e);
    return {};
  }
}

module.exports = { updateEvent, getEvents, getDocument, createUser };
