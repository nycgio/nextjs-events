import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api.util";

function Home(props) {
	return (
		<div>
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
