// Chakra UI imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function SelectFontSizeModal({ fontSize, onPress }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sizes = [10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <Button size="xs" onClick={onOpen}>
        Editor Font Size: {fontSize}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Font Size</ModalHeader>
          <ModalBody display="flex" flexDirection="column" gap="2">
            {sizes.map((size) => (
              <Button
                key={size}
                size="lg"
                onClick={() => {
                  onClose();
                  onPress(size);
                }}
              >
                {size}
              </Button>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
