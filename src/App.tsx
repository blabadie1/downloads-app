import { useState, useEffect } from "react";
import downloadData from "./downloads.json";

import "./App.css";
// @ts-ignore
import Table from "./components/Table/index.tsx";

const App = () => {
  const [downloads, setDownloads] = useState(undefined);

  useEffect(() => {
    const getData = () => {
      setDownloads(downloadData.response);
    };
    if (!downloads) {
      getData();
    }
  }, []);

  return (
    <div className="App">
      <Table downloads={downloads}></Table>
    </div>
  );
};

export default App;
