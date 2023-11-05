import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:4000/specs/tasks-info');
                setTasks(response.data);
            } catch (error) {
                console.error('Error while retrieving data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2>List of existing tasks:</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        Creation date: {task.creationDate} | Title: {task.title} | Content: {task.description} | I.D: {task.id} | Created by: {task.creator}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
