import axios from 'axios';
const BASE_URL = "http://192.168.0.12:8888"
const RASP_URL = "http://192.168.0.12:7878"
// process.env.REACT_APP_BASE_URL;


class ApiDashboard {
    static async GetLast() {
        try {
            const response = await axios.get(`${BASE_URL}/serials/last`);
            if (response.status === 201) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async List() {
        try {
            const response = await axios.get(`${BASE_URL}/check-serial`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }    

    static async CheckSerialPort() {
        try {
            const response = await axios.get(`${RASP_URL}/utils/check-serial`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
}

export default ApiDashboard;