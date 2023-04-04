// Chakra UI imports
import {
  Box,
  IconButton,
  Tooltip,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { EditIcon, AddIcon } from "@chakra-ui/icons";

// Custom component imports
import RenameItemModal from "../RenameItemModal";
import AddItemModal from "../AddItemModal";

export default function ItemSelect({
  id,
  name,
  onPress,
  currentItemId,
  type,
  onRename,
  currentFolderId,
  folderIdOfSelectedNote,
  onChangeFolderIdOfSelectedNote,
}) {
  const itemBgColor = useColorModeValue("gray.50", "gray.600");
  const itemBgColorSelected = useColorModeValue("gray.200", "gray.700");
  const [hover, setHover] = useBoolean();
  const {
    isOpen: isOpenRename,
    onOpen: onOpenRename,
    onClose: onCloseRename,
  } = useDisclosure();

  const {
    isOpen: isOpenAddItem,
    onOpen: onOpenAddItem,
    onClose: onCloseAddItem,
  } = useDisclosure();

  return (
    <>
      <Box
        bgColor={
          type === "folder"
            ? currentItemId === id
              ? itemBgColorSelected
              : itemBgColor
            : currentItemId === id && currentFolderId === folderIdOfSelectedNote
            ? itemBgColorSelected
            : itemBgColor
        }
        py={1.5}
        pl={5}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          onPress(id);
          if (type === "note") {
            onChangeFolderIdOfSelectedNote();
          }
        }}
        onMouseEnter={setHover.on}
        onMouseLeave={setHover.off}
        display="flex"
        justifyContent="space-between"
      >
        {name}
        <Box>
          {/* <Tooltip
            hasArrow
            placement="top"
            label={"Add Subfolder"}
            openDelay={700}
          >
            <IconButton
              variant="none"
              size="xs"
              icon={hover ? <AddIcon /> : null}
              onClick={onOpenAddItem}
            />
          </Tooltip> */}
          <Tooltip hasArrow placement="top" label={"Rename"} openDelay={700}>
            <IconButton
              variant="none"
              size="xs"
              icon={hover ? <EditIcon /> : null}
              onClick={onOpenRename}
            />
          </Tooltip>
        </Box>
      </Box>
      <RenameItemModal
        isOpen={isOpenRename}
        onClose={onCloseRename}
        type={type}
        currentName={name}
        onRename={onRename}
      />
      <AddItemModal
        isOpen={isOpenAddItem}
        onClose={onCloseAddItem}
        type={type}
      />
    </>
  );
}
