import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsByDivision } from "../../../api/getTeamsbyDivision";
import { Stack, TextField } from "@mui/material";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/material-ui";

const ShowTeams = ({ division_id }) => {
    const materialTheme = getTheme(DEFAULT_OPTIONS);
    const theme = useTheme(materialTheme);

    const [search, setSearch] = React.useState("");

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["getTeamsByDivision", division_id],
        queryFn: () => getTeamsByDivision(division_id),
        enabled: !!division_id, // Only fetch if division_id is truthy
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching teams</div>;
    }

    // Map and filter the data properly
    const nodes = Array.isArray(data)
        ? data.map((team) => ({
              id: team.teams_id,
              name: team.name,
              alias: team.alias,
              logo: team.logo,
              created_at: new Date(team.created_at).toLocaleDateString(),
          }))
        : [];

    // Filter nodes based on the search input
    const filteredData = nodes.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    // Define columns to display team information
    const COLUMNS = [
        // { label: "Team ID", renderCell: (item) => item.id },
        { label: "Name", renderCell: (item) => item.name },
        { label: "Alias", renderCell: (item) => item.alias },
        { label: "Logo", renderCell: (item) => <img src={`http://127.0.0.1:8000/storage/logo_images/${item.logo}`} alt="Logo" width={40} /> },
        { label: "Created At", renderCell: (item) => item.created_at },
    ];

    return (
        <>
            <Stack spacing={2}>
                <TextField
                    label="Search Team"
                    variant="outlined"
                    value={search}
                    onChange={handleSearch}
                />
            </Stack>
        
            <CompactTable
                columns={COLUMNS}
                data={{ nodes: filteredData }}
                theme={theme}
            />
        </>
    );
};

export default ShowTeams;
