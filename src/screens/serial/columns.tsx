'use client'
import ApiSerial from './service'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Pencil, Printer, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const stepMapping = {
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
};

export type Serial = {
    id: string
    serial_number: string
    client_name: string
    uniorg: string
    step: 'Produção' | 'Operacional' | 'Estoque' | 'Financeiro'
}

const deleteSerial = async (id: string, serialNumber: string, setSerial: React.Dispatch<React.SetStateAction<Serial[]>>) => {
    if (window.confirm(`Confirma a exclusão do Serial ${serialNumber}?`)) {
        try {
            const response = await ApiSerial.Delete(id);
            console.log("Delete response:", response);
            setSerial(prevSerials => prevSerials.filter(serial => serial.id !== id));  // Update state
        } catch (error) {
            console.error("Error deleting serial:", error);
        }
    }
};

export const columns = (setSerial: React.Dispatch<React.SetStateAction<Serial[]>>): ColumnDef<Serial>[] => [
    {
        accessorKey: 'serial_number',
        header: ({ column }) => {
            return (
                <Button
                    className='pl-0 hover:no-underline'
                    variant='link'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <p className='text-[#1A1C1E] text-[12px] font-bold text-xs uppercase  subpixel-antialiased'>Número</p>
                    <ArrowUpDown className='ml-3 h-4 w-4 text-gray-700' />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <p className='text-[#1A1C1E] text-[14px] font-extrabold  subpixel-antialiased'>{row.original.serial_number}</p>
            )
        }
    },
    {
        accessorKey: 'client_name',
        header: () => {
            return <p className='text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased'>Cliente</p>
        },
        cell: ({ row }) => {
            return (
                <p className='text-[#1A1C1E] text-[14.5px]  subpixel-antialiased'>{row.original.client_name}</p>
            )
        }
    },
    {
        accessorKey: 'uniorg',
        header: () => {
            return <p className='text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase  subpixel-antialiased'>Agência</p>
        },
        cell: ({ row }) => {
            return (
                <p className='text-[#1A1C1E] text-[14.5px] subpixel-antialiased'>{row.original.uniorg}</p>
            )
        }
    },
    {
        accessorKey: 'step',
        header: () => {
            return <p className='text-[#1A1C1E] text-[12px] font-extrabold text-xs uppercase'>Fase</p>
        },
        cell: ({ row }) => {
            const step = stepMapping[row.original.step];
            return (
                <div className='flex items-center'>
                    <p className='text-[#1A1C1E] text-[14.5px]'>{step}</p>
                </div>
            )
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const line = row.original;
            return (
                <div className='flex justify-end'>
                    <Link to={`/serial/edit/${line.id}`} className='text-right ml-8'>
                        <Pencil strokeWidth={1.75} className='h-5 w-5 mr-5 text-black hover:text-gray-800' />
                    </Link>

                    <Trash2 
                        onClick={() => deleteSerial(line.id, line.serial_number, setSerial)} 
                        strokeWidth={1.75} 
                        className='h-5 w-5 ml-6 text-black hover:text-gray-800 cursor-pointer'     
                    />

                    <Link to={`/serial/print/${line.id}`} className='text-right'>
                        <Printer strokeWidth={1.75} className='h-5 w-5 ml-10 text-black hover:text-gray-800' />
                    </Link>
                </div>
            );
        },
    },
];