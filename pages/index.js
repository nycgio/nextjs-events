import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api.util";

import Head from "next/head";
import Link from "next/link";
import NewsletterRegistration from "../components/input/newsletter-registration";

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
			<NewsletterRegistration />
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
