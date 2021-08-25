import { Fragment, useState, useEffect } from "react";
import "./App.css";
import { Form } from "./Components/Form/Form";
import { socket } from "./API/socket";

export function App() {
  const [basePath, setBaseUrl] = useState("");

  useEffect(() => {
    socket.on("basePath", (basePath) => {
      setBaseUrl(basePath);
    });
  });

  return (
    <Fragment>
      <header className="App-header">
        {basePath && (
          <p>
            Base path is {basePath}. All directories are parsed relative to the
            base path
          </p>
        )}
      </header>
      <Form />
    </Fragment>
  );
}
