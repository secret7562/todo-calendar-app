import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css"

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onTodoClick }) => {
	const [currentDate, setCurrentDate] = useState(new Date());

	const handlePrev = () => {
		const newDate = moment(currentDate).subtract(1, "month").toDate();
		setCurrentDate(newDate);
	};

	const handleNext = () => {
		const newDate = moment(currentDate).add(1, "month").toDate();
		setCurrentDate(newDate);
	};

	const handleEventClick = (event) => {
		const todo = {
			id: event.id,
			title: event.title,
			description: event.description,
			date: event.start,
			status: event.status,
		};
		onTodoClick(todo);
	};

	return (
		<div style={{ height: "85vh", position: "relative" }}>
			<div className="calendar-header">
				<button onClick={handlePrev}>上一個月</button>
				<span className="current-month-year">{moment(currentDate).format("YYYY/MM")}</span>
				<button onClick={handleNext}>下一個月</button>
			</div>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "85vh" }}
				date={currentDate}
				onNavigate={(date) => setCurrentDate(date)}
				onSelectEvent={handleEventClick}
				toolbar={false}
			/>
		</div>
	);
};

export default MyCalendar;
