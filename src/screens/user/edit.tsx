import { useContext, useState, useEffect } from "react";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
    FormControl
} from "@/components/ui/form";
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
import { Link, useNavigate, useParams } from 'react-router-dom'; 

import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import { Input } from "@/components/ui/input";
import ApiUser from "./service";

const userMapping = {
    0: 'Administrador',
    1: 'Produção',
    2: 'Operacional',
    3: 'Estoque',
    4: 'Financeiro'
};

const FormSchema = z.object({
	name: z.string().min(5, {message: "Mínimo 5 caracteres"}),
    mobile: z.string().min(11, {message: "Mínimo 11 caracteres"}),
    password: z.string().min(6, {message: "Mínimo 6 caracteres"}),
    confirm: z.string().min(6, {message: "Mínimo 6 caracteres"}),
    role: z.string().min(3, {message: "Selecione o tipo de usuário"}),
}).refine(data => data.password === data.confirm, {
    message: "Senha e Confirmação devem ser os mesmos",
    path: ["confirm"]
});


export function UserEdit() {
    const { opened } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate(); 
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await ApiUser.Insert({ data });
            if (response === 201) {                
                navigate('/user');
            } else {
                toast.error('Erro ao adicionar o cliente');
            }
        } catch (error) {
            console.log(error, 'error')
        }
    }

    const getUser = async () => {
        const response = await ApiUser.GetUser({id})
        console.log(response)
        if(response) {
            setUser(response)
            form.setValue('name', response.name);
            form.setValue('mobile', response.mobile);
            form.setValue('role', response.role);
        }
        setLoading(false)
    }

    useEffect(() => {
        getUser();
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
                                        <BreadcrumbLink className="font-mono text-black text-md">Dashboard</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link to="/user">
                                        <BreadcrumbLink className="font-mono text-blacktext-md">Usuários</BreadcrumbLink>
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex items-center">
                                        <div className="w-1/2 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome</FormLabel>
                                                        <Input placeholder="Nome Completo" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-1/2 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="mobile"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Celular</FormLabel>
                                                        <Input placeholder="Celular com DDD" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center mt-5">
                                        <div className="w-1/2 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Informe a Senha</FormLabel>
                                                        <Input type="password" placeholder="Senha" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-1/2 mr-8">
                                            <FormField
                                                control={form.control}
                                                name="confirm"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirme a Senha</FormLabel>
                                                        <Input type="password" placeholder="Confirmação" {...field} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-5">
                                        <div className="w-full mr-8">
                                            <FormField
                                                control={form.control}
                                                name="role"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tipo de Usuário</FormLabel>
                                                            <Select 
                                                                value={field.value}
                                                                onValueChange={(value) => field.onChange({
                                                                    target: { value }
                                                                })}
                                                                >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Selecione o Tipo" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="Admin">Administrador</SelectItem>
                                                                    <SelectItem value="Estoque">Estoque</SelectItem>
                                                                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                                                                    <SelectItem value="Producao">Produção</SelectItem>
                                                                    <SelectItem value="Operacional">Operacional</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-6">
                                        <Button type="submit" className="bg-black font-mono">Salvar</Button>
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