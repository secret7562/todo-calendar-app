import React, { useState } from "react";
import "./Modal.css";

const formatDate = (date) => {
	if (!date) return "";
	const d = new Date(date);
	const month = `0${d.getMonth() + 1}`.slice(-2);
	const day = `0${d.getDate()}`.slice(-2);
	return `${d.getFullYear()}-${month}-${day}`;
};

const Modal = ({ show, onClose, onSave }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");

	const handleClose = () => {
		setTitle("");
		setDescription("");
		setDate("");
		onClose();
	};

	const handleSubmit = () => {
		// 如果標題為空值則彈出警告，無法儲存 todo 資料
		if (title === "") {
			alert("標題不可為空白!");
			return;
		}
		onSave({
			title,
			description,
			date: formatDate(date) || new Date().toISOString().slice(0, 10),
		});
		setTitle("");
		setDescription("");
		setDate("");
		onClose();
	};

	if (!show) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<span className="close" onClick={handleClose}>
					&times;
				</span>
				<h2>新增代辦事項</h2>
				<input type="text" placeholder="標題" value={title} onChange={(e) => setTitle(e.target.value.trim())} />
				<textarea placeholder="說明/詳情" value={description} onChange={(e) => setDescription(e.target.value.trim())} />
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
				<button onClick={handleSubmit}>儲存</button>
			</div>
		</div>
	);
};

export default Modal;
