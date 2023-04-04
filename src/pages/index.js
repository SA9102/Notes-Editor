// ReactJS imports
import { useState } from "react";

// NextJS component imports
import Head from "next/head";

// Chakra UI imports
import { Box, useMediaQuery } from "@chakra-ui/react";

// Custom component imports
import Editor from "../../components/Editor";
import Preview from "../../components/Preview";
import Sidebar from "../../components/generic/Sidebar";
import QuickSettings from "../../components/QuickSettings";

// Other imports
import produce from "immer";

export default function Home() {
  // An array containing all folders
  const [folders, setFolders] = useState(foldersMockup);
  // The ID of the currently selected folder
  const [currentFolderId, setCurrentFolderId] = useState(0);
  // The ID of the note whose contents are currently displayed
  const [currentNoteId, setCurrentNoteId] = useState(-1);
  // The ID of the folder that contains the note currently selected
  const [folderIdOfSelectedNote, setFolderIdOfSelectedNote] = useState(0);
  // The content of the currently selected note.
  const [noteContent, setNoteContent] = useState("");
  // The font family of the editor.
  const [editorFont, setEditorFont] = useState("monospace");
  // The font size of the editor
  const [editorFontSize, setEditorFontSize] = useState("13");
  // The font family of the output.
  const [outputFont, setOutputFont] = useState("monospace");

  const [drawerIsOpen, setDrawerIsOpen] = useState("false");
  // A boolean representing the visibility of the editor
  const [showEditor, setShowEditor] = useState("true");
  // A boolean representing the visibility of the navigation panels (i.e. folders and notes)
  const [showNavigation, setShowNavigation] = useState("true");
  // A boolean representing whether the navigation panels are on the left or right side of the screen
  const [navigationOnLeft, setNavigationOnLeft] = useState(true);
  // A boolean representing whether the editor is to the left or to the right of the output
  const [editorLeftOfOutput, setEditorLeftOfOutput] = useState(true);
  // A boolean representing whether the editor and output are displaying in a horizontal or vertical manner
  const [horizontalDisplay, setHorizontalDisplay] = useState(true);

  const [isLongerThan1400] = useMediaQuery("(min-width: 1400px)");

  // Selecting a folder
  const handleSelectfolder = (newfolderId) => {
    setCurrentFolderId(newfolderId);
  };

  // Selecting a note from a folder
  const handleSelectNote = (noteId) => {
    const selectedNote = arrayOfCurrentNotes.find(
      (note) => note.id === noteId
    ).content;
    setCurrentNoteId(noteId);
    setNoteContent(selectedNote);
  };

  const handleChangeFolderIdOfSelectedNote = () =>
    setFolderIdOfSelectedNote(currentFolderId);

  // When changing the content of the current note via the input
  const handleInputNoteContent = (value) => {
    setNoteContent(value);
    setFolders(
      produce((draft) => {
        const currentfolder = draft.find(
          (folder) => folder.id === currentFolderId
        );
        let currentNote = currentfolder.notes.find(
          (note) => note.id === currentNoteId
        );
        currentNote.content = value;
      })
    );
  };

  // Creating a new folder
  const handleCreatefolder = (name) => {
    // Get the ID of the new folder to be created.
    // Iterate through all folders to retrieve the highest folder ID.
    let nextId = -1;
    folders.map((folder) => {
      if (folder.id > nextId) {
        nextId = folder.id;
      }
    });

    nextId += 1;

    const newfolder = {
      id: nextId,
      name: name,
      showSubFolders: false,
      notes: [],
    };
    setFolders(
      produce((draft) => {
        draft.push(newfolder);
      })
    );
  };

  // Creating a new note for a folder
  const handleCreateNote = (name) => {
    const currentfolder = folders.find(
      (folder) => folder.id === currentFolderId
    );
    // Get the ID of the new note to be created.
    // Iterate through all notes of the selected folder to retrieve the highest folder ID.
    let nextId = -1;
    currentfolder.notes.map((note) => {
      if (note.id > nextId) {
        nextId = note.id;
      }
    });
    nextId += 1;
    const newNote = {
      id: nextId,
      name: name,
      content: "",
    };
    setFolders(
      produce((draft) => {
        const currentfolder = draft.find(
          (folder) => folder.id === currentFolderId
        );
        currentfolder.notes.push(newNote);
      })
    );
  };

  // Deleting a folder
  const handleDeletefolder = () => {
    const nextfolders = folders.filter((folder) => {
      if (folder.id !== currentFolderId) return folder;
    });
    if (nextfolders.length > 0) {
      setCurrentFolderId(nextfolders[0].id);
    }
    setFolders(nextfolders);
  };

  // Deleting a note
  const handleDeleteNote = () => {
    setFolders(
      produce((draft) => {
        const currentNotes = draft.find(
          (folder) => folder.id === currentFolderId
        ).notes;
        const noteToRemove = currentNotes.find(
          (note) => note.id === currentNoteId
        );
        const indexOfNote = currentNotes.indexOf(noteToRemove);
        currentNotes.splice(indexOfNote, 1);
      })
    );
    setNoteContent("");
  };

  let arrayOfCurrentNotes = [];
  if (folders.length > 0) {
    arrayOfCurrentNotes = folders.find(
      (folder) => folder.id === currentFolderId
    ).notes;
  }

  // Renaming a folder or note
  const handleRename = (type, newName) => {
    if (type === "folder") {
      setFolders(
        produce((draft) => {
          const currentFolder = draft.find(
            (folder) => folder.id === currentFolderId
          );
          currentFolder.name = newName;
        })
      );
    } else if (type === "note") {
      setFolders(
        produce((draft) => {
          const currentFolderNotes = draft.find(
            (folder) => folder.id === currentFolderId
          ).notes;
          const note = currentFolderNotes.find(
            (note) => note.id === currentNoteId
          );
          note.name = newName;
        })
      );
    }
  };

  const handleChangeFont = (newFont, comp) => {
    switch (comp) {
      case "editor":
        setEditorFont(newFont);
        break;
      case "output":
        setOutputFont(newFont);
        break;
    }
  };

  const handleChangeEditorFontSize = (newSize) => {
    setEditorFontSize(newSize);
  };

  // Toggle visibility of editor
  const handleToggleVisibility = (item) => {
    switch (item) {
      case "editor":
        setShowEditor(!showEditor);
        break;

      case "navigation":
        setShowNavigation(!showNavigation);
        break;
    }
  };

  // Change the navigation position to be on the left/right side of the screen
  const handleChangeNavigationPosition = () =>
    setNavigationOnLeft(!navigationOnLeft);

  const handleChangeEditorAndOutputPosition = () =>
    setEditorLeftOfOutput(!editorLeftOfOutput);

  // Components
  const foldersSidebar = (
    <Sidebar
      type="folder"
      items={folders}
      onPress={handleSelectfolder}
      onAddItem={handleCreatefolder}
      onDeleteItem={handleDeletefolder}
      currentItemId={currentFolderId}
      onRename={handleRename}
      currentFolderId={currentFolderId}
      onChangeFolderIdOfSelectedNote={handleChangeFolderIdOfSelectedNote}
      navigationOnLeft={navigationOnLeft}
    />
  );

  const notesSidebar = (
    <Sidebar
      type="note"
      items={arrayOfCurrentNotes}
      onPress={handleSelectNote}
      onAddItem={handleCreateNote}
      onDeleteItem={handleDeleteNote}
      currentItemId={currentNoteId}
      onRename={handleRename}
      currentFolderId={currentFolderId}
      folderIdOfSelectedNote={folderIdOfSelectedNote}
      onChangeFolderIdOfSelectedNote={handleChangeFolderIdOfSelectedNote}
      navigationOnLeft={navigationOnLeft}
    />
  );

  const editor = (
    <Editor
      value={noteContent}
      onChange={handleInputNoteContent}
      font={editorFont}
      fontSize={editorFontSize}
    />
  );

  return (
    <>
      {console.log(folders)}
      <Head>
        <title>Notes App</title>
        <meta
          name="description"
          content="An app for creating notes and to-do lists"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Fira+Code&family=JetBrains+Mono&family=Source+Code+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <Box display="flex" flexDirection="column">
          <QuickSettings
            onChangeFont={handleChangeFont}
            isLongerThan1400={isLongerThan1400}
            editorFont={editorFont}
            handleToggleVisibility={handleToggleVisibility}
            showEditor={showEditor}
            showNavigation={showNavigation}
            navigationOnLeft={navigationOnLeft}
            onChangeNavigationPosition={handleChangeNavigationPosition}
            editorLeftOfOutput={editorLeftOfOutput}
            onChangeEditorAndOutputPosition={
              handleChangeEditorAndOutputPosition
            }
            editorFontSize={editorFontSize}
            onChangeEditorFontSize={handleChangeEditorFontSize}
          />

          <Box display="flex">
            {navigationOnLeft
              ? isLongerThan1400 &&
                showNavigation && (
                  <>
                    {foldersSidebar}
                    {notesSidebar}
                  </>
                )
              : null}

            {editorLeftOfOutput ? (
              <>
                {showEditor && editor}
                <Preview contents={noteContent} font={outputFont} />
              </>
            ) : (
              <>
                <Preview contents={noteContent} font={outputFont} />
                {showEditor && editor}
              </>
            )}
            {!navigationOnLeft
              ? isLongerThan1400 &&
                showNavigation && (
                  <>
                    {notesSidebar}
                    {foldersSidebar}
                  </>
                )
              : null}
          </Box>
        </Box>
      </main>
    </>
  );
}

