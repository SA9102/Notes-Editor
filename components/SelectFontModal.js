// Chakra UI imports
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function SelectFontModal({
  type,
  fontsArray,
  onPress,
  editorFont,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size="xs" onClick={onOpen}>
        Editor Font:{" "}
        {editorFont
          .split(" ")
          .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
          .join(" ")}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Select {type === "editor" ? "editor " : ""}font
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="2">
            {fontsArray.map((item) => (
              <Button
                key={item}
                size="lg"
                fontFamily={item}
                onClick={() => {
                  onClose();
                  onPress(item, type);
                }}
              >
                {item}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
