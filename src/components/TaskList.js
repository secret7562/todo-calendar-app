import React from "react";
import "./TaskList.css"; // 引入 TaskList 的 CSS 樣式

const TaskList = ({ tasks, onTodoClick }) => (
	<div className="task-list-container">
		<h2>任務清單</h2>
		<ul>
			{tasks.map((task) => (
				<li key={task.id} className={`task-item ${task.status.toLowerCase()}`} onClick={() => onTodoClick(task)}>
					<h3>{task.title}</h3>
					<p>{task.description}</p>
				</li>
			))}
		</ul>
	</div>
);

export default TaskList;
