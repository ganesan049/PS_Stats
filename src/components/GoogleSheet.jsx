import { appendSpreadsheet } from "./GoogleSheetData";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Spinner } from "react-bootstrap";
import { useTable, useExpanded } from "react-table";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
const GoogleSheet = () => {
  const Styles = styled.div`
    padding: 1rem;

    table {
      border-spacing: 0 !important;
      border: 1px solid black !important;

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
      // console.log(e);
    });
    // console.log(teamStats);
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
  const [expandedRows, setExpandedRows] = useState([]);
  const headerTemplate = (data) => {
    // console.log(data.challenge);
    return `Challenge - ${data.challenge}`;
  };
  const quizDisplay = () => {
    if (quiz.length > 0) {
      return (
        <div>
          <DataTable
            header="Quiz Challenge Stats"
            rowGroupFooterTemplate={() => null}
            value={quiz}
            rowGroupMode="subheader"
            sortField="challenge"
            sortOrder={1}
            groupField="challenge"
            rowGroupHeaderTemplate={headerTemplate}
            expandableRowGroups={true}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
          >
            <Column
              field="playerName"
              header="PLAYER NAME"
              style={{ textAlign: "center" }}
            />
            <Column
              field="teamName"
              header="TEAM NAME"
              style={{ textAlign: "center" }}
            />
            <Column
              field="point"
              header="POINT"
              style={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      );
    } else {
      return (
        <div>
          <p>No Data Available For Quiz Challenge</p>
        </div>
      );
    }
  };
  const [expandedRowsWeek, setExpandedRowsWeek] = useState([]);
  const headerTemplateWeek = (data) => {
    return `${data.teamName}`;
  };
  const weekDisplay = () => {
    if (data.length > 0) {
      return (
        <div>
          <DataTable
            header="Week Challenge Stats"
            rowGroupFooterTemplate={() => null}
            value={data}
            rowGroupMode="subheader"
            sortField="teamName"
            sortOrder={1}
            groupField="teamName"
            rowGroupHeaderTemplate={headerTemplateWeek}
            expandableRowGroups={true}
            expandedRows={expandedRowsWeek}
            onRowToggle={(e) => setExpandedRowsWeek(e.data)}
          >
            <Column
              field="playerName"
              header="PLAYER NAME"
              style={{ textAlign: "center" }}
            />
            <Column
              field="match"
              header="MATCH"
              style={{ textAlign: "center" }}
            />
            <Column
              field="point"
              header="POINT"
              style={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      );
    } else {
      return (
        <div>
          <p>No Data Available For Quiz Challenge</p>
        </div>
      );
    }
  };
  const teamDisplay = () => {
    if (team.length > 0) {
      return (
        <div>
          <DataTable value={team} header="Team Rankings">
            <Column
              field="rank"
              header="RANK"
              style={{ textAlign: "center" }}
            />
            <Column
              field="teamName"
              header="TEAM NAME"
              style={{ textAlign: "center" }}
            />
            <Column
              field="point"
              header="POINTS"
              style={{ textAlign: "center" }}
            />
          </DataTable>
        </div>
      );
    } else {
      return (
        <div>
          <p>No Data Available For Quiz Challenge</p>
        </div>
      );
    }
  };
  if (data && team && quiz) {
    // console.log(data);
    return (
      <div className="justify-content-center">
        <Styles>
          {teamDisplay()}
          <div className="my-3"></div>
          {quizDisplay()}
          <div className="my-3"></div>
          {weekDisplay()}
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
