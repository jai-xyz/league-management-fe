import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDivision } from "../../../api/divisionApi";
import DeleteDivision from "./DeleteDivision";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import EditIcon from "@mui/icons-material/Edit";

const ShowDivision = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["division"],
    queryFn: getDivision,
    refetchOnWindowFocus: false,
  });

  const nodes = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((division) => ({
            id: division.division_id,
            name: division.name,
            created_at: division.created_at,
          }))
        : [],
    [data]
  );

  // Prepare data for the table
  const tableData = { nodes };

  const theme = useTheme(getTheme());

  // Sorting logic
  const sort = useSort(
    tableData,
    {
      // onChange: onSortChange,
    },
    {
      sortIcon: {
        margin: "0px",
        iconDefault: <UnfoldMoreOutlinedIcon fontSize="small" />,
        iconUp: <KeyboardArrowUpOutlinedIcon fontSize="small" />,
        iconDown: <KeyboardArrowDownOutlinedIcon fontSize="small" />,
      },
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        CREATED_AT: (array) =>
          array.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
      },
    }
  );

  function onSortChange(action, state) {
    // Optional: handle sort state changes
    // console.log(action, state);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching division</div>;

  return (
    <Table data={tableData} sort={sort} theme={theme}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow
              style={{
                backgroundColor: "#4b5462",
                color: "#ffffff",
              }}
            >
              <HeaderCellSort sortKey="NAME">
                <div className="p-2">NAME</div>
              </HeaderCellSort>
              <HeaderCellSort sortKey="CREATED_AT">
                <div> CREATED AT</div>
              </HeaderCellSort>
              <HeaderCell>
                <div> ACTION</div>
              </HeaderCell>
            </HeaderRow>
          </Header>
          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>
                  <div className="p-2">{item.name} </div>
                </Cell>
                <Cell>
                  {new Date(item.created_at).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </Cell>
                <Cell>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <Link to={`/admin/division/edit/${item.id}`}>
                      <EditIcon className="#818a8c hover:text-green-500" />
                    </Link>
                    <DeleteDivision id={item.id} />
                  </div>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
};

export default ShowDivision;
