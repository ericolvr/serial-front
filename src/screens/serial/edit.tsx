import { useState, useContext, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
    FormDescription,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch"
import { Toaster, toast } from 'sonner'
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate, useParams } from 'react-router-dom'; 

import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import ApiSerial from "./service"; 
import ApiBranch from "../branch/service";


const FormSchema = z.object({
    equipment: z.string({
        required_error: "Selecione o equipamento",
    }),
    
	client_name: z.string({
	    required_error: "Selecione o cliente",
	}),
    
    uniorg: z.string().optional().default(""),

    step: z.string({
	    required_error: "Selecione a fase",
	}),

    disabled: z.boolean().optional().default(false),
})


export function SerialEdit() {
    const { opened } = useContext(AuthContext);

    const { id } = useParams<{ id: string }>();
    const [serial, setSerial] = useState<any>({});
    const [branchs, setBranchs] = useState([]);
    const [control, setControl] = useState<boolean>(true);

    const navigate = useNavigate(); 
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiSerial.Insert({ data });
            if (response === 201) {                
                navigate('/serial');
            } else {
                
                toast.error('Erro ao adicionar serial');
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    async function onClientChange(value: string) {
        getBranchs(value);
    }

    const getSerial = async () => {
        const response = await ApiSerial.GetSerial({id});
        if (response) {
            setSerial(response);
        }
    }

    const getBranchs = async (client: string) => {
        const response = await ApiBranch.List({client});
        if(response && response.length > 0) {
            setBranchs(response);
            setControl(false);
        } else {
            setControl(true);
        }
    }

    useEffect(() => {
        getSerial();
    }, []);

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
                                    <Link to="/serial">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Seriais</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Editar</BreadcrumbPage>
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
                            <div className="w-full mb-5">
                                <p className="text-lg font-bold">12000198</p>
                            </div>
                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex items-center">
                                        <div className="w-1/2 mr-8">
                                        <FormField
                                            control={form.control}
                                            name="equipment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Equipamento</FormLabel>
                                                    <Select 
                                                        onValueChange={field.onChange} 
                                                        defaultValue={serial.equipment ? serial.equipment : '3'} 
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Selecione o Equipamento" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={serial.equipment}>ATK{serial.equipment}</SelectItem>
                                                            <SelectItem value="3">ATK 3000</SelectItem>
                                                            <SelectItem value="6">ATK 6000</SelectItem>
                                                            <SelectItem value="12">ATK 12000</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        </div>
                                        <div className="w-1/2">
                                            <FormField
                                                control={form.control}
                                                name="step"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Fase</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione a Fase" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="3">Estoque</SelectItem>
                                                                <SelectItem value="4">Financeiro</SelectItem>
                                                                <SelectItem value="2">Operacional</SelectItem>
                                                                <SelectItem value="1">Produção</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <div className="w-1/2 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="client_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cliente</FormLabel>
                                                        <Select 
                                                            onValueChange={(value) => {
                                                                field.onChange(value);
                                                                onClientChange(value);
                                                            }} 
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione o Cliente" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Basa">Basa</SelectItem>
                                                                <SelectItem value="BNB">BNB</SelectItem>
                                                                <SelectItem value="Caixa">Caixa</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                        </div>
                                        <div className="w-1/2">
                                            <FormField
                                                control={form.control}
                                                name="uniorg"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Branch</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={control ? true : false}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione o Branch" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    branchs.length ? (
                                                                        branchs.map((branch: { id: string, name: string, uniorg: string}) => (
                                                                            <SelectItem key={branch.id} value={branch.name}>{branch.uniorg} - {branch.name}</SelectItem>
                                                                        ))
                                                                    ) : (
                                                                        <SelectItem value="Nenhum branch encontrado">Nenhum branch encontrado</SelectItem>
                                                                    )
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-8">
                                        <div className="w-full">
                                            <FormField
                                                control={form.control}
                                                name="disabled"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                        
                                                    <div className="">
                                                        <FormLabel className="text-base">Desativar Serial </FormLabel>
                                                        <FormDescription>Você pode desativar o número serial em caso de troca ou manutenção</FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    </FormItem>
                                                )}
                                            /> 
                                        </div>
                                    </div>
                                    <div className="pt-8">
                                        <Button type="submit" className="bg-black font-mono">Gerar</Button>
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


