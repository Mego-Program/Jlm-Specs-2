import React, { useState } from 'react';
import { Editor, EditorState, ContentState, convertToRaw } from 'draft-js';

function EditableField({ content, onSave }) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(content))
  );

  const handleSave = () => {
    const newContent = editorState.getCurrentContent().getPlainText();
    onSave(newContent);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={(newEditorState) => setEditorState(newEditorState)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default EditableField;

