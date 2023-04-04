// ReactJS imports
import { useState } from "react";

// Chakra UI imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";

export default function RenameItemModal({
  isOpen,
  onClose,
  type,
  currentName,
  onRename,
}) {
  const [input, setInput] = useState(currentName);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Rename {type === "folder" ? "Folder" : "Note"}
        </ModalHeader>
        <ModalBody display="flex" flexDirection="column" gap={2}>
          <Text>New name:</Text>
          <Input
            variant="filled"
            size="md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </ModalBody>
        <ModalFooter display="flex" gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (input.trim() !== "") {
                onClose();
                onRename(type, input.trim());
              }
            }}
          >
            Rename
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
