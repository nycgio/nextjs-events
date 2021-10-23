function handler(req, res) {
	const evendId = req.query.evendId;

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
			id: new Date().toISOString(),
			email,
			name,
			text,
		};
		res.status(201).json({ message: "Added Comment,", comment: newComent });
	}

	if (req.method === "GET") {
		const dummyList = [
			{ id: "c1", name: "Max", text: "First comment" },
			{
				id: "c2",
				name: "Manny",
				text: "A second comment",
			},
		];

		res.status(200).json({ comments: dummyList });
	}
}

export default handler;
