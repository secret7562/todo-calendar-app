import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyCalendar from "./components/Calendar";
import TaskBoard from "./components/TaskBoard";
import TaskList from "./components/TaskList";
import FloatingButton from "./components/FloatingButton";
import Modal from "./components/Modal";
import TodoDetailsModal from "./components/TodoDetailsModal";
import "./App.css";
import TaskStatus from "./TaskStatus"; // 引入 TaskStatus 枚舉

const App = () => {
	const [events, setEvents] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showDetailsModal, setShowDetailsModal] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);

	useEffect(() => {
		const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
		const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
		setTasks(savedTasks);
		setEvents(savedEvents);
	}, []);

	const addTodo = (todo) => {
		const newTask = {
			id: tasks.length + 1,
			title: todo.title,
			description: todo.description,
			date: todo.date,
			status: TaskStatus.NOT_STARTED, // 使用 TaskStatus 枚舉
		};
		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
		localStorage.setItem("tasks", JSON.stringify(newTasks));

		const newEvent = {
			id: events.length + 1,
			title: todo.title,
			start: new Date(todo.date),
			end: new Date(todo.date),
		};
		const newEvents = [...events, newEvent];
		setEvents(newEvents);
		localStorage.setItem("events", JSON.stringify(newEvents));
	};

	const handleTodoClick = (todo) => {
		setSelectedTodo(todo);
		setShowDetailsModal(true);
	};

	const handleDeleteTodo = (id) => {
		const updatedTasks = tasks.filter((task) => task.id !== id);
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));

		const updatedEvents = events.filter((event) => event.id !== id);
		setEvents(updatedEvents);
		localStorage.setItem("events", JSON.stringify(updatedEvents));
	};

	const handleUpdateTodo = (updatedTask) => {
		const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));

		const updatedEvents = events.map((event) =>
			event.id === updatedTask.id ? { ...event, title: updatedTask.title, start: updatedTask.date, end: updatedTask.date } : event
		);
		setEvents(updatedEvents);
		localStorage.setItem("events", JSON.stringify(updatedEvents));
	};


	return (
		<Router>
			<div className="App">
				<Navbar />
				<FloatingButton onClick={() => setShowModal(true)} />
				<Modal show={showModal} onClose={() => setShowModal(false)} onSave={addTodo} />
				<TodoDetailsModal
					show={showDetailsModal}
					onClose={() => setShowDetailsModal(false)}
					onDelete={handleDeleteTodo}
					onUpdate={handleUpdateTodo}
					todo={selectedTodo}
				/>
				<Routes>
					<Route
						path="/calendar"
						element={
							<div className="calendar-section">
								<MyCalendar events={events} onTodoClick={handleTodoClick} />
							</div>
						}
					/>
					<Route
						path="/task-list"
						element={
							<div className="task-list-section">
								<TaskList tasks={tasks} onTodoClick={handleTodoClick} />
							</div>
						}
					/>
					<Route
						path="/task-board"
						element={
							<div className="task-board-section">
								<TaskBoard tasks={tasks} onTodoClick={handleTodoClick} />
							</div>
						}
					/>
					<Route path="/" element={<Navigate to="/calendar" />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
