import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeamsByDivision } from "../../../api/getTeamsbyDivision";
import { Link } from "react-router-dom";
import DeleteTeams from "./DeleteTeams";

const ShowTeams = ({ division_id, name }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getTeamsByDivision", division_id],
    queryFn: () => getTeamsByDivision(division_id),
    enabled: !!division_id, // Only fetch if id is truthy
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching teams</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">{name}</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Name</th>
            <th className="border border-gray-200 px-4 py-2">Alias</th>
            <th className="border border-gray-200 px-4 py-2">Logo</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((team) => (
            <tr key={team.team_id}>
              <td className="border border-gray-200 px-4 py-2">
                {team.team_id}
              </td>
              <td className="border border-gray-200 px-4 py-2">{team.name}</td>
              <td className="border border-gray-200 px-4 py-2">{team.alias}</td>
              <td className="border border-gray-200 px-4 py-2">
                <img
                  src={`http://127.0.0.1:8000/storage/logo_images/${team.logo}`}
                  alt={team.name}
                  className="w-16 h-16"
                />
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Link
                  to={`/admin/teams/edit/${team.team_id}`}
                  className="bg-primary hover:bg-dark-primary text-white font-bold py-2 px-4 rounded" // theme can also use by tailwindcss way
                >
                  Edit
                </Link>
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <DeleteTeams id={team.team_id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTeams;
