import ApiService from "../services/api-service";

export const getTeamsByDivision = async (id) => {
    try {
        const response = await ApiService.get(`/divisions/${id}/teams`);
        return response.data;
    } catch (error) {
        console.error("Error fetching teams by division:", error);
        throw error;
  };    
  
    }