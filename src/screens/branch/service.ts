import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;


class ApiBranch {
    static async List({ client }: { client: string }) {
        console.log(client, "client")
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

    static async Insert({ data }){        
        try {
            const response = await axios.post(`${BASE_URL}/branchs`, data);
            if (response.status === 201) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async GetRegister({ id }: { id: string }) {
        try {
            const response = await axios.get(`${BASE_URL}/branchs/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async Update({ id, data }) {
        try {
            const response = await axios.patch(`${BASE_URL}/branchs/update/${id}`, data);
            if (response.status === 200) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default ApiBranch;