import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/general'

export function Logout() {
    
    const { HandleAuthenticated }  = useContext(AuthContext);
    const navigate = useNavigate();
    
    const deleteUserData = () => {  
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        HandleAuthenticated(false)
    }

    useEffect(() => {
        deleteUserData();
        setTimeout(() => {
            navigate('/');
        }, 500);
    }, [])

    return (
        null
    );
}