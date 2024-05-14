import axios from 'axios';
// const BASE_URL = "http://192.168.0.12:7878"



class ApiSucrilhos {
    static async ReadSerial() {
        const start = 537
        const end = 549
        try {
            const response = await axios.get(`http://localhost:7878/serial/read-range?start=${start}&end=${end}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default ApiSucrilhos;