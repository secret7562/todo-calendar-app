import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onTodoClick }) => {
	const handleEventClick = (event) => {
		const todo = {
			id: event.id,
			title: event.title,
			description: event.description, // 如果有的話
			date: event.start, // 事件的開始日期
			status: event.status,
		};
		onTodoClick(todo);
	};

	console.log(events); // 調試輸出

	return (
		<div style={{ height: "85vh" }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "85vh" }}
				onSelectEvent={handleEventClick} // 當事件被選擇時調用 handleEventClick 函數
				toolbar={false}
			/>
		</div>
	);
};

export default MyCalendar;
