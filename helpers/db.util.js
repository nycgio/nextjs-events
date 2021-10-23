import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const client = await MongoClient.connect(
		"mongodb+srv://test:test@cluster0.hl0rx.mongodb.net/events?retryWrites=true&w=majority"
	);
	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();
	const result = await db.collection(collection).insertOne(document);
	return result;
}

export async function getAllDocuments(client, collection, sort = {}) {
	const db = client.db();

	const comments = await db.collection(collection).find().sort(sort).toArray();
	return comments;
}