const foldersMockup = [
  {
    id: 0,
    name: "Welcome!",
    showSubFolders: false,
    notes: [
      {
        id: 0,
        name: "1. Tutorial",
        content: `# Welcome\nThis is a simple note-taking application.\n\n## How to use\nThe left-most panel contains folders for your notes. The panel to the right of that contains notes within the selected folder. Simply click on the item to select the folder or note.\n\n- Create a new folder or note -> Press the 'plus' icon\n\n- Delete a folder or note -> Press the 'bin' icon\n\nThe centre panel is the editor for the note.\n\n## Quick Settings\nThe top-most panel contains some features of the application which you can change, such as light and dark mode, and the editor font.\n\n## Markdown\nThis editor uses GitHub-flavoured Markdown syntax. Click on the 'Markdown Syntax' note for examples on some of the things you can do.
        `,
      },
      {
        id: 1,
        name: "2. Markdown Syntax",
        content: `The editor supports GitHub-flavoured markdown syntax. Here are some of the things you can do:
        \n\n# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6
        \n\nNormal text\n\n*Italic text*\n\n**Bold text**\n\n***Bold and italic text***\n\n~~Strikethrough~~\n\n- Bullet list
        \n\nCode:\n~~~\nconst example = "some text"\n~~~
        `,
      },
    ],
  },
];
