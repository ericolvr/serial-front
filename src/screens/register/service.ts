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
            if (error.response.status === 400) {
                const msg = 'Registrador já existe'
                return msg
            }
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

    static async GetSerial() {
        try {
            const response = await axios.get(`${RASP_URL}/status/serial`);
            console.log(response.data, 'SERIAL')
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async GetRegisters() {
        try {
            const response = await axios.get(`${RASP_URL}/status/registers`);
            console.log(response.data, 'REGISTERS')
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

    static async Single({data}: {data: string}) {
        const register = data['register']
        const value = data['value']
        
        const response = await axios.get(`${RASP_URL}/write/single?register=${register}&value=${value}`);
        
        if (response.status === 200) {
            return response.data
        }
        // http://192.168.0.25:8000/write/single?register=538&value=84

        return 0
    //    try {
    //     consol
    //    } catch (error) {
    //        console.log(error)
    //    }
    }
}

export default ApiRegister;