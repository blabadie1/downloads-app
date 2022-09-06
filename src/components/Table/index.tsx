import { useState, useCallback, useEffect } from "react";

// @ts-ignore
import Row from "../Row/index.tsx";
// @ts-ignore
import type { DownloadData } from "../types.tsx";

type Props = {
  downloads: Array<DownloadData>;
};

const Table = ({ downloads }: Props) => {
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    if (downloads) {
      setSelections(new Array(downloads.length).fill(false));
    }
  }, [downloads]);

  const updateSelected = useCallback(
    (index: number) => {
      const nextSelections = selections.slice();
      nextSelections[index] = !selections[index];
      setSelections(nextSelections);
    },
    [selections]
  );

  // Generate alert message based on current selections
  const handleClick = useCallback(() => {
    let alertMessage = "Downloaded the following: ";
    let hasValidDownload = false;
    selections.forEach((selection, index) => {
      if (selection && downloads[index].status === "available") {
        hasValidDownload = true;
        const download = downloads[index];
        alertMessage += `\nPath: ${download.path}; Device: ${download.device}`;
      }
    });
    if (hasValidDownload) {
      window.alert(alertMessage);
    } else {
      window.alert("No valid downloads available");
    }
  }, [downloads, selections]);

  const numSelected = selections.reduce(
    (prevVal, currVal) => prevVal + currVal,
    0
  );

  return (
    <>
      <div className="table-header-actions">
        <input
          type="checkbox"
          id="selected-checkbox"
          name="selected-checkbox"
          value="selected"
        ></input>
        <label htmlFor="selected-checkbox">
          {numSelected ? `Selected ${numSelected}` : "None Selected"}
        </label>
        {/* Only show download button if something is selected */}
        {numSelected && (
          <button onClick={handleClick}>Download Selected</button>
        )}
      </div>
      <table className="table-header">
        <tr>
          <th></th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
        {downloads?.map((download, index) => (
          <Row
            handleCheck={updateSelected}
            download={download}
            index={index}
            selected={selections[index]}
          ></Row>
        ))}
      </table>
    </>
  );
};

export default Table;
