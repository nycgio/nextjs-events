import EventItem from "./EventItem";
import classes from "./EventList.module.css";

function EventList(props) {
	const { items } = props;

	return (
		<ul className={classes.list}>
			{items.map((event) => (
				<EventItem
					key={event.id}
					id={event.id}
					image={event.image}
					date={event.date}
					location={event.location}
					id={event.id}
				/>
			))}
		</ul>
	);
}

export default EventList;
