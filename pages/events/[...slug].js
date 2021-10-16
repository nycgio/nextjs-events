import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

// components
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEvents() {
	const router = useRouter();
	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

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
		return (
			<Fragment>
				<div className="center">
					<ErrorAlert>
						<p>Invalid Filter</p>
					</ErrorAlert>
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const FilteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

	if (!FilteredEvents || FilteredEvents.length === 0) {
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

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={FilteredEvents} />
		</Fragment>
	);
}

export default FilteredEvents;
