import {
	connectDatabase,
	insertDocument,
	getAllDocuments,
} from "../../../helpers/db.util";

async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Connecting to the database failed" });
	}

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
			res.status(422).json({ message: "Invalid Input" });
			client.close();
			return;
		}

		const newComent = {
			email,
			name,
			text,
			eventId,
		};

		let result;
		try {
			result = await insertDocument(client, "comments", newComent);
			newComent._id = result.insertedId;
			res.status(201).json({ message: "Added comment.", comment: newComent });
		} catch (error) {
			res.status(500).json({ message: "Inserting Comment failed" });
		}
	}

	if (req.method === "GET") {
		try {
			const comments = await getAllDocuments(client, "comments", { _id: -1 });
			res.status(200).json({ comments: comments });
		} catch (error) {
			res.status(500).json({ message: "Getting comments failed" });
		}
	}

	client.close();
}

export default handler;
