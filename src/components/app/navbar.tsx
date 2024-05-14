import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {  Usb } from "lucide-react";

import { Messages } from "./messages";
import { UserActions } from "./userActions";
import { useEffect, useState } from "react";
import ApiDashboard from "./dashboard/service";


export function Navbar({ first, second, third }: { first: string, second: string, third: string }) {

    const [status, setStatus] = useState(false);
    
    const checkSerial = async () => {
        const response = await ApiDashboard.CheckSerialPort();
        if (response) {
            setStatus(response);
            return response;
        } else {
            setStatus(response);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkSerial();
            return () => clearInterval(interval);
        }, 6000);
    }, []);

    return (
        <section className="flex pt-6 pr-10 pb-6 pl-9 justify-between">
            <div className="justify-start pt-3 pl-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-mono text-gray-500 text-md">
                                {first}
                            </BreadcrumbPage>
                        </BreadcrumbItem>                
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className='justify-end'>
                <div className="flex justify-between">
                    <Usb
                        className={`h-6 w-6 mt-2 mr-8 ${status ? 'text-green-500' : 'text-red-500'}`} 
                    />
                    <Messages />
                    <UserActions />
                </div>
            </div>
        </section>
        
    )
}