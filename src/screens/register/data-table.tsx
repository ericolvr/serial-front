"use client"
import { useState } from "react"
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { 
	ChevronLeft, 
	ChevronRight, 
	Download, 
	Plus, 
	Printer, 
	AlignRight 
} from "lucide-react"
import { Link } from "react-router-dom"



interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {

  	const [open, setOpen] = useState(false)

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
    	getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
	})

	
	return (
		<>
			<div className="">
				<div className="flex justify-between items-center pb-4">
					<Input
						placeholder="Pesquisar por Registrador ..."
						value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
						onChange={(event) =>
							table.getColumn("address")?.setFilterValue(event.target.value)
						}
						className="max-w-sm ml-2 mt-1 mb-2"
					/>
					
					<div className="flex items-center space-x-6">
						{/* <DropdownMenu open={open} onOpenChange={setOpen}>
							<DropdownMenuTrigger asChild>
								<AlignRight strokeWidth={1.5} className="text-[#1A1C1E] w-8 h-8 hover:text-black cursor-pointer" />
							</DropdownMenuTrigger>
							
							<DropdownMenuContent align="end" className="w-[220px] p-3">
								<DropdownMenuGroup>
									<DropdownMenuItem className="p-3">
										<Download strokeWidth={1.5} className="mr-2 h-5 w-5 text-black" />
											Exportar 
									</DropdownMenuItem>
									<DropdownMenuItem className="p-3">
										<Printer strokeWidth={1.5} className="mr-2 h-4 w-4" />
										Imprimir 
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu> */}
						<Link to="/register/add" className="flex justify-between items-center bg-black py-2.5 pl-2 pr-5 text-white rounded-lg border-2 border-black hover:bg-white hover:text-black hover:border-2 hover:border-black transition-colors duration-400">
							<Plus strokeWidth={2.5} className=" h-4 w-4 tex-white mr-2" /> <span className="text-sm font-mono">Adicionar </span> 
						</Link>
					</div>
      			</div>
			<Table>
			<TableHeader>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
				{headerGroup.headers.map((header) => {
					return (
					<TableHead key={header.id}>
						{header.isPlaceholder
						? null
						: flexRender(
							header.column.columnDef.header,
							header.getContext()
							)}
					</TableHead>
					)
				})}
				</TableRow>
			))}
			</TableHeader>
			<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
				<TableRow
					key={row.id}
					data-state={row.getIsSelected() && "selected"}
				>
					{row.getVisibleCells().map((cell) => (
					<TableCell key={cell.id}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
					))}
				</TableRow>
				))
			) : (
				<TableRow>
				<TableCell colSpan={columns.length} className="h-24 text-center">
					Vazio
				</TableCell>
				</TableRow>
			)}
			</TableBody>
		</Table>
			</div>
			
			{/* pagination */}
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					className="flex items-center justify-center w-10 h-10"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					<ChevronLeft strokeWidth={2.5} />
				</Button>
				<Button
					className="flex items-center justify-center w-10 h-10"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
						<ChevronRight strokeWidth={2.5} />
				</Button>
			</div>
		</>
  )
}
