// EditableDate.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const EditableDate = ({ date, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [newDate, setNewDate] = useState(date);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(newDate);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <TextField
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </>
      ) : (
        <>
          {date && <span>{date}</span>}
          <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditClick}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

export default EditableDate;
