// Chakra UI imports
import { IconButton, useColorMode } from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleColourModeButton({ bgColor }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="xs"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={() => {
        toggleColorMode();
      }}
      bgColor={bgColor}
      _hover={{
        bgColor: colorMode === "light" ? "gray.400" : "gray.600",
      }}
    />
  );
}
