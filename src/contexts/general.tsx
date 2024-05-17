import { createContext,  useState} from 'react';

export  const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    
    const [opened, setOpened] = useState<boolean>(true);
    const [port, setPort] = useState<boolean>(false);
    const ToggleSidebar = () => {setOpened(!opened)};

    
    const UpdatePort = async (status: boolean) => {
        console.log(status, 'status CONTEXT');
        setPort(status);
    }

    return (
        <AuthContext.Provider value={{
            opened,
            port,
            ToggleSidebar,
            UpdatePort,
        }}>
            {children}
        </AuthContext.Provider>
    )
}