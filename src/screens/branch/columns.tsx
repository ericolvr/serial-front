"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export type Branch = {
    id: string
    name: string
    uniorg: string
}
 
export const columns: ColumnDef<Branch>[] = [
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
                    <ArrowUpDown className="ml-3 h-3 w-3 text-gray-700" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14px] font-bold subpixel-antialiased">{row.original.name}</p>
            )
        },
    },
    {
        accessorKey: "uniorg",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase">Uniorg</p>
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14.5px] subpixel-antialiased">{row.original.uniorg}</p>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const line = row.original
            return (
                <div className="flex justify-end">                    
                    <Link to={`/branch/edit/${line.id}`} className="text-right ml-8">
                        <Pencil strokeWidth={1.75} className="h-5 w-5 text-black hover:text-gray-800" />
                    </Link>
                </div>
                
            )
        },
    },
]