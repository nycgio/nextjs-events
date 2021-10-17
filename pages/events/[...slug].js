import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api.util";

// components
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEvents(props) {
	const router = useRouter();
	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	if (props.hasError) {
		return (
			<Fragment>
				<div className="center">
					<ErrorAlert>
						<p>No events found</p>
					</ErrorAlert>
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}
	const filteredEvents = props.events;

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<div className="center">
					<ErrorAlert>
						<p>No events found</p>
					</ErrorAlert>
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export const getServerSideProps = async (context) => {
	const { params } = context;
	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	// convert string to number
	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12
	) {
		return {
			props: { hasError: true },
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: filteredEvents,
			date: {
				year: numYear,
				month: numMonth,
			},
		},
	};
};

export default FilteredEvents;
