import React, { Fragment } from "react";
import { getAllEvents } from "../../dummy-data";

import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/events-search";

function EventsIndex() {
	const events = getAllEvents();

	if (!events) {
		return <p>No events found</p>;
	}

	return (
		<Fragment>
			<EventSearch />
			<EventList items={events} />
		</Fragment>
	);
}

export default EventsIndex;
