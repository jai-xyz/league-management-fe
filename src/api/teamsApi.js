import ApiService from "../services/api-service";

export const getTeams = async () => {
    try {
        const response = await ApiService.get('teams');
        return response.data;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
  };    
  
    }