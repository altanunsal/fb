import { useCallback, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Contexts/Socket";
import { PathInfo } from "../PathInfo/PathInfo";
import "./Form.css";

export function Form() {
  const [value, setValue] = useState("");
  const [paths, setPaths] = useState([]);
  const [error, setError] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("pathInfoResult", (result) => {
      setPaths(result.parsedPaths);
    });

    socket.on("pathInfoError", (errorMessage) => {
      setError(errorMessage);
    });
  });

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setValue(value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      socket.emit("pathInfo", value);
    },
    [socket, value]
  );

  const onClear = useCallback((event) => {
    event.preventDefault();
    setValue("");
    setError("");
    setPaths([]);
  }, []);

  return (
    <div className="App-PathView">
      <div className="App-PathView App-Form">
        <label htmlFor="directory-input" className="App-Form__input">
          Enter the directory you wish to browse:
        </label>
        <input
          type="text"
          name="directory-input"
          className="App-Form__input"
          value={value}
          onChange={onChange}
        />
        <input
          type="submit"
          onClick={onSubmit}
          value="Submit"
          className="App-Form__input App-Form__button"
        />
        {((value && paths) || error) && (
          <input
            type="submit"
            onClick={onClear}
            value="Clear"
            className="App-Form__input App-Form__button"
          />
        )}
        {error && <p>{error}</p>}
      </div>
      {paths.length > 0 &&
        paths.map((parsedPath) => (
          <PathInfo path={parsedPath} isTopLevel key={parsedPath.name} />
        ))}
    </div>
  );
}
