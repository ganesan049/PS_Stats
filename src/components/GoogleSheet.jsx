import { appendSpreadsheet } from "./GoogleSheetData";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Spinner } from "react-bootstrap";
import { useTable, useExpanded } from "react-table";

const GoogleSheet = () => {
  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0;
      border: 1px solid black;

      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
          border-right: 0;
        }
      }
    }
  `;

  function Table({ columns: userColumns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { expanded },
    } = useTable(
      {
        columns: userColumns,
        data,
      },
      useExpanded // Use the useExpanded plugin hook
    );

    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
  const columnsPlayer = React.useMemo(
    () => [
      {
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? "👇" : "👉"}
          </span>
        ),
        Cell: ({ row }) =>
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? "👇" : "👉"}
            </span>
          ) : null,
      },
      {
        Header: "Weekly Player Stats",
        columns: [
          {
            Header: "Player Name",
            accessor: "playerName",
          },
          {
            Header: "Team Name",
            accessor: "teamName",
          },
          {
            Header: "Matches",
            accessor: "match",
          },
          {
            Header: "Points",
            accessor: "point",
          },
        ],
      },
    ],
    []
  );
  const columnsTeam = React.useMemo(
    () => [
      {
        Header: "Team Stats",
        columns: [
          {
            Header: "Rank",
            accessor: "rank",
          },
          {
            Header: "Team Name",
            accessor: "teamName",
          },
          {
            Header: "Points",
            accessor: "point",
          },
        ],
      },
    ],
    []
  );
  const quizTeam = React.useMemo(
    () => [
      {
        Header: "Quiz Stats",
        columns: [
          {
            Header: "Player Name",
            accessor: "playerName",
          },
          {
            Header: "Team Name",
            accessor: "teamName",
          },
          {
            Header: "Points",
            accessor: "point",
          },
          {
            Header: "Challenge",
            accessor: "challenge",
          },
        ],
      },
    ],
    []
  );
  const makeDataFull = (array) => {
    let makeObject = (array) => {
      const data = {
        playerName: array[0],
        teamName: array[1],
        match: array[2],
        point: Number(array[3]),
      };
      return data;
    };
    let makeArray = (data) => {
      let arr = [...data];
      let score = [
        arr.map((d) => {
          return Number(d[3]);
        }),
      ][0].reduce((a, b) => {
        return a + b;
      });
      let match = arr.length;
      let subRows = arr.map((d) => {
        return makeObject(["", "", `WEEK - ${d[2]}`, d[3]]);
      });

      let main = makeObject([arr[0][0], arr[0][1], match, score]);
      main["subRows"] = subRows;
      return main;
    };
    let names = [];
    array.map((d) => (names.includes(d[0]) ? null : names.push(d[0])));
    let output = [];
    names.forEach((d) => {
      let temp = [];
      array.forEach((dataNew) => {
        if (dataNew[0] === d) {
          temp.push(dataNew);
        }
      });
      output.push(makeArray(temp));
    });
    return output;
  };
  const makeTeamData = (array) => {
    let temp = [];
    array.forEach((e) => {
      temp.push(Number(e[1]));
    });
    let rank = [...new Set(temp)].sort().reverse();
    let teamStats = [];
    array.forEach((arrayValue) => {
      let index = 0;
      rank.forEach((rankValue, i) => {
        if (Number(arrayValue[1]) === rankValue) {
          index = i + 1;
        }
      });
      teamStats.push({
        teamName: arrayValue[0],
        // rank: index,
        point: arrayValue[1],
      });
    });
    function compare(a, b) {
      if (Number(a.point) > Number(b.point)) {
        return -1;
      }
      if (Number(a.point) < Number(b.point)) {
        return 1;
      }
      return 0;
    }
    teamStats.sort(compare);
    // teamStats.reverse();
    teamStats.forEach((e, i) => {
      e["rank"] = i + 1;
      console.log(e);
    });
    console.log(teamStats);
    return teamStats;
  };
  const makeDataQuiz = (array) => {
    let teamStats = [];
    array.forEach((arrayValue) => {
      teamStats.push({
        playerName: arrayValue[0],
        teamName: arrayValue[1],
        point: arrayValue[2],
        challenge: arrayValue[3],
      });
    });
    return teamStats;
  };
  const [data, setdata] = useState(null);
  const [team, setteam] = useState(null);
  const [quiz, setquiz] = useState(null);
  useEffect(() => {
    appendSpreadsheet(0).then((value) => {
      setteam(makeTeamData(value));
    });
    appendSpreadsheet(1).then((value) => {
      setdata(makeDataFull(value));
    });
    appendSpreadsheet(3).then((value) => {
      setquiz(makeDataQuiz(value));
    });
  }, []);
  const teamDisplay = () => {
    if (quiz.length > 0) {
      return <Table columns={quizTeam} data={quiz} />;
    } else {
      return (
        <div>
          <p>No Data Available For Quiz Challenge</p>
        </div>
      );
    }
  };
  if (data && team && quiz) {
    return (
      <div
        className="
      auth-card"
      >
        <Styles>
          <Table columns={columnsTeam} data={team} />
          <Table columns={columnsPlayer} data={data} />
          {teamDisplay()}
        </Styles>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );
  }
};
export default GoogleSheet;
