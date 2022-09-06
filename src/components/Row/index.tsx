import { ReactElement } from "react";
// @ts-ignore
import type { DownloadData } from "../types.tsx";
import "./Row.css";

type Props = {
  download: DownloadData;
  index: number;
  handleCheck: (index: number) => void;
  selected: boolean;
};

const Row = ({ download, index, handleCheck, selected }: Props) => {
  const getStatusRow = (status: string): ReactElement => {
    const newStatus = status[0].toUpperCase() + status.substring(1);
    if (status === "available") {
      return (
        <>
          <svg className="available-svg">
            <circle
              cx="10"
              cy="10"
              r="10"
              fill="green"
            />
          </svg>
          {newStatus}
        </>
      );
    } else {
      return <>{newStatus}</>;
    }
  };

  return (
    <tr className={selected ? 'selected' : null}>
      <td>
        <input
          type="checkbox"
          name="download-selected-checkbox"
          value="download-selected"
          onChange={() => {
            handleCheck(index);
          }}
          checked={selected}
          aria-labelledby="download-name"
        ></input>
      </td>
      <td id="download-name">{download.name}</td>
      <td>{download.device}</td>
      <td>{download.path}</td>
      <td>{getStatusRow(download.status)}</td>
    </tr>
  );
};

export default Row;
