import React from "react";
import "./FloatingButton.css";

const FloatingButton = ({ onClick }) => (
	<button className="floating-button" onClick={onClick}>
		+
	</button>
);

export default FloatingButton;
