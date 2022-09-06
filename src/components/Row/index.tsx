// @ts-ignore
import type { DownloadData } from "../types.tsx";

type Props = {
  download: DownloadData;
  index: number;
  handleCheck: (index: number) => void;
  selected: boolean;
};

const Row = ({ download, index, handleCheck, selected }: Props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id="download-selected-checkbox"
          name="download-selected-checkbox"
          value="download-selected"
          onChange={() => {
            handleCheck(index);
          }}
        ></input>
      </td>
      <td>{download.name}</td>
      <td>{download.device}</td>
      <td>{download.path}</td>
      <td>{download.status}</td>
    </tr>
  );
};

export default Row;
