'use client'
import ApiRegister from './service'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


export type Register = {
    id: string
    client: string
    equipment: string
    address: string
    address_type: string
    value: number
}
 
const deleteRegister = async (id: string, address: string, setRegister: React.Dispatch<React.SetStateAction<Register[]>>) => {
    const normalize = parseInt(address, 10) + 1;
    if (window.confirm(`Confirma a exclusão do Registrador ${normalize}?`)) {
        try {
            const response = await ApiRegister.Delete(id);
            console.log("Delete response:", response);
            setRegister(prevRegisters => prevRegisters.filter(address => address.id !== id));  // Update state
        } catch (error) {
            console.error("Error deleting serial:", error);
        }
    }
};

export const columns = (setRegister: React.Dispatch<React.SetStateAction<Register[]>>): ColumnDef<Register>[] => [
    {
        accessorKey: "client",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Cliente</p>
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14.5px]  subpixel-antialiased">{row.original.client}</p>
            )
        }
    },
    {
        accessorKey: "equipment",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Equipamento</p>
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14.5px]  subpixel-antialiased">ATK {row.original.equipment}</p>
            )
        }
    },
    {
        accessorKey: "address",
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0 hover:no-underline"
                    variant="link"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <p className="text-[#1A1C1E] text-[12px] font-bold text-xs uppercase  subpixel-antialiased">Registrador</p>
                    <ArrowUpDown className="ml-3 h-4 w-4 text-gray-700" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14px] font-extrabold  subpixel-antialiased uppercase">{parseInt(row.original.address, 10) + 1}</p>
            )
        }
    },
    {
        accessorKey: "value",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Valor</p>
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14px] subpixel-antialiased">{row.original.value}</p>
            )
        }
    },
    {
        accessorKey: "description",
        header: () => {
            return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Descrição</p>
        },
        cell: ({ row }) => {
            return (
                <p className="text-[#1A1C1E] text-[14px] subpixel-antialiased">{row.original.description}</p>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const line = row.original;
            return (
                <div className='flex justify-end'>
                    <Link to={`/register/edit/${line.id}`} className='text-right ml-8'>
                        <Pencil strokeWidth={1.75} className='h-5 w-5 mr-5 text-black hover:text-gray-800' />
                    </Link>
                    <Trash2 
                        onClick={() => deleteRegister(line.id, line.address, setRegister)} 
                        strokeWidth={1.75} 
                        className='h-5 w-5 ml-6 text-black hover:text-gray-800 cursor-pointer'     
                    />
                </div>
            );
        },
    },
];




// "use client"
 
// import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, Trash2, Pencil } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

// export type register = {
//     id: string
//     client: string
//     equipment: string
//     address: string
//     address_type: string
//     value: number
// }
 
// export const columns: ColumnDef<register>[] = [
//     {
//         accessorKey: "client",
//         header: () => {
//             return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Cliente</p>
//         },
//         cell: ({ row }) => {
//             return (
//                 <p className="text-[#1A1C1E] text-[14.5px]  subpixel-antialiased">{row.original.client}</p>
//             )
//         }
//     },
//     {
//         accessorKey: "equipment",
//         header: () => {
//             return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Equipamento</p>
//         },
//         cell: ({ row }) => {
//             return (
//                 <p className="text-[#1A1C1E] text-[14.5px]  subpixel-antialiased">ATK {row.original.equipment}</p>
//             )
//         }
//     },
//     {
//         accessorKey: "address",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     className="pl-0 hover:no-underline"
//                     variant="link"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     <p className="text-[#1A1C1E] text-[12px] font-bold text-xs uppercase  subpixel-antialiased">Registrador</p>
//                     <ArrowUpDown className="ml-3 h-4 w-4 text-gray-700" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => {
//             return (
//                 <p className="text-[#1A1C1E] text-[14px] font-extrabold  subpixel-antialiased uppercase">{parseInt(row.original.address, 10) + 1}</p>
//             )
//         }
//     },
//     {
//         accessorKey: "value",
//         header: () => {
//             return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Valor</p>
//         },
//         cell: ({ row }) => {
//             return (
//                 <p className="text-[#1A1C1E] text-[14px] subpixel-antialiased">{row.original.value}</p>
//             )
//         }
//     },

//     {
//         accessorKey: "description",
//         header: () => {
//             return <p className="text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased">Descrição</p>
//         },
//         cell: ({ row }) => {
//             return (
//                 <p className="text-[#1A1C1E] text-[14px] subpixel-antialiased">{row.original.description}</p>
//             )
//         }
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//             const line = row.original
//             return (
//                 <div className="flex justify-end">                    
//                     <Link to={`/register/edit/${line.id}`} className="text-right ml-8">
//                         <Pencil strokeWidth={1.75} className="h-5 w-5 text-black hover:text-gray-800" />
//                     </Link>
//                 </div>
                
//             )
//         },
//     },
// ]