import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiClient {
    static async List() {
        try {
            const response = await axios.get(`${BASE_URL}/clients`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    static async Insert({ data }) {
        try {
            const response = await axios.post(`${BASE_URL}/clients`, data);
            if (response.status === 201) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async GetClient({ id }: { id: string }) {
        try {
            const response = await axios.get(`${BASE_URL}/clients/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async Update({ id, data }) {
        console.log(id, data)
        try{ 
            const response = await axios.patch(`${BASE_URL}/clients/update/${id}`, data)
            if (response.status == 200) {
                return response.status
            }
        } catch (error) {
            console.log(error)
        } 
    }
}

export default ApiClient;