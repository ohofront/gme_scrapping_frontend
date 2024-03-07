import styled from "styled-components";
import { DataTable } from "../../component/DataTable";
import { headers, items } from "../../dummy/DataTable";
import { HistoricalListViewDummy } from "../../dummy/HistoricalView";
import LineChart from "../../component/LineChart";

const HistoricalView = () => {
    return(
          <MainWrapper>
            <TableWrapper>
                <DataTable headers={headers} items={items} selectable={false}/>
            </TableWrapper>
            <ChartWrapper>
                <LineChart props={HistoricalListViewDummy}/>
            </ChartWrapper>
        </MainWrapper>
    )
}
export default HistoricalView;

const MainWrapper = styled.div`
  display: flex;
  width: 100%;
`
const TableWrapper = styled.div`
  width: 50%;
  height: 200px;
  float: left;
`;
const ChartWrapper = styled.div`
  width: 100%;
  margin: 10px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  float: right;
  align-items: center;
  justify-content: center;
`