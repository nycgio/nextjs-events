import React from "react";
import { getAllEvents } from "../../dummy-data";

import EventList from "../../components/events/EventList";

function EventsIndex() {
	const events = getAllEvents();

	if (!events) {
		return <p>No events found</p>;
	}

	return (
		<div>
			<EventList items={events} />
		</div>
	);
}

export default EventsIndex;
