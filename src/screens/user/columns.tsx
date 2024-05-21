"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const userMapping = {
    0: 'Administrador',
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
};

export type Client = {
    id: string
    name: string
    mobile: string
}
 
export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0 hover:no-underline"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">Nome</p>
                    <ArrowUpDown className="ml-3 h-4 w-4 text-gray-700" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14.5px] font-bold">{row.original.name}</p>
            )
        }
    },

    {
        accessorKey: "mobile",
        header: () => {
            return (
                <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">Celular</p>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14.5px] subpixel-antialiased">{row.original.mobile}</p>
            )
        }
    },

    {
        accessorKey: "role",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">Tipo</p>
        },
        cell: ({ row }) => {
            const role = userMapping[row.original.role];
            return (
                <p className="text-[#1A1C1E] text-[15px] subpixel-antialiased">{role}</p>
            )
        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const line = row.original
            return (
                <div className="flex justify-end">
                    <Link to={`/user/edit/${line.id}`} className="text-right">
                        <Pencil strokeWidth={1.75} className="h-5 w-5 text-black hover:text-gray-800" />
                    </Link>
                </div>
                
            )
        },
    },
]