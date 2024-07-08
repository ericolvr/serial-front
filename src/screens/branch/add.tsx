import { useContext, useState, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'; 

import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import ApiClient from "../client/service";
import ApiBranch from "./service";

const FormSchema = z.object({
    client: z.string({
        required_error: "Selecione o cliente",
    }),
    name: z.string({
        required_error: 'Nome da agência'
    }),
    uniorg: z.string().optional()
    
})


export function BranchAdd() {
    const { opened } = useContext(AuthContext);
    const [clients, setClients] = useState([]);

    const navigate = useNavigate(); 
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiBranch.Insert({ data });
            if (response === 201) {   
                toast.success('Agência adicionada com sucesso');             
                form.setValue('client', ''); 
                form.setValue('name', '')
                form.setValue('uniorg', '');
            } else {
                toast.error(response);
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getClients = async () => {
        const response = await ApiClient.List();
        if (response) {
            setClients(response);
        }
    }

    useEffect(() => {
        getClients();
    }, [])


    return (
        <div className="flex">
            <Toaster position="top-right" />
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
                                    <Link to="/#">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Branchs</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Adicionar</BreadcrumbPage>
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex items-center">
                                        <div className="w-1/3 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="client"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cliente</FormLabel>
                                                        <Select 
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                            }} 
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione o Cliente" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    clients.map((client) => {
                                                                        return (
                                                                            <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                        )
                                                                    })
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                        </div>
                                    
                                        <div className="w-1/3 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome</FormLabel>
                                                        <Input placeholder="Nome da Agência" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <FormField
                                                control={form.control}
                                                name="uniorg"
                                                
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Uniorg </FormLabel>
                                                        <Input placeholder="Uniorg da Agência" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        <Button type="submit" className="bg-black font-mono cursor-pointer">Adicionar</Button>
                                    </div>
                                </form>    
                            </Form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
