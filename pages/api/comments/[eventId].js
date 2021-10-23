import { MongoClient } from "mongodb";
async function handler(req, res) {
	const eventId = req.query.eventId;
	const client = await MongoClient.connect(
		"mongodb+srv://test:test@cluster0.hl0rx.mongodb.net/events?retryWrites=true&w=majority"
	);

	if (req.method === "POST") {
		const { email, name, text } = req.body;

		// add server side validation
		if (
			!email.includes("@") ||
			!name ||
			name.trim() === "" ||
			!text ||
			text.trim() === ""
		) {
			return res.status(422).json({ message: "Invalid Input" });
		}

		const newComent = {
			email,
			name,
			text,
			eventId,
		};

		const db = client.db();
		const result = await db.collection("comments").insertOne(newComent);
		newComent.id = result.insertedId;
		res.status(201).json({ message: "Added comment.", comment: newComent });
	}

	if (req.method === "GET") {
		const db = client.db();
		const comments = await db
			.collection("comments")
			.find()
			.sort({ _id: -1 })
			.toArray();
		res.status(200).json({ comments: comments });
	}

	client.close();
}

export default handler;
