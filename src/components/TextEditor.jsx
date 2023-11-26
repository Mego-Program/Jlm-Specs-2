import React, { useEffect, useRef, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
} from "draft-js";
import Toolbar from "./Toolbar";
import "./TextEditor.css";



const TextEditor = (props) => {

  const editor = useRef(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const focusEditor = () => {
    editor.current.focus();
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(props.info, command);
    if (newState) {
      props.set(newState);
      return true;
    }
    return false;
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
    <div className="editor-wrapper" onClick={focusEditor}>
      <Toolbar editorState={props.info} setEditorState={props.set} />
      <div className="editor-container">
        <Editor
          ref={editor}
          placeholder="Write Here"
          handleKeyCommand={handleKeyCommand}
          editorState={props.info}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={(editorState) => {
            const contentState = editorState.getCurrentContent();
            const contentObject = convertToRaw(contentState);
            if (contentObject.blocks[0].text === '') {props.setDisable(true)}
            else {props.setDisable(false)}

            props.set(editorState);
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
