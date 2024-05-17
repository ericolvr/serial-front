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
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";



export function RegisterResults() {
    const { opened } = useContext(AuthContext);
    const [registers, setRegisters] = useState<any[]>([]);
    const [numbers, setNumbers] = useState<any[]>([]);
    
    const getResultFromRegister = async () => {
        const response = await ApiRegister.Results();
        if (response) {
            setNumbers(response[0]);
            setRegisters(response[1]);
        }
    }
    
    useEffect(() => {
        getResultFromRegister();
    }, []);

    const decimalToAscii = (decimal: number) => {
        return String.fromCharCode(decimal);
    }

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
                                    <Link to="/serial">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Serial</BreadcrumbLink>
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registrador</TableHead>
                                        <TableHead>Valor Escrito ( ASCII ) </TableHead>
                                        <TableHead>Valor Escrito ( Decimal ) </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        numbers.map((item: string, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item['register']}</TableCell>
                                            <TableCell>{decimalToAscii(item['value'])}</TableCell>
                                            <TableCell>{item['value']}</TableCell>
                                        </TableRow>
                                        ))
                                    }                                
                                </TableBody>
                            
                            </Table>

                            <Table className="mt-10">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registrador</TableHead>
                                        <TableHead>Valor Escrito ( Decimal ) </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        registers.map((item: string, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item['register']}</TableCell>
                                            <TableCell>{item['value']}</TableCell>
                                        </TableRow>
                                        ))
                                    }                                
                                </TableBody>
                            
                            </Table>

                            {/* <Table className="mt-10">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Número</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>sss</TableCell>
                                    </TableRow>
                                
                                </TableBody>
                            
                            </Table> */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}