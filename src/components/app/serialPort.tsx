
import { useEffect, useContext } from "react";
import { Search } from "lucide-react";
import ApiDashboard from "./dashboard/service";
import { AuthContext } from "@/contexts/general";
import { Link } from "react-router-dom";


export function SerialPort() {
    const { port, UpdatePort } = useContext(AuthContext);

    
    const checkSerial = async () => {
        const response = await ApiDashboard.CheckSerialPort();
        console.log(response, 'response');
        if (response) {
            UpdatePort(response);
        } else {
            UpdatePort(false);
            console.log('erro', response);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkSerial();
            return () => clearInterval(interval);
        }, 6000);
    }, []);


    return (
        <>
        {
            port ? (
                <Link to='/register/results' variant="ghost" className="mt-[9.5px] mr-7">
                    <Search strokeWidth={2} className="h-[23px] w-[23px] tex-white " /> 
                </Link> 

            ) : (
                null
            )
        }
    </>
    )
}