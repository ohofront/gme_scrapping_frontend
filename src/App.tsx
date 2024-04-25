import React from "react";
import { Tab } from "./models/common/tabModel";
import TabMenu from "./component/TabMenu";
import LiveView from "./contents/LiveView";
import HistoricalView from "./contents/HistoricalView";
import ScrollTop from "./component/TopButton";

function App() {
  const TabData: Tab[] = [
    {
      title: "LIVE VIEW",
      content: <LiveView />,
    },
    {
      title: "HISTORICAL VIEW",
      content: <HistoricalView />,
    },
  ];
  return (
    <>
      <ScrollTop />
      <TabMenu tabData={TabData} />
    </>
  );
}

export default App;
