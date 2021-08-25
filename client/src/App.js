import { Fragment, useState, useEffect } from "react";
import { ApiService } from "./API/service";
import "./App.css";
import { Form } from "./Components/Form/Form";

export function App() {
  const [basePath, setBaseUrl] = useState("");

  useEffect(() => {
    async function fetchUrl() {
      const basePath = await ApiService.getBaseDir();
      setBaseUrl(basePath);
    }

    fetchUrl();
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
