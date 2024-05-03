import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";

export type DataTableTypes = {
  items: any;
  headers: any;
};

const DataTable2 = ({ items, headers }: DataTableTypes) => {
  let namesArr: any = {};
  const countryRowSpan = items.reduce((result: any, item: any, key: any) => {
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

  const changeunitRowSpan = items.reduce((result: any, item: any, key: any) => {
    if (namesArr[item.changeunit] === undefined) {
      namesArr[item.changeunit] = key;
      result[key] = 1;
    } else {
      const firstIndex = namesArr[item.changeunit];
      if (
        firstIndex === key - 1 ||
        (item.changeunit === items[key - 1].changeunit && result[key - 1] === 0)
      ) {
        result[firstIndex]++;
        result[key] = 0;
      } else {
        result[key] = 1;
        namesArr[item.changeunit] = key;
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
          border: "3px solid white",
        }}
      >
        <thead
          style={{
            borderRadius: "10px",
            width: "600px",
            borderSpacing: "0px",
            border: "3px solid white",
          }}
        >
          <tr
            style={{
              border: "3px solid white",
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <FormattedMessage id="national" />
            </th>
            <th
              style={{
                padding: 5,
                fontSize: 20,
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <FormattedMessage id="currency_unit" />
            </th>
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <FormattedMessage id="competiter" />
            </th>
            <th
              style={{
                padding: 20,
                fontSize: 25,
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              <FormattedMessage id="amount" />
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((el: any, index: number) => (
            <tr
              key={index}
              style={{
                border: "3px solid white",
                backgroundColor: "red",
                color: "white",
              }}
            >
              {countryRowSpan[index] > 0 && (
                <td
                  style={{
                    minWidth: "10px",
                    height: "50px",
                    textAlign: "center",
                    border: "2px solid white",
                    fontSize: 20,
                  }}
                  rowSpan={countryRowSpan[index]}
                >
                  {el.country}
                </td>
              )}

              {changeunitRowSpan[index] > 0 && (
                <td
                  style={{
                    minWidth: "10px",
                    height: "50px",
                    textAlign: "center",
                    border: "2px solid white",
                    fontSize: 20,
                  }}
                  rowSpan={changeunitRowSpan[index]}
                >
                  {el.changeunit}
                </td>
              )}
              <td
                style={{
                  minWidth: "10px",
                  height: "50px",
                  textAlign: "center",
                  border: "2px solid white",
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
                  border: "2px solid white",
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
