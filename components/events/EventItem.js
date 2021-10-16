import Link from "next/link";

function EventItem(props) {
	const { title, image, date, location, id } = props;
	const ReadableDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	const FormattedAddress = location.replace(", ", "\n");
	const link = `/events/${id}`;

	return (
		<li>
			<img src={`/${image}`} alt={title} />
			<div>
				<div>
					<h2>{title}</h2>
					<div>
						<time>{ReadableDate}</time>
					</div>
					<div>
						<address>{FormattedAddress}</address>
					</div>
				</div>
				<div>
					<Link href={link}>Explore Event</Link>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
