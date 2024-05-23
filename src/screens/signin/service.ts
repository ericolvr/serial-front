import axios from 'axios';
// import Utils from '../commons/utils';
// const BASE_URL = import .meta.env.VITE_API_URL;
const BASE_URL = 'http://192.168.0.25:8888';

class ApiSignIn {
    static async GetToken({ data }) {
        try {
            const response = await axios.post(`${BASE_URL}/signin/token`, data);
            if (response.status === 201) {            
                console.log(response.data);
                const data = response.data;
                // Utils.StoreUserData({ data });
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ApiSignIn;