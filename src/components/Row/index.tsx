// @ts-ignore
import type {DownloadData} from '../types.tsx';

type Props = {
    download: DownloadData    
};

const Row  = ({download}: Props) => {
    return (
        <tr>
            <td>{download.name}</td>
            <td>{download.name}</td>
            <td>{download.device}</td>
            <td>{download.path}</td>
            <td>{download.status}</td>
        </tr>
    )
}

export default Row;