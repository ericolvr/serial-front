import axios from 'axios';
const BASE_URL = import .meta.env.VITE_API_URL;
const RASP_URL = import.meta.env.VITE_RASP_URL;


class ApiRegister {
    static async Insert({ data }: { data: any }) {
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

    static async GetRegister({ id }: { id: string }) {
        try {
            const response = await axios.get(`${BASE_URL}/registers/id/${id}`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async Results() {
        try {
            const response = await axios.get(`${RASP_URL}/serial/read-results`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async Rewrite({data}: {data: string}) {
        const payload = { 
            "serial_number": data
        }
        console.log(payload, 'PAYLOAD')

        try {
            const response = await axios.post(`${RASP_URL}/serial/write-serial`, payload);
            if (response.status === 200) {
                return response.status;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

}

export default ApiRegister;