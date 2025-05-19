import React, { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsByDivision } from "../../../api/getTeamsbyDivision";
import { Stack, TextField } from "@mui/material";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/material-ui";

const ShowTeams = ({ division_id }) => {
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

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
            id: team.teams_id,
            name: team.name,
            alias: team.alias,
            logo: team.logo,
            created_at: new Date(team.created_at).toLocaleDateString(),
          }))
        : [],
    [data]
  );

  const filteredData = useMemo(
    () =>
      nodes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [nodes, search]
  );

  const COLUMNS = useMemo(
    () => [
      { label: "Name", renderCell: (item) => item.name },
      { label: "Alias", renderCell: (item) => item.alias },
      {
        label: "Logo",
        renderCell: (item) => (
          <img
            src={`http://127.0.0.1:8000/storage/logo_images/${item.logo}`}
            alt="Logo"
            width={40}
            style={{ objectFit: "contain" }}
          />
        ),
      },
      { label: "Created At", renderCell: (item) => item.created_at },
    ],
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching teams</div>;

  return (
    <>
     <Stack spacing={2} mb={2}>
  <TextField
    label="Search Team"
    variant="outlined"
    value={search}
    onChange={handleSearch}
  />
</Stack>

{filteredData.length === 0 ? (
  <div className="text-center text-gray-500 py-8">No available data</div>
) : (
  <CompactTable
    columns={COLUMNS}
    data={{ nodes: filteredData }}
    theme={theme}
    rowKey="id"
  />
)}
    </>
  );
};

export default ShowTeams;