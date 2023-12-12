import React, { useRef, useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Toolbar from "./Toolbar";
import "./DescEditor.css";
import { Box } from "@mui/material";

const DescEditor = (props) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      convertFromRaw({
        blocks: props.info.content.blocks,
        entityMap: {},
      })
    )
  );

  const editor = useRef(null);

  const focusEditor = () => {
    editor.current.focus();
  };

  // FOR INLINE STYLES
  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
    HIGHLIGHT: {
      backgroundColor: "#F7A5F7",
    },
    UPPERCASE: {
      textTransform: "uppercase",
    },
    LOWERCASE: {
      textTransform: "lowercase",
    },
    CODEBLOCK: {
      fontFamily: '"fira-code", "monospace"',
      fontSize: "inherit",
      background: "#ffeff0",
      fontStyle: "italic",
      lineHeight: 1.5,
      padding: "0.3rem 0.5rem",
      borderRadius: " 0.2rem",
    },
    SUPERSCRIPT: {
      verticalAlign: "super",
      fontSize: "80%",
    },
    SUBSCRIPT: {
      verticalAlign: "sub",
      fontSize: "80%",
    },
  };

  // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
      case "blockQuote":
        return "superFancyBlockquote";
      case "leftAlign":
        return "leftAlign";
      case "rightAlign":
        return "rightAlign";
      case "centerAlign":
        return "centerAlign";
      case "justifyAlign":
        return "justifyAlign";
      default:
        break;
    }
  };

  return (
    <Box sx={{marginTop:1}}>
      <div className="editor-wrapper" onClick={focusEditor}>
        <Toolbar editorState={editorState} setEditorState={setEditorState} />
        <div className="editor-container">
          <Editor
            ref={editor}
            placeholder="Spec Content"
            editorState={editorState}
            customStyleMap={styleMap}
            blockStyleFn={myBlockStyleFn}
            onChange={(editorState) => {
              const contentState = editorState.getCurrentContent();
              props.set({...props.info, content:convertToRaw(contentState)})
              setEditorState(editorState);
            }}
          />
        </div>
      </div>
    </Box>
  );
};

export default DescEditor;
