
import { useEffect, useContext } from "react";
import { Scan, View } from "lucide-react";
import ApiDashboard from "./dashboard/service";
import { AuthContext } from "@/contexts/general";
import { Link } from "react-router-dom";


export function SerialPort() {
    const { port, UpdatePort } = useContext(AuthContext);

    
    const checkSerial = async () => {
        const response = await ApiDashboard.CheckSerialPort();
        if (response) {
            UpdatePort(response);
        } else {
            UpdatePort(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkSerial();
            return () => clearInterval(interval);
        }, 4000);
    }, []);


    return (
        <>
        {
            port ? (
                <Link to='/register/results' className="mt-[9.5px] mr-7">
                    <Scan strokeWidth={2} className="h-[23px] w-[23px] tex-white " /> 
                </Link> 

            ) : (
                null
            )
        }
    </>
    )
}