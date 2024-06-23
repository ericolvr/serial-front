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

    
    // used to get last serial (extract equipment and clinet to compare registers)
    static async GetLast() {
        try {
            const response = await axios.get(`${BASE_URL}/serials/last`);
            if (response.status === 200) {
                const equipment = response.data[0].equipment
                const client = response.data[0].client_name
                const registerList = await this.ExtractData({equipment, client})
                return registerList
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async ExtractData({equipment, client}) {
        const format = {
            'equipment': equipment,
            'client': client
        }

        try {
            const response = await axios.post(`${BASE_URL}/registers/get-configs`, format);
            return response.data
        } catch (error) {
            console.log(error, 'GRT CONFIGS ERROR')
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

    static async Delete(id) {
        try {
            const response = await axios.delete(`${BASE_URL}/registers/delete/${id}`);
            if (response.status === 204) {
                return response.status;
            }
            return response.data;
        } catch (error) {}
    }

    static async GetSerial() {
        try {
            const response = await axios.get(`${RASP_URL}/read/serial`);
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async GetRegisters(registersToRead) {
        const data = {"registers": registersToRead}

        try {
            
            const response = await axios.post(`${RASP_URL}/status/registers`, data);
            if (response.status === 200) {
                return response.data;
            }
            return false;
        } catch (error) {
            console.log(error);
        }
    }
    
    static async WriteSingle({data}: {data: string}) {
        const register = data['register']
        const value = data['value']
        try {
            const response = await axios.get(`${RASP_URL}/write/single?register=${register}&value=${value}`);
            if (response.status === 200) {
                return response.data
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async ReadSingle(register) {
        try {
            const response = await axios.get(`${RASP_URL}/read/single?register=${register}`);
            
            if (response.status === 200) {
                return response.data;
            }
             else {
                return false
             }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // check
    static async ReadOne({data}: {data: string}) {
        const register = data['register']
        try {
            const response = await axios.get(`${RASP_URL}/read/single?register=${register}`);        
            if (response.status === 200) {
                return response.data;
            }
             else {
                return false
             }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async TriggerGN() {
        try {
            const response = await axios.get(`${RASP_URL}/write/single?register=112&value=1`);
            if (response.status === 200) {
                // return response.data
                return true // mocked for test interface - dont write 1 on register 112
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async BatteryTest() {
        try {
            const response = await axios.get(`${RASP_URL}/write/single?register=30&value=1`);
            if (response.status === 200) {
                // return response.data
                return true // mocked for test interface - dont write 1 on register 30
            } else {
                return false
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async RewriteSerial({data}) {
        const parsed = data['serialNumber']
        const serial = {'serial_number': parsed}
        console.log(serial, 'fornated')
        try {
            const response = await axios.post(`${RASP_URL}/write/serial`, serial);
            if (response.status === 200) {
                return response.data
            }
            return false
        } catch (error) {
            console.log(error);
        }
    }

}

export default ApiRegister;