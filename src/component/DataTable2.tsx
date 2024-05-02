import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";

export type DataTableTypes = {
  items: any;
  headers: any;
};

const DataTable2 = ({ items, headers }: DataTableTypes) => {
  let namesArr: any = {};
  const rowSpan = items.reduce((result: any, item: any, key: any) => {
    if (namesArr[item.country] === undefined) {
      namesArr[item.country] = key;
      result[key] = 1;
    } else {
      const firstIndex = namesArr[item.country];
      if (
        firstIndex === key - 1 ||
        (item.country === items[key - 1].country && result[key - 1] === 0)
      ) {
        result[firstIndex]++;
        result[key] = 0;
      } else {
        result[key] = 1;
        namesArr[item.country] = key;
      }
    }
    return result;
  }, []);

  return (
    <div>
      <table
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          width: "600px",
          borderSpacing: "0px",
          border: "3px solid black",
        }}
      >
        <thead>
          <tr style={{ border: "3px solid black" }}>
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid black",
              }}
            >
              <FormattedMessage id="national" />
            </th>
            <th
              style={{
                padding: 5,
                fontSize: 20,
                border: "2px solid black",
              }}
            >
              <FormattedMessage id="currency_unit" />
            </th>
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid black",
              }}
            >
              <FormattedMessage id="competiter" />
            </th>
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid black",
              }}
            >
              <FormattedMessage id="amount" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((el: any, index: number) => (
            <tr key={index}>
              {rowSpan[index] > 0 && (
                <td
                  style={{
                    minWidth: "10px",
                    height: "50px",
                    textAlign: "center",
                    border: "2px solid black",
                    fontSize: 20,
                  }}
                  rowSpan={rowSpan[index]}
                >
                  {el.country}
                </td>
              )}

              {rowSpan[index] > 0 && (
                <td
                  style={{
                    minWidth: "10px",
                    height: "50px",
                    textAlign: "center",
                    border: "2px solid black",
                    fontSize: 20,
                  }}
                  rowSpan={rowSpan[index]}
                >
                  {el.changeunit}
                </td>
              )}
              <td
                style={{
                  minWidth: "10px",
                  height: "50px",
                  textAlign: "center",
                  border: "2px solid black",
                  fontSize: 20,
                }}
              >
                {el.company}
              </td>
              <td
                style={{
                  minWidth: "10px",
                  height: "50px",
                  textAlign: "center",
                  border: "2px solid black",
                  fontSize: 20,
                }}
              >
                {el.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable2;
