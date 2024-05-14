import axios from 'axios';
const BASE_URL = "http://192.168.0.12:8888"
// process.env.REACT_APP_BASE_URL;


class ApiRegister {
    static async Insert({ data }: { data: any }) {
        console.log(data), 'REGISTER ADD';
        try {
            const response = await axios.post(`${BASE_URL}/registers`, data);
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
            const response = await axios.get(`${BASE_URL}/registers`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }    

}

export default ApiRegister;