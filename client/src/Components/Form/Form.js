import { useCallback, useState, useEffect, useContext } from "react";
import { SocketContext } from "../../Contexts/Socket";
import { PathInfo } from "../PathInfo/PathInfo";
import "./Form.css";

export function Form() {
  const [value, setValue] = useState("");
  const [paths, setPaths] = useState([]);
  const [errors, setErrors] = useState({});
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("pathInfoResult", (result) => {
      if (result.parsedPaths && Array.isArray(result.parsedPaths)) {
        setPaths(result.parsedPaths);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("pathInfoError", (path, errorMessage) => {
      const updatedErrors = Object.assign({}, errors, { [path]: errorMessage });
      setErrors(updatedErrors);
    });
  }, [socket, errors]);

  useEffect(() => {
    socket.on("pathInfoNotFound", ({ resolvedPath }) => {
      const filteredPaths = paths.filter(
        (path) => path.resolvedPath !== resolvedPath
      );
      setPaths(filteredPaths);
    });
  }, [socket, paths]);

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
    setErrors({});
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
        {((value && paths) || Object.keys(errors).length > 0) && (
          <input
            type="submit"
            onClick={onClear}
            value="Clear"
            className="App-Form__input App-Form__button"
          />
        )}
        {Object.keys(errors).length > 0 &&
          Object.entries(errors).map(([path, message]) => (
            <p key={path}>{message}</p>
          ))}
      </div>
      {paths.length > 0 &&
        paths.map((parsedPath) => (
          <PathInfo path={parsedPath} isTopLevel key={parsedPath.name} />
        ))}
    </div>
  );
}
