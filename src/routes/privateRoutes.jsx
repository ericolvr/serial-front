import { useEffect, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/contexts/general';
import Storage from '../storage';

export function PrivateRoutes({ children }) {
    const { authenticated, HandleAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Storage.RetriveUserToken('token');
        if (token != null){
            HandleAuthenticated(true);
        } else {
            HandleAuthenticated(false)
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return authenticated ? children : <Navigate to='/' />
}
