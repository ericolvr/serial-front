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

import BgImage from '../../assets/otp.svg';

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
            <div className='bg-[#F0F0F0] w-full h-full flex items-center justify-center'>
                <img src={BgImage} alt="My SVG" className=' w-[50%] h-[50%]' />
            </div>

            <section className='flex bg-backgroundmax-w-3xl w-full  justify-center items-center'>
                <Card className='w-[360px]'>
                    <CardHeader>
                        {/* <CardTitle  className='text-2xl font-normal tracking-tighter'>Acessar  </CardTitle>
                        <CardDescription>
                            Utilze seu número de celular e senha para entrar
                        </CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor='mobile' className='pb-1'>celular</Label>
                                <Input 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    id='mobile' 
                                    placeholder='Digite seu número de celular' 
                                />
                            </div>

                            <div className='mt-7'>
                                <Label htmlFor='mobile' className='pb-1'>sua senha</Label>
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password' 
                                    type='password' 
                                    placeholder='Digite seu número de celular' 
                                />
                            </div>
                            <Button className='mt-9 w-full'>Entrar</Button>
                        </form>
                    </CardContent>
                </Card>        
            </section>
        </main>
    );
}