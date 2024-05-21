import { useContext, useState, useEffect } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AuthContext } from '@/contexts/general'
import { Sidebar } from '@/components/app/sidebar'
import { UserActions } from '@/components/app/userActions'
import { Messages } from '@/components/app/messages'
import ApiClient from '../client/service'
import ApiRegister from './service'
import  Utils from './utils'


const FormSchema = z.object({
    client: z.string({
        required_error: 'Selecione o cliente',
    }),
    
    equipment: z.string({
        required_error: 'Selecione o equipamento',
    }),

    address: z.string().nonempty({ message: 'Informe o número do registrador' }),
    value: z.string().nonempty({ message: 'Informe o valor a ser escrito' }),
    description: z.string().nonempty({ message: 'Informe a descrição' }),
})


export function RegisterEdit() {
    const { opened } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();
    const [ registers, setRegisters] = useState('')
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate(); 
    
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (data.address) {
            data.address = Utils.NormalizeMinus(data.address)
            console.log(data, 'NEW DATA')
        }

        try {
            const response = await ApiRegister.Update({ id, data });
            if (response === 200) {                
                navigate('/register');
            } else {
                
                toast.error('Erro ao editar registrador');
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

    const getRegister = async () => {
        const response = await ApiRegister.GetRegister({id})
        if(response) {
            setRegisters(response)
            form.setValue('client', response.client.toString());
            form.setValue('equipment', response.equipment.toString());
            form.setValue('address', Utils.NormalizePlus(response.address));
            form.setValue('value', response.value);
            form.setValue('description', response.description);
        }
        setLoading(false)
    }
    
    useEffect(() => {
        getRegister();
        getClients();
    }, [])


    return (
        <div className='flex'>
            <Toaster position='top-right' />
            <Sidebar />

            <div className={ opened ? 'flex-1 bg-[#f0f0f0]' : 'flex-1 bg-[#f0f0f0] h-dvh' }>
                <section className='flex pt-6 pr-10 pb-6 pl-9 justify-between'>
                    <div className='justify-start pt-3 pl-3'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                <Link to='/'>
                                    <BreadcrumbLink className='font-mono text-[#000000] text-md'>Dashboard</BreadcrumbLink>
                                </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link to='/register'>
                                        <BreadcrumbLink className='font-mono text-[#000000] text-md'>Registradores</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className='font-mono text-gray-500 text-md'>Editar</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='justify-end'>
                        <div className='flex justify-between'>
                            <Messages />
                            <UserActions />
                        </div>
                    </div>
                </section>

                <section className=' h-auto pt-2 pl-10 pr-10'>
                    <div className='flex flex-row justify-between mt-1'>
                        <div className='bg-white shadow-md p-10 w-full rounded-md'>                            
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className='flex items-center'>
                                        <div className='w-1/2 mr-8'>
                                            <FormField
                                                control={form.control}
                                                name='client'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Cliente</FormLabel>
                                                        { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={registers && registers.client ? registers.client.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder='Selecione o Cliente' />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {registers && !clients.some(client => client.name === registers.client) && (
                                                                        <SelectItem key={registers.id} value={registers.client}>{registers.client}</SelectItem>
                                                                    )}
                                                                    {
                                                                        clients.map((client) => {
                                                                            return (
                                                                                <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
                                                                            )
                                                                        })
                                                                    }
                                                                </SelectContent>
                                                            </Select>
                                                        )
                                                        }
                                                        
                                                    <FormMessage />
                                                </FormItem>
                                            )} /> 
                                        </div>
                                    
                                        <div className='w-1/2 mr-8'>

                                            <FormField
                                                control={form.control}
                                                name='equipment' 
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>Equipamento</FormLabel>
                                                        { loading ? (
                                                            <p>loading</p>
                                                        ) : (
                                                            <Select
                                                                defaultValue={registers && registers.equipment ? registers.equipment.toString() : ''}
                                                                onValueChange={value => {
                                                                    field.onChange(value);
                                                                }}
                                                            >
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder='Selecione o Equipamento' />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {registers && !['3000', '6000', '12000'].includes(registers.equipment) && (
                                                                        <SelectItem key={registers.id} value={registers.equipment}>{registers.equipment}</SelectItem>
                                                                    )}
                                                                    <SelectItem value='3000'>ATK 3000</SelectItem>
                                                                    <SelectItem value='6000'>ATK 6000</SelectItem>
                                                                    <SelectItem value='12000'>ATK 12000</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex items-center mt-8'>
                                        
                                        <div className='w-1/2 mr-8'>
                                            <FormField
                                                control={form.control}
                                                name='address'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Número </FormLabel>
                                                        <Input placeholder='Número do Registrador' {...field} defaultValue={registers ? registers.address : ''} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className='w-1/2 mr-8'>
                                            <FormField
                                                control={form.control}
                                                name='value'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Valor </FormLabel>
                                                        <Input placeholder='Valor a ser escrito no registrador' {...field} defaultValue={registers ? registers.value : ''} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-8'>
                                        <div className='w-full mr-8'>
                                            <FormField
                                                control={form.control}
                                                name='description'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição</FormLabel>
                                                        <Input placeholder='Breve descrição' {...field} defaultValue={registers ? registers.description : ''} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className='pt-8'>
                                        <Button type='submit' className='bg-black font-mono cursor-pointer'>Salvar</Button>
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
