import { useEffect, useState, useContext } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import ApiRegister from "./service";
import { Link } from "react-router-dom";
import { 
    Table, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell 
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


export function GNCountdown() {
    const { opened } = useContext(AuthContext);
    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        let timerId;
        if (isActive && seconds > 0) {
            timerId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [isActive, seconds]);

    const resetTimer = () => {
        setSeconds(60);
        setIsActive(true);
    };

    useEffect(() => {
        
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className={ opened ? "flex-1 bg-[#f0f0f0]" : "flex-1 bg-[#f0f0f0] h-dvh" }>
                <section className="flex pt-6 pr-10 pb-6 pl-9 justify-between">
                    <div className="justify-start pt-3 pl-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link to="/">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Dashboard</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link to="/register/results">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Registrador</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Contagem Gerador</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='justify-end'>
                        <div className="flex justify-between">
                            <Messages />
                            <UserActions />
                        </div>
                    </div>
                </section>
        
                <section className=" h-auto pt-2 pl-10 pr-10">
                    <div className="flex flex-row justify-between mt-1">
                        <div className="bg-white shadow-md pt-10 pb-20 pl-10 pr-10 w-full rounded-md">
                            <div className="flex justify-between">
                                <Link to="/register/results">
                                    <MoveLeft />
                                </Link>
                            </div>
                            
                                <div className="flex flex-col items-center">
                                    <p className="text-[160px] text-black">
                                        {seconds}
                                    </p>
                                    <Button className="p-6 rounded-full" onClick={resetTimer}>Reiniciar Contagem  60 </Button>
                                </div>
                            
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

