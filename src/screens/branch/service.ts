import axios from 'axios';
const BASE_URL = "http://192.168.0.12:8888"
// process.env.REACT_APP_BASE_URL;


class ApiBranch {
    static async List({ client }: { client: string }) {
        try {
            const response = await axios.get(`${BASE_URL}/branchs/client/?client=${client}`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ApiBranch;