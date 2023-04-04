// ReactJS imports
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

import styles from "../src/styles/Editor.module.css";

// Chakra UI imports
import { Box, Textarea, Text, useColorModeValue } from "@chakra-ui/react";

// Other imports
// import { EditorState } from "@codemirror/state";
// import { EditorView, keymap } from "@codemirror/view";
// import { defaultKeymap } from "@codemirror/commands";
// import { oneDark } from "@codemirror/theme-one-dark";
// import { markdown } from "@codemirror/lang-markdown";

export default function Editor({ value, onChange, font, fontSize }) {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  // const [input, setInput] = useState("");

  // const onUpdate = EditorView.updateListener.of((v) => {
  //   // flushSync(() => {
  //   //   setInput(v.state.doc.toString());
  //   // });
  //   // onChange(input);
  //   setInput(v.state.doc.toString());
  //   // console.log("ok");
  //   onChange(input);
  // });

  // const editorRef = useRef(null);

  // useEffect(() => {
  //   const startState = EditorState.create({
  //     doc: "Hello world",
  //     extensions: [keymap.of(defaultKeymap), oneDark, markdown(), onUpdate],
  //   });

  //   const view = new EditorView({
  //     state: startState,
  //     parent: editorRef.current,
  //   });

  //   return () => {
  //     view.destroy();
  //   };
  // }, []);

  return (
    <>
      <Textarea
        // flexGrow="1"
        w="100%"
        className={styles.editor}
        bgColor={bgColor}
        h="100vh"
        resize="horizontal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fontFamily={font === "default" ? "monospace" : font}
        fontSize={fontSize}
        borderRadius={0}
        border="none"
        lineHeight="6"
      />
      {/* <Box
        w="50%"
        alignSelf="stretch"
        height="100vh"
        ref={editorRef}
        className={styles.editor}
      ></Box> */}
    </>
  );
}
