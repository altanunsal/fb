import { useContext, useEffect, useState } from "react";
import FolderOpen from "./folder-open.svg";
import FolderClosed from "./folder-closed.svg";
import { PathInfo } from "../PathInfo/PathInfo";
import "./DirectoryInfo.css";
import { SocketContext } from "../../Contexts/Socket";

function FolderIcon({ expanded }) {
  if (expanded) {
    return <img src={FolderOpen} alt="open-folder" />;
  }

  return <img src={FolderClosed} alt="closed-folder" />;
}

export function DirectoryInfo({ name, folderContents, resolvedPath }) {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState(folderContents);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("pathInfoUpdate", (updatedData) => {
      if (updatedData.parsedPath.resolvedPath === resolvedPath) {
        setItems(updatedData.parsedPath.folderContents);
      }
    });
  }, [socket, resolvedPath]);

  return (
    <div>
      <div className="DirectoryInfo-container">
        <FolderIcon expanded={expanded} />
        <p
          className="DirectoryInfo-label"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {name}
        </p>
      </div>
      {expanded &&
        Array.isArray(items) &&
        items.length > 0 &&
        items.map((item) => {
          return <PathInfo path={item} key={item.name} />;
        })}
    </div>
  );
}
