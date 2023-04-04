import { useState } from "react";

// Chakra UI imports
import { Box, Button, useColorModeValue } from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Custom component imports
import ToggleColourModeButton from "./ToggleColourModeButton";
import SelectFontModal from "./SelectFontModal";
import SelectFontSizeModal from "./SelectFontSizeModal";

export default function QuickSettings({
  onChangeFont,
  isLongerThan1400,
  handleToggleVisibility,
  showEditor,
  showNavigation,
  editorFont,
  navigationOnLeft,
  onChangeNavigationPosition,
  editorLeftOfOutput,
  onChangeEditorAndOutputPosition,
  editorFontSize,
  onChangeEditorFontSize,
}) {
  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box p={1} bgColor={bgColor} display="flex" gap="3">
      <ToggleColourModeButton bgColor={bgColor} />
      <SelectFontModal
        onPress={onChangeFont}
        editorFont={editorFont}
        type="editor"
        fontsArray={[
          "monospace",
          "courier new",
          "jetbrains mono",
          "fira code",
          "source code pro",
          "anonymous pro",
        ]}
      />
      <SelectFontSizeModal
        fontSize={editorFontSize}
        onPress={onChangeEditorFontSize}
      />
      <Button size="xs" onClick={onChangeNavigationPosition}>
        Navigation Position: {navigationOnLeft ? "Left" : "Right"}
      </Button>
      <Button size="xs" onClick={onChangeEditorAndOutputPosition}>
        {editorLeftOfOutput ? "Editor-Output" : "Output-Editor"}
      </Button>
      <Button
        size="xs"
        rightIcon={showEditor ? <ViewIcon /> : <ViewOffIcon />}
        onClick={() => handleToggleVisibility("editor")}
      >
        Editor
      </Button>
      {isLongerThan1400 && (
        <Button
          size="xs"
          rightIcon={showNavigation ? <ViewIcon /> : <ViewOffIcon />}
          onClick={() => handleToggleVisibility("navigation")}
        >
          Navigation
        </Button>
      )}
    </Box>
  );
}
