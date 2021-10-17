import React, { Fragment } from "react";
import Head from "next/head";
import { getAllEvents } from "../../helpers/api.util";
import { useRouter } from "next/router";

import EventList from "../../components/events/EventList";
import EventSearch from "../../components/events/events-search";

function EventsIndex(props) {
	const router = useRouter();
	const { events } = props;
	if (!events) {
		return <p>No events found</p>;
	}

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	};

	return (
		<Fragment>
			<Head>
				<title>All Events</title>
				<meta name="description" content="Find all events" />
			</Head>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export const getStaticProps = async (context) => {
	const events = await getAllEvents();

	return {
		props: {
			events: events,
		},
		// refresh every 60 seconds
		revalidate: 60,
	};
};

export default EventsIndex;
