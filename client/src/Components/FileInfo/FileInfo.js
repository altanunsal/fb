import "./FileInfo.css";
import FileIcon from "./file.svg";

export function FileInfo(path) {
  const { name } = path;
  return (
    <div className="FileInfo-container">
      <img src={FileIcon} alt="file-icon" />
      <p className="FileInfo-label">{name}</p>
    </div>
  );
}
