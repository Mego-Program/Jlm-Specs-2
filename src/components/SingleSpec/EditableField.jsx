import React, { useState } from 'react';
import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
import { Button } from '@mui/material';
import { Box } from '@mui/system';


function EditableField({ content, onSave, field }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(content))
  );

  const handleSave = () => {
    const newContent = editorState.getCurrentContent().getPlainText();
    onSave(newContent, field);
  };

  return (
    <div>
      <Box sx={{padding:1, borderBottom:1, borderColor:'background.y'}} bgcolor={'secondary.light'}>
        <Editor
          editorState={editorState}
          onChange={(newEditorState) => setEditorState(newEditorState)}
        />
      </Box>
      <Button sx={{marginTop:2}} variant="contained" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default EditableField;
EditableField.jsx

// import React, { useState } from 'react';
// import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';
// import { Button } from '@mui/material';
// import { Box } from '@mui/system';

// function EditableField({ tasks, onSave, field }) {
//   const [editorState, setEditorState] = useState(
//     EditorState.createWithContent(ContentState.createFromText(tasks.join('\n')))
//   );

//   const handleSave = () => {
//     const newContent = editorState
//       .getCurrentContent()
//       .getPlainText()
//       .split('\n')
//       .map((task) => task.trim());
//     onSave(newContent, field);
//   };

//   return (
//     <div>
//       <Box sx={{padding:1, borderBottom:1, borderColor:'background.y'}} bgcolor={'secondary.light'}>
//         <Editor
//           editorState={editorState}
//           onChange={(newEditorState) => setEditorState(newEditorState)}
//         />
//       </Box>
//       <Button sx={{marginTop:2}} variant="contained" onClick={handleSave}>
//         Save
//       </Button>
//     </div>
//   );
// }

// export default EditableField;