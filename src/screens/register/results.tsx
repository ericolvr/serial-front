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
// import ApiSerial from "../serial/service";
// import Utils from "./utils";

import {
    QrCode,
    PenLine,
    Locate,
    FileSearch,
    Search,
    PlugZap,
} from "lucide-react"
   
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";


export function RegisterResults() {
    const { opened } = useContext(AuthContext);
    const [registers, setRegisters] = useState<any[]>([]);
    const [gnNumber, setGnNumber] = useState<any[]>([]);

    const [sheetOpen, setSheetOpen] = useState<boolean>(false);

    const toggleSheet = () => {
        setSheetOpen(!sheetOpen)
        // component primitivo SheetTrigger remove o : pointer-events: none do style que é 
        // adicionado oa body quando o Sheet é aberto.
        // como esse componenet foi removido a solucao foi adicionar um class no body
        // o correto seria fazer quan o o state é false, mas por algum motivo essa logica está invertida
        if (sheetOpen === true) {
            document.body.classList.add('closed-sheet'); 
        }   
   }

    const getSerial = async () => {
        const response = await ApiRegister.GetSerial();
        if (response) {
            setGnNumber(response);
        }
    }
    const getRegisters = async () => {
        const result = await ApiRegister.GetRegisters();
        if (result) {
            setRegisters(result);    
        }
    }
             
    
    useEffect(() => {
        getSerial();
        getRegisters();
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
                                        className="bg-black rounded-lg border-2 border-black hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-400">
                                            Ferramentas
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuGroup>
                                    <DropdownMenuItem className="p-3">
                                            <Locate className="mr-3 h-5 w-5" />
                                            <span>Disparar gerador</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="p-3">
                                            <PlugZap className="mr-3 h-5 w-5" />
                                            <span>Teste de bateria</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="p-3">
                                            <QrCode className="mr-3 h-5 w-5" />
                                            <span>Gravar número serial</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="p-3" onClick={toggleSheet}> 
                                            <PenLine className="mr-3 h-5 w-5" />
                                            <span>Escrever um campo</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    
                                    <DropdownMenuSeparator />
                                    
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="p-3">
                                            <FileSearch className="mr-3 h-5 w-5" />
                                            <span>Ler registradores</span>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="p-3">
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
                                        <TableHead>Valor Escrito </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                    registers.length > 0 ? (
                                        registers.map((item: string, index: number) => (
                                            <TableRow key={index}>
                                                <TableCell>{item['register']}</TableCell>
                                                <TableCell>{item['value']}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                    null
                                    )}
                                                                    
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </section>
            </div>
            <Sheet open={sheetOpen} onOpenChange={toggleSheet}> 
                <SheetContent>
                <SheetHeader>
                    <SheetTitle>Escrever no Campo</SheetTitle>
                    <SheetDescription>
                    <Button onClick={toggleSheet}>Fechar</Button>
                    Esta parte será a última ser desenvolvida, logs e mensagens pessoais
                    </SheetDescription>
                </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

