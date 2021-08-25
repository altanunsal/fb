import { Fragment, useState, useEffect } from "react";
import { ApiService } from "./API/service";
import "./App.css";
import { Form } from "./Components/Form/Form";

export function App() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    async function fetchUrl() {
      const baseUrl = await ApiService.getBaseDir();
      setBaseUrl(baseUrl);
    }

    fetchUrl();
  });

  return (
    <Fragment>
      <header className="App-header">
        {baseUrl && <p>Base URL is {baseUrl}.</p>}
      </header>
      <div className="App-body">
        <Form />
      </div>
    </Fragment>
  );
}
