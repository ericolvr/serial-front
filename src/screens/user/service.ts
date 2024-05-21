import axios from 'axios';
// const BASE_URL = "http://192.168.2.26:8888"
const BASE_URL = import .meta.env.VITE_API_URL;


interface Data {
    name: string;
    mobile: string;
    password: string;
    role: string;
}

class ApiUser {
    static async Insert({ data }: { data: Data }) {
        try {
            const response = await axios.post(`${BASE_URL}/users`, data);
            if (response.status === 201) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    
    static async List() {
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async GetUser({ id }: { id: string }) {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async Update({ id, data }) {
        try{ 
            const response = await axios.patch(`${BASE_URL}/registers/update/${id}`, data)
            if (response.status == 200) {
                return response.status
            }
        } catch (error) {
            console.log(error)
        } 
    }
}

export default ApiUser;