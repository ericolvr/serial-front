import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../screens/dashboard';
import { SerialAdd } from '../screens/serial/add';
import { SerialList } from '../screens/serial/list';
import { SerialEdit } from '../screens/serial/edit';
import { ClientAdd } from '@/screens/client/add';
import { ClientList } from '@/screens/client/list';
import { BranchSelect } from '@/screens/branch';
import { BranchList } from '@/screens/branch/list';
import { UserAdd } from '@/screens/user/add';
import { UserList } from '@/screens/user/list';
import { RegisterAdd } from '@/screens/register/add';
import { RegisterList } from '@/screens/register/list';



export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />         
                <Route path="/serial/add" element={<SerialAdd />} />
                <Route path="/serial" element={<SerialList />} />
                <Route path="/serial/edit/:id" element={<SerialEdit />} />
                <Route path="/client/add" element={<ClientAdd />} />
                <Route path="/client" element={<ClientList />} />
                <Route path="/branch" element={<BranchSelect />} />
                <Route path="/branch/list/:client" element={<BranchList />} />
                <Route path="/user/add/" element={<UserAdd />} />
                <Route path="/user" element={<UserList />} />
                <Route path="/register/add" element={<RegisterAdd />} />
                <Route path="/register" element={<RegisterList />} />
            </Routes>
        </BrowserRouter>
    )
}