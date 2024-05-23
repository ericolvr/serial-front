import { useState, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { 
    Card, 
    CardContent, 
    CardHeader
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import ApiSignIn from './service';
import { AuthContext } from '@/contexts/general';
import  Storage from '@/storage';
import BgImage from '../../assets/otp.svg';


export function SignIn() {
    const navigate = useNavigate();
    const { HandleAuthenticated } = useContext(AuthContext);
    const [ mobile, setMobile ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'mobile': mobile,
            'password': password 
        }

        const response = await ApiSignIn.GetToken({ data });
        console.log(response, 'LINHA 32')
        if (response['access_token']) {
            
            HandleAuthenticated(true)
            Storage.StoreUserData({ data: response})
            
            navigate("/dashboard");
        } else {
            console.log('error');
        }
    }

    return (
        <main className='flex h-screen w-full'>
            <div className='bg-[#F0F0F0] w-full h-full flex items-center justify-center'>
                <img src={BgImage} alt="My SVG" className=' w-[50%] h-[50%]' />
            </div>
            <section className='flex bg-backgroundmax-w-3xl w-full  justify-center items-center'>
                <Card className='w-[360px]'>
                    <CardHeader />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor='mobile' className='pb-1'>celular</Label>
                                <Input 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    id='mobile' 
                                    placeholder='celular com prefixo' 
                                />
                            </div>

                            <div className='mt-7'>
                                <Label htmlFor='mobile' className='pb-1'>sua senha</Label>
                                <Input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id='password' 
                                    type='password' 
                                    placeholder='digite a senha' 
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