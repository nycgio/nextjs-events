import Button from "../ui/button";
import classes from "./EventItem.module.css";
import Image from "next/image";

// import icons
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

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
			<Image src={`/${image}`} alt={title} width={250} height={160} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>{ReadableDate}</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{FormattedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={link}>
						<span>Explore Event</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
