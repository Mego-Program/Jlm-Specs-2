import React from 'react';

function SpecTeam({ team }) {
  return (
    <div>
      <h3>Team:</h3>
      <ul>
        {team.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecTeam;

