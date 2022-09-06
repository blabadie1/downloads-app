import { useState, useCallback, useEffect } from "react";

// @ts-ignore
import Row from "../Row/index.tsx";
// @ts-ignore
import type { DownloadData } from "../types.tsx";
import "./Table.css";

type Props = {
  downloads: Array<DownloadData>;
};

const Table = ({ downloads }: Props) => {
  const [selections, setSelections] = useState([]);
  const [hasValidDownload, setValidDownload] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const numSelected = selections.reduce(
    (prevVal, currVal) => prevVal + currVal,
    0
  );

  useEffect(() => {
    if (downloads) {
      setSelections(new Array(downloads.length).fill(false));
    }
  }, [downloads]);

  // Show/hide download button depending on selections
  useEffect(() => {
    let hasValidDownload = false;
    selections.forEach((selection, index) => {
      if (selection && downloads[index].status === "available") {
        hasValidDownload = true;
      }
    });
    setValidDownload(hasValidDownload);
  }, [selections, downloads]);

  // Update 'Select All' checkbox after selections change
  useEffect(() => {
    const checkbox = document.getElementById("all-selected-checkbox");
    let indeterminate = false;

    // If some but not all rows selected, show indeterminate state
    if (numSelected && numSelected < selections.length) {
      indeterminate = true;
      setAllSelected(false);
    }
    // @ts-ignore
    checkbox.indeterminate = indeterminate;

    // As rows are individually selected, keep 'Select All' checkbox updated
    if (!numSelected) {
      setAllSelected(false);
    } else if (numSelected === selections.length) {
      setAllSelected(true);
    }
  }, [selections]);

  const handleSelectRow = useCallback(
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
    selections.forEach((selection, index) => {
      if (selection && downloads[index].status === "available") {
        const download = downloads[index];
        alertMessage += `\nPath: ${download.path}; Device: ${download.device}`;
      }
    });
    window.alert(alertMessage);
  }, [downloads, selections]);

  const handleCheckAll = useCallback(() => {
    setSelections(new Array(downloads.length).fill(!allSelected));
  }, [downloads, selections, allSelected]);

  return (
    <>
      <table id="table">
        <tr id="table-header-actions">
          <th>
            <input
              type="checkbox"
              id="all-selected-checkbox"
              name="all-selected-checkbox"
              value="all-selected"
              onChange={() => {
                handleCheckAll();
              }}
              checked={allSelected}
              aria-labelledby="select-all-checkbox-label"
            ></input>
          </th>
          <th id="num-selected">
            <label id="select-all-checkbox-label">
              {numSelected ? `Selected ${numSelected}` : "None Selected"}
            </label>
          </th>
          {/* Only show download button if something is selected */}
          <th id="download-button">
            {hasValidDownload ? (
              <button onClick={handleClick}>Download Selected</button>
            ) : null}
          </th>
        </tr>
        <tr id="table-header-rows">
          <th></th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
        {downloads?.map((download, index) => (
          <Row
            handleCheck={handleSelectRow}
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
