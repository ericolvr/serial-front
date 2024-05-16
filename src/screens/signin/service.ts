import axios from 'axios';
// import Utils from '../commons/utils';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiSignIn {
    static async GetToken({ data }) {
        try {
            const response = await axios.post(`${BASE_URL}/signin/token`, data);
            if (response.status === 201) {            
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