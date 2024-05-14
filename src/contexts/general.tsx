import { createContext,  useState} from 'react';

export  const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    
    const [opened, setOpened] = useState<boolean>(true);
    const ToggleSidebar = () => {setOpened(!opened)};

    return (
        <AuthContext.Provider value={{
            opened,
            ToggleSidebar,
        }}>
            {children}
        </AuthContext.Provider>
    )
}