import React from "react";
import "./TaskBoard.css"; // 引入 TaskBoard 的 CSS 樣式
import TaskStatus from "../TaskStatus";

const TaskBoard = ({ tasks, onTodoClick }) => {
	const renderTasksByStatus = (status) =>
		tasks
			.filter((task) => task.status === status)
			.map((task) => (
				<div key={task.id} className="task-card" onClick={() => onTodoClick(task)}>
					<h3>{task.title}</h3>
					<p>{task.description}</p>
				</div>
			));

	return (
		<div className="task-board-container">
			<h2>任務板</h2>
			<div className="task-status-column">
				<div className="status-column">
					<h3>未開始</h3>
					{renderTasksByStatus(TaskStatus.NOT_STARTED)}
				</div>
				<div className="status-column">
					<h3>進行中</h3>
					{renderTasksByStatus(TaskStatus.IN_PROGRESS)}
				</div>
				<div className="status-column">
					<h3>已完成</h3>
					{renderTasksByStatus(TaskStatus.COMPLETED)}
				</div>
			</div>
		</div>
	);
};

export default TaskBoard;
