import React, { Fragment } from "react";
import { getAllEvents } from "../../dummy-data";
import { getFeaturedEvents } from "../../helpers/api.util";

import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/events-search";

function EventsIndex(props) {
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

export const getStaticProps = async (context) => {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
	};
};

export default EventsIndex;
