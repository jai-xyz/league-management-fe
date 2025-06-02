import React, { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsByDivision } from "../../../api/getTeamsbyDivision";
import { Stack, TextField } from "@mui/material";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Link } from "react-router-dom";
import DeleteTeams from "./DeleteTeams";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
  useCustom,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
} from "@table-library/react-table-library/sort";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import EditIcon from "@mui/icons-material/Edit";

const ShowTeams = ({ division_id }) => {
  const theme = useTheme(getTheme());

  const [search, setSearch] = useState("");

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getTeamsByDivision", division_id],
    queryFn: () => getTeamsByDivision(division_id),
    enabled: !!division_id,
    refetchOnWindowFocus: false,
  });

  const nodes = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((team) => ({
            id: team.team_id,
            name: team.name,
            alias: team.alias,
            logo: team.logo,
            created_at: team.created_at,
          }))
        : [],
    [data]
  );

  const tableData = { nodes };

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
        ALIAS: (array) => array.sort((a, b) => a.alias.localeCompare(b.alias)),
        CREATED_AT: (array) =>
          array.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
      },
    }
  );

  const filteredData = useMemo(
    () =>
      nodes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [nodes, search]
  );

  useCustom("search", data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    console.log(action, state);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching teams</div>;
  return (
    <>
      <Stack spacing={1} mb={2}>
        <TextField
          id="search"
          label="Search Team"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
      </Stack>
      {/* {filteredData.length === 0 ? (
        <div className="text-center text-gray-500 py-4">No available data</div>
      ) : ( */}
      <Table data={{ nodes: filteredData }} sort={sort} theme={theme}>
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
                <HeaderCellSort sortKey="ALIAS">
                  <div className="p-2">ALIAS</div>
                </HeaderCellSort>
                <HeaderCell>
                  <div className="p-2">LOGO</div>
                </HeaderCell>
                <HeaderCellSort sortKey="CREATED_AT">
                  <div> CREATED AT</div>
                </HeaderCellSort>
                <HeaderCell>
                  <div> ACTION</div>
                </HeaderCell>
              </HeaderRow>
            </Header>
            <Body>
              {filteredData.length === 0 ? (
                <Row>
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: "1rem",
                      backgroundColor: "#ffffff",
                    }}
                  >
                    No available data.
                  </div>
                </Row>
              ) : (
                tableList.map((item) => (
                  <Row key={item.id} item={item}>
                    <Cell>
                      <div className="p-2">{item.name} </div>
                    </Cell>
                    <Cell>
                      <div className="p-2">{item.alias} </div>
                    </Cell>
                    <Cell>
                      <div className="p-2">
                        <img
                          src={`http://127.0.0.1:8000/storage/logo_images/${item.logo}`}
                          alt="Logo"
                          width={100}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
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
                        <Link to={`/admin/teams/edit/${item.id}`}>
                          <EditIcon className="#818a8c hover:text-green-500" />
                        </Link>
                        <DeleteTeams id={item.id} />
                      </div>
                    </Cell>
                  </Row>
                ))
              )}
            </Body>
          </>
        )}
      </Table>
    </>
  );
};

export default ShowTeams;
