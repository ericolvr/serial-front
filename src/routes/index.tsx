import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Dashboard } from '../screens/dashboard';
import { SerialAdd } from '../screens/serial/add';
import { SerialList } from '../screens/serial/list';
import { SerialEdit } from '../screens/serial/edit';
import { SerialPrint } from '@/screens/serial/print';
import { ClientAdd } from '@/screens/client/add';
import { ClientList } from '@/screens/client/list';
import { ClientEdit } from '@/screens/client/edit';
import { BranchSelect } from '@/screens/branch';
import { BranchList } from '@/screens/branch/list';
import { BranchAdd } from '@/screens/branch/add';
import { BranchEdit } from '@/screens/branch/edit';
import { UserAdd } from '@/screens/user/add';
import { UserList } from '@/screens/user/list';
import { UserEdit } from '@/screens/user/edit';
import { RegisterAdd } from '@/screens/register/add';
import { RegisterEdit } from '@/screens/register/edit';
import { RegisterList } from '@/screens/register/list';
import { RegisterResults } from '@/screens/register/results';
import { SignIn } from '@/screens/signin';
import { PrivateRoutes } from './privateRoutes';
import { Logout } from '@/screens/logout';
import { ComboBox } from '@/screens/branch/combo';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />         
                <Route path="/dashboard" element={
                    <PrivateRoutes>
                        <Dashboard />
                    </PrivateRoutes>
                    } 
                />        
                <Route path="/serial/add" element={
                    <PrivateRoutes>
                        <SerialAdd /> 
                    </PrivateRoutes>
                    } 
                />
                <Route path="/serial" element={
                    <PrivateRoutes>
                        <SerialList /> 
                    </PrivateRoutes>
                    }
                />
                <Route path="/serial/edit/:id" element={
                    <PrivateRoutes>
                        <SerialEdit />
                    </PrivateRoutes>
                    }
                />
                <Route path="/serial/print/:id" element={
                    <PrivateRoutes>
                        <SerialPrint />
                    </PrivateRoutes>
                    }
                />
                <Route path="/client/add" element={
                    <PrivateRoutes>
                        <ClientAdd />
                    </PrivateRoutes>
                    }
                />
                <Route path="/client" element={
                    <PrivateRoutes>
                        <ClientList /> 
                    </PrivateRoutes>
                    }
                />
                <Route path="/client/edit/:id" element={
                    <PrivateRoutes>
                        <ClientEdit /> 
                    </PrivateRoutes>
                    }
                />
                <Route path="/branch" element={
                    <PrivateRoutes>
                        <BranchSelect />
                    </PrivateRoutes>
                    }
                />
                <Route path="/branch/list/:client" element={
                    <PrivateRoutes>
                        <BranchList />
                    </PrivateRoutes>
                    }
                />
                <Route path="/branch/add" element={
                    <PrivateRoutes>
                        <BranchAdd />
                    </PrivateRoutes>
                    }
                />
                <Route path="/branch/edit/:id" element={
                    <PrivateRoutes>
                        <BranchEdit />
                    </PrivateRoutes>
                    }
                />
                <Route path="/user/add/" element={
                    <PrivateRoutes>
                        <UserAdd />
                    </PrivateRoutes>
                    }
                />
                <Route path="/user" element={
                    <PrivateRoutes>
                        <UserList />
                    </PrivateRoutes>
                    }
                />
                <Route path="/user/edit/:id" element={
                    <PrivateRoutes>
                        <UserEdit />
                    </PrivateRoutes>
                    }
                />
                <Route path="/register/add" element={
                    <PrivateRoutes>
                        <RegisterAdd />
                    </PrivateRoutes>
                    }
                />
                <Route path="/register/edit/:id" element={
                    <PrivateRoutes>
                        <RegisterEdit />
                    </PrivateRoutes>
                    }
                />
                <Route path="/register" element={
                    <PrivateRoutes>
                        <RegisterList />
                    </PrivateRoutes>
                    }
                />
                <Route path="/register/results" element={
                    <PrivateRoutes>
                        <RegisterResults />
                    </PrivateRoutes>
                }
                />
                <Route path="/logout" element={
                    <PrivateRoutes>
                        <Logout />
                    </PrivateRoutes>
                    }
                />

                <Route path="/combo" element={
                    <PrivateRoutes>
                        <ComboBox />
                    </PrivateRoutes>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
