import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/general'

export function Logout() {
    console.log('------------------------------------ logout')
    const { HandleAuthenticated }  = useContext(AuthContext);
    const navigate = useNavigate();
    const [hasNavigated, setHasNavigated] = useState(false);

    const deleteUserData = () => {  
        HandleAuthenticated(false)
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    useEffect(() => {
        deleteUserData();
        // if (!hasNavigated) {
        //     navigate('/');
        //     setHasNavigated(true);
        // }
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }, [])

    return (
        <h1>Logout</h1>
    );
}