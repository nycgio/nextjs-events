import React, { Fragment } from "react";
import { getAllEvents } from "../../dummy-data";

import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/events-search";

function EventsIndex() {
	const router = useRouter();
	const events = getAllEvents();

	if (!events) {
		return <p>No events found</p>;
	}

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export default EventsIndex;
