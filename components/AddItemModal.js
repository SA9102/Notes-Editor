// ReactJS imports
import { useState, useRef } from "react";

// Chakra UI imports
import {
  Input,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

export default function AddItemModal({ isOpen, onClose, onAddItem, type }) {
  const [inputValue, setInputValue] = useState("");

  const finalRef = useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New {type === "folder" ? "Folder" : "Note"}</ModalHeader>
        <ModalBody>
          <Text>Title</Text>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter display="flex" gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              if (inputValue.trim() !== "") {
                onClose();
                onAddItem(inputValue);
              }
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
