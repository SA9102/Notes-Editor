// CSS imports
import styles from "../src/styles/Preview.module.css";

// Chakra UI imports
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

// Other imports
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function Heading(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

export default function Preview({ contents, font }) {
  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box
      w="100%"
      h="100vh"
      fontFamily="monospace"
      overflowY="scroll"
      className={styles.box}
      bgColor={bgColor}
    >
      <ReactMarkdown
        className={styles.markdown}
        remarkPlugins={[remarkGfm]}
        renderers={{ Heading: Heading }}
      >
        {contents}
      </ReactMarkdown>
    </Box>
  );
}
