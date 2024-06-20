import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
	<nav className="navbar">
		<ul>
			<li>
				<Link to="/calendar">日曆</Link>
			</li>
			<li>
				<Link to="/task-list">任務清單</Link>
			</li>
			<li>
				<Link to="/task-board">任務板</Link>
			</li>
		</ul>
	</nav>
);

export default Navbar;
