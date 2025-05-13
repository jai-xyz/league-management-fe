import ApiService from "../services/api-service";

export const getDivision = async () => {
    try {
        const response = await ApiService.get('divisions');
        return response.data;
    } catch (error) {
        console.error("Error fetching divisions:", error);
        throw error;
  };    
  
    }