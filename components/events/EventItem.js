import Button from "../ui/button";
import classes from "./EventItem.module.css";

// import icons
import DateIcon from "../icons/date-icon";

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
		<li className={classes.item}>
			<img src={`/${image}`} alt={title} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{ReadableDate}</time>
					</div>
					<div className={classes.address}>
						<address>{FormattedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={link}>Explore Event</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
