import axios from 'axios';
const BASE_URL = import .meta.env.VITE_RASP_URL;



class ApiSucrilhos {
    static async ReadSerial() {
        const start = 537
        const end = 549
        try {
            const response = await axios.get(`${BASE_URL}/serial/read-range?start=${start}&end=${end}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default ApiSucrilhos;