import { createContext, useState} from 'react';
export  const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [opened, setOpened] = useState<boolean>(true);
    const [port, setPort] = useState<boolean>(false);
    const [authenticated, setAuthenticated ] = useState<boolean>(false);

    const ToggleSidebar = () => {setOpened(!opened)};

    const UpdatePort = async (status: boolean) => {
        setPort(status);
    }

    const HandleAuthenticated = async (status: boolean) => {
        setAuthenticated(status);
    }

    return (
        <AuthContext.Provider value={{
            opened,
            port,
            authenticated,
            ToggleSidebar,
            UpdatePort,
            HandleAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    )
}