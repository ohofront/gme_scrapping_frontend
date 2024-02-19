import React from "react";
import { Tab } from "./models/common/tabModel";
import TabMenu from "./component/TabMenu";
import LiveView from "./contents/LiveView";
import HistoricalView from "./contents/HistoricalView";

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
  return <TabMenu tabData={TabData} />;
}

export default App;
