import axios from 'axios';
const BASE_URL = "http://192.168.0.12:8888"
// process.env.REACT_APP_BASE_URL;


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
}

export default ApiClient;