import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ApiSignIn from './service';
import { AuthContext } from '@/contexts/general';


export function SignIn() {
    const { authenticated, HandleAuthenticated } = useContext(AuthContext);
    const [ mobile, setMobile ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit --->');
        const data = {
            'mobile': mobile,
            'password': password 
        }

        const response = await ApiSignIn.GetToken({ data });
        console.log(response);
        if (response) {
            HandleAuthenticated(true);
        }
        // if (response['access_token']) {
        //     setUserAuthenticated(true);
        //     setUserRole(response['role']);
        //     navigate('/dashboard');
        // } else {
        //     console.log('error');
        // }
    }


    return (
        <main className='flex h-screen w-full'>
            <div className='bg-[#F0F0F0] w-full h-full flex'>
            </div>

            <section className='flex bg-backgroundmax-w-3xl w-full  justify-center items-center'>
                <Card>
                    <CardHeader>
                        <CardTitle  className='text-2xl font-normal tracking-tighter'>Entre com sua conta</CardTitle>
                        <CardDescription>
                            Utilze seu número de celular e sua senha para entrar
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor='mobile'>Celular</Label>
                                <Input 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    id='mobile' 
                                    placeholder='Digite seu número de celular' 
                                />
                            </div>

                            <div className='mt-5'>
                                <Label htmlFor='mobile'>Sua Senha</Label>
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password' 
                                    type='password' 
                                    placeholder='Digite seu número de celular' 
                                />
                            </div>
                            <Button className='mt-7 w-full'>Entrar</Button>
                        </form>
                    </CardContent>
                </Card>        
            </section>
        </main>
    );
}