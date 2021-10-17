import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api.util";

import Head from "next/head";
import Link from "next/link";

function Home(props) {
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name="description"
					content="Find a lot of great events around your area!"
				/>
			</Head>
			<EventList items={props.events} />
		</div>
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

export default Home;
