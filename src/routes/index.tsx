import { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import { RegisterResults } from '@/screens/register/results';
import { SignIn } from '@/screens/signin';
import { AuthContext } from '@/contexts/general';

export const AppRoutes = () => {
    const { authenticated }: { authenticated: boolean } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {authenticated ? (
                <Navigate to="/dashboard" replace />
            ) : (
                <Navigate to="/" replace />
            )}

            <Routes>
                <Route path="/" element={<SignIn />} />         
                <Route path="/dashboard" element={<Dashboard />} />         
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
                <Route path="/register/results" element={<RegisterResults />} />
            </Routes>
        </BrowserRouter>
    )
}

// import { Fragment, useContext, useEffect } from 'react';
// import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
// import { Dashboard } from '../screens/dashboard';
// import { SerialAdd } from '../screens/serial/add';
// import { SerialList } from '../screens/serial/list';
// import { SerialEdit } from '../screens/serial/edit';
// import { ClientAdd } from '@/screens/client/add';
// import { ClientList } from '@/screens/client/list';
// import { BranchSelect } from '@/screens/branch';
// import { BranchList } from '@/screens/branch/list';
// import { UserAdd } from '@/screens/user/add';
// import { UserList } from '@/screens/user/list';
// import { RegisterAdd } from '@/screens/register/add';
// import { RegisterList } from '@/screens/register/list';
// import { RegisterResults } from '@/screens/register/results';
// import { SignIn } from '@/screens/signin';
// import { AuthContext } from '@/contexts/general';


// export const AppRoutes = () => {
//     const { authenticated } = useContext(AuthContext);

//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/login" element={<SignIn />} />         
//                 <Route path="/" element={<Dashboard />} />         
//                 <Route path="/serial/add" element={<SerialAdd />} />
//                 <Route path="/serial" element={<SerialList />} />
//                 <Route path="/serial/edit/:id" element={<SerialEdit />} />
//                 <Route path="/client/add" element={<ClientAdd />} />
//                 <Route path="/client" element={<ClientList />} />
//                 <Route path="/branch" element={<BranchSelect />} />
//                 <Route path="/branch/list/:client" element={<BranchList />} />
//                 <Route path="/user/add/" element={<UserAdd />} />
//                 <Route path="/user" element={<UserList />} />
//                 <Route path="/register/add" element={<RegisterAdd />} />
//                 <Route path="/register" element={<RegisterList />} />
//                 <Route path="/register/results" element={<RegisterResults />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }
