// @ts-ignore
import type { DownloadData } from "../types.tsx";

type Props = {
  download: DownloadData;
};

const Row = ({ download }: Props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id="download-selected-checkbox"
          name="download-selected-checkbox"
          value="download-selected"
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
