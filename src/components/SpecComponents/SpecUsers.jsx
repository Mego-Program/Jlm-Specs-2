import React from 'react';

function SpecUsers({ users }) {
  return (
    <div>
      <h3>Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecUsers;

