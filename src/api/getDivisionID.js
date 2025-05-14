import ApiService from "../services/api-service";

export const getDivisionID = async (id) => {
    try {
        const response = await ApiService.get(`divisions/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching divisions:", error);
        throw error;
  };    
  
    }