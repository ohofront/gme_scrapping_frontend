import React from "react";
import { Tab } from "./models/common/tabModel";
import TabMenu from "./component/TabMenu";
import LiveView from "./contents/LiveView";
import HistoricalView from "./contents/HistoricalView";
import ScrollTop from "./component/TopButton";
import { FormattedMessage } from "react-intl";

function App() {
  const TabData: Tab[] = [
    {
      title: <FormattedMessage id="liveview" />,
      content: <LiveView />,
    },
    {
      title: <FormattedMessage id="historicalview" />,
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
