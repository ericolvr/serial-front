import { useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/general';
import Storage from '../storage';


export function PrivateRoutes({ children }) {
    const { authenticated, HandleAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const checkToken = async () => {
            const token = await Storage.RetriveUserToken('token');
            if (token && token != null){
                HandleAuthenticated(true);
            } else {
                HandleAuthenticated(false)
            }
        };
        checkToken();
    }, []);

    return authenticated ? children : <Navigate to='/' />
}



