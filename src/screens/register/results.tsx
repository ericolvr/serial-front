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
import { Button } from "@/components/ui/button";
import {
    QrCode,
    PenLine,
    Locate,
    Search,
    PlugZap,
    PocketKnife
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from 'react-router-dom'; 
import WriteSheet from "@/components/app/writeSheet";
import WriteSerial from "@/components/app/writeSerial";
import ReadSheet from "@/components/app/readSheet";


export function RegisterResults() {
    const navigate = useNavigate();
    const { opened } = useContext(AuthContext);
    const [registers, setRegisters] = useState<any[]>([]);
    const [gnNumber, setGnNumber] = useState<any[]>([]);
    const [writeOpen, setWriteOpen] = useState<boolean>(false);
    const [serialOpen, setSerialOpen] = useState<boolean>(false);
    const [readOpen, setReadOpen] = useState<boolean>(false);
    const [toCompare, setToCompare] = useState<any[]>([]);
    
    
    // write field Sheet Control
    const toggleWrite = () => {
        setWriteOpen(!writeOpen);
        if (writeOpen === true) {
            document.body.classList.add('closed-sheet');
        }   
    }

    // read field Sheet Control
    const toggleRead = () => {
        setReadOpen(!writeOpen);
        if (readOpen === true) {
            document.body.classList.add('closed-sheet');
        }   
    }

    // serial field Sheet Control
    const toggleSerial = () => {
        setSerialOpen(!writeOpen);
        if (serialOpen === true) {
            document.body.classList.add('closed-sheet');
        }   
    }

    // trigerGN
    const triggerGN = async () => {
        const response = await ApiRegister.TriggerGN(); 
        if (response !== false) {
            navigate('/register/gn-countdown');
        }
    }

    // batteryTest
    const batteryTest = async () => {
        const response = await ApiRegister.BatteryTest();
        if (response !== false) {
            navigate(`/register/read/22`);
        }
    }

    // get serial
    const getSerial = async () => {
        const response = await ApiRegister.GetSerial();
        if (response) {
            setGnNumber(response);
            getLast();
        }
    }

    const getLast = async () => {
        const response = await ApiRegister.GetLast();
        if (response) {
            setToCompare(response);
            // a lista acima sao os dados retornados do banco
            parseRegistersList(response);
        }
    }

    const parseRegistersList = (values: any) => {
        const addresses = values.map((item: any) => {
            return item['address'];
        });
        getRegisters(addresses);
    }

    // get registers
    const getRegisters = async (registersToRead) => {
        const result = await ApiRegister.GetRegisters(registersToRead);
        if (result !== false) {
            setRegisters(result);
        }
    }


    useEffect(() => {
        getSerial();
    }, []);

    // convert decimal serial number
    function decimalToAscii(decimal: number) {
        const ascii = String.fromCharCode(decimal);
        return ascii; 
    }

    async function onSubmit(data: { register: string, value: string }) {
        try { 
            const response = await ApiRegister.WriteSingle({ data });
            if (response === true) {
                setWriteOpen(false);
                document.body.classList.add('closed-sheet');
                navigate(`/register/read/${data.register}`);
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    // write serial
    async function onSerialSubmit(data: { serial: string }) {
        try { 
            const response = await ApiRegister.RewriteSerial({ data });
            if (response === true) {
                setSerialOpen(false);
                document.body.classList.add('closed-sheet');
                getSerial();
                getRegisters();
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    // read field
    async function onReadSubmit(data: { register: string }) {
        try { 
            const response = await ApiRegister.ReadOne({ data });
            if (response !== false) {
                setReadOpen(false);
                document.body.classList.add('closed-sheet');
                navigate(`/register/read/${data.register}`);
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    // const teste = () => {
    //     const areEqual = registers.every((item, index) => {
    //         return item['value'] === toCompare[index]['value'];
    //     });
    // }

    console.log(registers, 'registers');
    console.log(toCompare, 'toCompare');

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
                            <div className="flex justify-between items-center pb-8">
                                <h2>
                                    {
                                        Array.isArray(gnNumber) ? (
                                            gnNumber.map((item: any, index) => (
                                                <b key={index}>{decimalToAscii(item['value'])}</b>))
                                        ) : (
                                            null
                                        )
                                    }
                                </h2>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            className="bg-black py-5 rounded-lg border-2 border-black hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-400 flex flex-row justify-between">
                                                <PocketKnife className="mr-3 h-5 w-5" />
                                                <span>Ferramentas</span>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="p-3 cursor-pointer" onClick={triggerGN}>
                                                <Locate className="mr-3 h-5 w-5" />
                                                <span>Disparar gerador</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="p-3 cursor-pointer" onClick={batteryTest}>
                                                <PlugZap className="mr-3 h-5 w-5" />
                                                <span>Teste de bateria</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleSerial}>
                                                <QrCode className="mr-3 h-5 w-5" />
                                                <span>Gravar número serial</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleWrite}> 
                                                <PenLine className="mr-3 h-5 w-5" />
                                                <span>Escrever um campo</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="p-3 cursor-pointer" onClick={toggleRead}>
                                                <Search className="mr-3 h-4 w-4" />
                                                <span>Ler campo único</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Table className="mt-10">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Registrador Número</TableHead>
                                        <TableHead>Valor Escrito</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                {
    registers.sort((a, b) => a.register - b.register).map((item: any, index: number) => {
        const sortedToCompare = toCompare.sort((a: any, b: any) => Number(a.address) - Number(b.address));
        const correspondingItem = sortedToCompare.find((compareItem: any) => compareItem.address === String(item.register));
        return (
            <TableRow key={index}>
                <TableCell>{item['register']}</TableCell>
                <TableCell>{item['value']}</TableCell>
                <TableCell>
                    {
                        correspondingItem && item['value'] === Number(correspondingItem['value']) ? (
                            // <span className="text-green-500">Igual</span>
                            
                            <p className="bg-green-600 w-5 h-5 rounded-full"></p>
                        ) : (
                            <span className="text-red-500">Diferente</span>
                        )
                    }
                </TableCell>
            </TableRow>
        )
    })
}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>
            </div>
            <WriteSheet open={writeOpen} onOpenChange={toggleWrite} onSubmit={onSubmit} />
            <WriteSerial open={serialOpen} onOpenChange={toggleSerial} onSubmit={onSerialSubmit} />
            <ReadSheet open={readOpen} onOpenChange={toggleRead} onSubmit={onReadSubmit} />
        </div>
    )
}

