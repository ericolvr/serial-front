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


export function ReadSingleResult() {
    const { opened } = useContext(AuthContext);
    const url = useParams();
    const received = url['register'];

    const [read, setRead] = useState<any[]>([]);
    
    const getResult = async () => {
        const result = await ApiRegister.ReadSingle(received);
        if (result !== false) {
            setRead(result);
            console.log(result, 'RED');
            console.log(typeof(result), 'TYPE');
        }
    }

    useEffect(() => {
        getResult();
    }, []);

    console.log(read['register'], 'READ')


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
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Resultado</BreadcrumbPage>
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
                        <div className="bg-white shadow-md p-10 w-full rounded-md">
                            <div className="flex justify-between items-center pb-8">
                                <Link to="/register/results">
                                    <MoveLeft />
                                </Link>
                            </div>
                            <Table className="mt-10">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registrador Número</TableHead>
                                        <TableHead>Valor Escrito</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                    {
                                        read ? (
                                            <>
                                                <TableCell>{read['register']}</TableCell>
                                                <TableCell>{read['value']}</TableCell>
                                            </>
                                        ): (
                                            null
                                        )
                                    }
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

