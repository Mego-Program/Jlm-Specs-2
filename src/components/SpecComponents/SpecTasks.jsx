import React from 'react';

function SpecTasks({ tasks }) {
  return (
    <div>
      <h3>Tasks</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecTasks;
