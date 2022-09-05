// @ts-ignore
import Row from "../Row/index.tsx";
// @ts-ignore
import type {DownloadData} from '../types.tsx';

type Props = {
  downloads: Array<DownloadData>
};

const Table = ({downloads}: Props) => {
  return (
    <>
      <div className="table-header-actions">
        <input
          type="checkbox"
          id="selected-checkbox"
          name="selected-checkbox"
          value="selected"
        ></input>
        <label htmlFor="selected-checkbox">Selected</label>
        <button>Download Selected</button>
      </div>
      <table className="table-header">
        <tr>
          <th>Checked</th>
          <th>Name</th>
          <th>Device</th>
          <th>Path</th>
          <th>Status</th>
        </tr>
        {downloads?.map((download) => (
          <Row download={download}></Row>
        ))}
      </table>
    </>
  );
};

export default Table;
