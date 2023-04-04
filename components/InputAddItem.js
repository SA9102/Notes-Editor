import { useState } from "react";

import { Input } from "@chakra-ui/react";

export default function InputAddItem({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            onSubmit(inputValue);
            setInputValue("");
          }
        }}
      >
        +
      </button>
      <br />
      <Input
        variant="filled"
        placeholder="enter name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
}
