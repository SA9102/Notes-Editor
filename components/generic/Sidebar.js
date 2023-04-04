// Chakra UI imports
import {
  Box,
  Text,
  Tooltip,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

// Custom component imports
import ItemSelect from "./ItemSelect";
import InputAddItem from "../InputAddItem";
import AddItemModal from "../AddItemModal";
import DeleteItemAlert from "../DeleteItemAlert";

export default function Sidebar({
  type,
  items,
  onPress,
  onAddItem,
  onDeleteItem,
  currentItemId,
  onRename,
  currentFolderId,
  folderIdOfSelectedNote,
  onChangeFolderIdOfSelectedNote,
  navigationOnLeft,
}) {
  const {
    isOpen: isOpenAddItem,
    onOpen: onOpenAddItem,
    onClose: onCloseAddItem,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteItem,
    onOpen: onOpenDeleteItem,
    onClose: onCloseDeleteItem,
  } = useDisclosure();

  const bgColor = useColorModeValue("gray.500", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.500");
  const titleBgColor = useColorModeValue("gray.400", "gray.800");
  const titleBorderColor = useColorModeValue("gray.300", "gray.700");

  let deleteIcon = null;
  if (items.length) {
    deleteIcon = (
      <Tooltip
        hasArrow
        placement="top"
        label={`Delete ${type === "folder" ? "Folder" : "Note"}`}
        openDelay={700}
      >
        <IconButton
          icon={<DeleteIcon />}
          size="xs"
          variant="ghost"
          onClick={onOpenDeleteItem}
        />
      </Tooltip>
    );
  }

  return (
    <Box
      bgColor={bgColor}
      h="100vh"
      w="40%"
      // flexGrow="5"
      // borderRight={type === "folder" && "1px"}
      borderRight={navigationOnLeft ? "1px" : "0px"}
      borderLeft={!navigationOnLeft ? "1px" : "0px"}
      borderColor={borderColor}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        py={1}
        pl={3}
        bgColor={titleBgColor}
      >
        {type === "folder" ? "FOLDERS" : "NOTES"}
      </Text>
      <Box display="flex" px={3} py={2} gap={1}>
        <Tooltip
          hasArrow
          placement="top"
          label={`New ${type === "folder" ? "Folder" : "Note"}`}
          openDelay={700}
        >
          <IconButton
            icon={<AddIcon />}
            size="xs"
            variant="ghost"
            onClick={onOpenAddItem}
          />
        </Tooltip>
        {deleteIcon}
      </Box>
      <Box
        display="flex"
        py="1px"
        flexDirection="column"
        gap="1px"
        // bgColor="gray.400"
      >
        {items.map((item) => (
          <ItemSelect
            key={item.id}
            id={item.id}
            name={item.name}
            onPress={onPress}
            currentItemId={currentItemId}
            type={type}
            onRename={onRename}
            currentFolderId={currentFolderId}
            folderIdOfSelectedNote={folderIdOfSelectedNote}
            onChangeFolderIdOfSelectedNote={onChangeFolderIdOfSelectedNote}
          />
        ))}
      </Box>
      {isOpenAddItem && (
        <AddItemModal
          isOpen={isOpenAddItem}
          onClose={onCloseAddItem}
          onAddItem={onAddItem}
          type={type}
        />
      )}
      {isOpenDeleteItem && (
        <DeleteItemAlert
          isOpen={isOpenDeleteItem}
          onClose={onCloseDeleteItem}
          onDelete={onDeleteItem}
          type={type}
        />
      )}
    </Box>
  );
}
