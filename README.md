# Notes Editor
:pencil2: A simple React application that allows you to quickly write up notes and edit notes using GitHub-flavoured Markdown.

The project includes some personalisation features including a light/dark mode, changing the editor font family and font size, and toggling the visibility of the different parts of the program.

This project is purely front-end, and so notes are NOT saved locally or remotely.

[View this project on GitHub Pages](https://sa9102.github.io/Notes-Editor/)

:warning: ***IMPORTANT***: This project is still in development, and so you may encounter some bugs and crashes, such as trying to type in the editor right after deleting a note. The application has also not yet been designed to work properly with screens less than 1400px in length.

![Sample of the project. On the left side of the screen, there are tabs containing folders and notes. In the centre, there is the markdown editor, and on the right, the result of the parsed markdown is displayed. There are also some customisation settings at the top.](https://github.com/SA9102/Notes-Editor/blob/main/assets/Preview.png)


## Quick local setup
To quickly get this project running locally on your machine, follow these steps:

1. Clone the repository
2. Move into the repository's root directory
3. Install the dependencies
4. Start up the project
```
git clone https://github.com/SA9102/Notes-Editor.git
cd Notes-Editor
npm i
npm start
```

## Libraries/Frameworks
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Immer](https://immerjs.github.io/immer/)
- [react-markdown](https://github.com/remarkjs/react-markdown)


## Update Log
### 04/04/23
Repository created and first commit.
