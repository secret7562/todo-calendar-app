import React, { useState, useEffect } from "react";
import "./TodoDetailsModal.css";
import TaskStatus from "../TaskStatus";

const formatDate = (date) => {
	if (!date) return "";
	const d = new Date(date);
	const month = `0${d.getMonth() + 1}`.slice(-2);
	const day = `0${d.getDate()}`.slice(-2);
	return `${d.getFullYear()}-${month}-${day}`;
};

const TodoDetailsModal = ({ show, onClose, todo, onDelete, onUpdate }) => {
	const [editedTodo, setEditedTodo] = useState({
		title: "",
		description: "",
		date: "",
		status: TaskStatus.NOT_STARTED,
	});
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		if (todo) {
			setEditedTodo({
				title: todo.title || "",
				description: todo.description || "",
				date: todo.date ? formatDate(todo.date) : "",
				status: todo.status || TaskStatus.NOT_STARTED,
			});
		}
	}, [todo]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedTodo({
			...editedTodo,
			[name]: value,
		});
	};

	const handleUpdate = () => {
		const updatedTask = {
			...todo, // 保留原來的任務對象的其餘屬性
			...editedTodo, // 更新編輯後的屬性
		};
		onUpdate(updatedTask); // 將整個更新後的任務對象傳遞給 onUpdate 函數
		onClose(); // 關閉模態框
	};

	const handleDelete = () => {
		setConfirmDelete(true);
	};

	const handleConfirmDelete = () => {
		onDelete(todo.id);
		onClose();
		setConfirmDelete(false);
	};

	const handleCancelDelete = () => {
		setConfirmDelete(false);
	};

	const handleStatusChange = (e) => {
		const newStatus = e.target.value;
		setEditedTodo({
			...editedTodo,
			status: newStatus,
		});
	};

	useEffect(() => {
		if (todo) {
			setEditedTodo({
				title: todo.title || "",
				description: todo.description || "",
				date: todo.date ? formatDate(todo.date) : "",
				status: todo.status || TaskStatus.NOT_STARTED,
			});
		}
	}, [todo]);

	if (!show) {
		return null;
	}

	return (
		<div>
			<div className="modal-overlay">
				<div className="modal-content">
					<span className="close" onClick={onClose}>
						&times;
					</span>
					<h2>編輯代辦事項</h2>
					<div className="form-group">
						<label>標題:</label>
						<input type="text" name="title" value={editedTodo.title} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>說明:</label>
						<textarea name="description" value={editedTodo.description} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>日期:</label>
						<input type="date" name="date" value={editedTodo.date} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>狀態:</label>
						<select name="status" value={editedTodo.status} onChange={handleStatusChange}>
							<option value={TaskStatus.NOT_STARTED}>未開始</option>
							<option value={TaskStatus.IN_PROGRESS}>進行中</option>
							<option value={TaskStatus.COMPLETED}>已完成</option>
						</select>
					</div>
					<button onClick={handleUpdate}>編輯</button>
					<button onClick={handleDelete}>刪除</button>
				</div>
			</div>
			{confirmDelete && (
				<div className="modal-overlay">
					<div className="confirm-delete">
						<p>確定要刪除此代辦事項嗎?</p>
						<button onClick={handleConfirmDelete}>確定</button>
						<button onClick={handleCancelDelete}>取消</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoDetailsModal;
