import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react"
import ApiDashboard from "./service";

const stepMapping = {
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
};


export function Last() {
    const [ last, setLast ] = useState([]);

    const getLast = async () => {
        const response = await ApiDashboard.GetLast();
        if (response) {
            setLast(response)
        }
    }

    useEffect(() => {
        getLast();
    }, []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">NÚMERO</TableHead>
                    <TableHead className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">CLIENTE</TableHead>
                    <TableHead className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">UNIORG</TableHead>
                    <TableHead className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">FASE</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    last.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-bold">{item.serial_number}</TableCell>
                            <TableCell>{item.client_name}</TableCell>
                            <TableCell>{item.uniorg}</TableCell>
                            <TableCell>{stepMapping[item.step]}</TableCell>
                            <TableCell className="float-right">
                                <Link to={`/serial/edit/${item.id}`}>
                                    <SquareArrowOutUpRight className="text-[#1A1C1E] w-5 h-5 text-right" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}