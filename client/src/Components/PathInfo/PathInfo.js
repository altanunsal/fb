import { DirectoryInfo } from "../DirectoryInfo/DirectoryInfo";
import { FileInfo } from "../FileInfo/FileInfo";
import "./PathInfo.css";

export function PathInfo({ path }) {
  const { isDirectory, name, isFile, folderContents } = path;
  if (isDirectory) {
    return (
      <div className="App-PathInfo">
        <DirectoryInfo name={name} folderContents={folderContents} />
      </div>
    );
  }
  if (isFile) {
    return (
      <div className="App-PathInfo">
        <FileInfo name={name} />
      </div>
    );
  }

  // not handling symlinks etc.
  return null;
}
