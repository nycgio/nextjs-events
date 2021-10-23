import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api.util";

import Head from "next/head";

// components
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
	const event = props.event;

	if (props.hasError) {
		return (
			<div className="center">
				<p>Nothing found...</p>
			</div>
		);
	}

	if (!event) {
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments />
		</Fragment>
	);
}

export const getStaticProps = async (context) => {
	const eventId = context.params.eventId;

	const event = await getEventById(eventId);

	if (!event) {
		return {
			props: { hasError: true },
		};
	}

	return {
		props: {
			event: event,
		},
		// generate every 30 seconds
		revalidate: 30,
	};
};

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();

	const paths = events.map((event) => ({ params: { eventId: event.id } }));
	return {
		paths: paths,
		fallback: true,
	};
};
export default EventDetailPage;
