import { useState } from "react";
import FolderOpen from "./folder-open.svg";
import FolderClosed from "./folder-closed.svg";
import { PathInfo } from "../PathInfo/PathInfo";
import "./DirectoryInfo.css";

function FolderIcon({ expanded }) {
  if (expanded) {
    return <img src={FolderOpen} alt="open-folder" />;
  }

  return <img src={FolderClosed} alt="closed-folder" />;
}

export function DirectoryInfo({ name, folderContents }) {
  const [expanded, setExpanded] = useState(false);

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
        Array.isArray(folderContents) &&
        folderContents.length > 0 &&
        folderContents.map((item) => {
          return <PathInfo path={item} />;
        })}
    </div>
  );
}
