// ReactJS imports
import { useRef } from "react";

// Chakra UI imports
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

export default function DeleteItemAlert({ isOpen, onClose, onDelete, type }) {
  const finalRef = useRef(null);

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} finalFocusRef={finalRef}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          Delete {type === "folder" ? "Folder" : "Note"}
        </AlertDialogHeader>
        <AlertDialogBody>
          Are you sure?{" "}
          {type === "folder" && "All notes inside this folder will be deleted."}{" "}
          This action can't be undone.
        </AlertDialogBody>
        <AlertDialogFooter display="flex" gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              onClose();
              onDelete();
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
