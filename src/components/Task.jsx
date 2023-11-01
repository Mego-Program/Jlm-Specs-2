import React from 'react';

function Task({ date, title, content, status, assignedTo }) {
    return (
        <div className="task">
            <h3>{title}</h3>
            <p>Creation date: {date}</p>
            <p>Content: {content}</p>
            <p>Status: {status}</p>
            <p>Asssigned to: {assignedTo}</p>
        </div>
    );
}

export default Task;
