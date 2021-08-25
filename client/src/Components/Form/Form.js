import { useCallback, useState, useEffect } from "react";
import { socket } from "../../API/socket";
import { PathInfo } from "../PathInfo/PathInfo";
import "./Form.css";

export function Form() {
  const [value, setValue] = useState("");
  const [pathInfo, setPathInfo] = useState();

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setValue(value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      socket.emit("pathInfo", value);
    },
    [value]
  );

  useEffect(() => {
    socket.on("pathInfoResult", (result) => {
      setPathInfo(result);
    });
  });

  const onClear = useCallback((event) => {
    event.preventDefault();
    setValue("");
    setPathInfo(undefined);
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
        {value && pathInfo && (
          <input
            type="submit"
            onClick={onClear}
            value="Clear"
            className="App-Form__input App-Form__button"
          />
        )}
      </div>
      {pathInfo && <PathInfo path={pathInfo.path} isTopLevel />}
    </div>
  );
}
