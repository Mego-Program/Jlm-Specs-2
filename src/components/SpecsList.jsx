import React, { useState } from 'react';
import Task from './Task';
import AddTaskButton from './AddTaskButton';

function SpecsList() {
    const [tasks, setTasks] = useState([]);

    const addNewTask = () => {
        const newTask = {
            date: "2023-11-02",
            title: "New task",
            content: "New task content",
            status: "In progress",
            assignedTo: "New user"
        };

        setTasks([...tasks, newTask]);
    };

    return (
        <div className="App">
            <AddTaskButton onClick={addNewTask} />
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    date={task.date}
                    title={task.title}
                    content={task.content}
                    status={task.status}
                    assignedTo={task.assignedTo}
                />
            ))}
        </div>
    );
}

export default SpecsList;

