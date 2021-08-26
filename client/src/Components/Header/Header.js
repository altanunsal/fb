import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../Contexts/Socket";
import "./Header.css";

export function Header() {
  const socket = useContext(SocketContext);
  const [basePath, setBasePath] = useState("");

  useEffect(() => {
    socket.on("basePath", (basePath) => {
      setBasePath(basePath);
    });
  });

  return (
    <header className="App-header">
      {basePath && (
        <p>
          Base path is {basePath}. All directories are parsed relative to the
          base path
        </p>
      )}
    </header>
  );
}
