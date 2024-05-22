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


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />         
                <Route path="/dashboard" element={<Dashboard />} />        
                <Route path="/serial/add" element={<SerialAdd /> }/>
                <Route path="/serial" element={<SerialList /> }/>
                <Route path="/serial/edit/:id" element={<SerialEdit />}/>
                <Route path="/serial/print/:id" element={<SerialPrint />}/>
                <Route path="/client/add" element={<ClientAdd />}/>
                <Route path="/client" element={<ClientList /> }/>
                <Route path="/client/edit/:id" element={<ClientEdit /> }/>
                <Route path="/branch" element={<BranchSelect />}/>
                <Route path="/branch/list/:client" element={<BranchList />}/>
                <Route path="/user/add/" element={<UserAdd />}/>
                <Route path="/user" element={<UserList />}/>
                <Route path="/user/edit/:id" element={<UserEdit />}/>
                <Route path="/register/add" element={<RegisterAdd />}/>
                <Route path="/register/edit/:id" element={<RegisterEdit />}/>
                <Route path="/register" element={<RegisterList />}/>
                <Route path="/register/results" element={<RegisterResults />}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
        </BrowserRouter>
    )
}




// import { Fragment, useContext, useEffect } from 'react';
// import { BrowserRouter, Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import { Dashboard } from '../screens/dashboard';
// import { SerialAdd } from '../screens/serial/add';
// import { SerialList } from '../screens/serial/list';
// import { SerialEdit } from '../screens/serial/edit';
// import { ClientAdd } from '@/screens/client/add';
// import { ClientList } from '@/screens/client/list';
// import { ClientEdit } from '@/screens/client/edit';
// import { BranchSelect } from '@/screens/branch';
// import { BranchList } from '@/screens/branch/list';
// import { UserAdd } from '@/screens/user/add';
// import { UserList } from '@/screens/user/list';
// import { RegisterAdd } from '@/screens/register/add';
// import { RegisterList } from '@/screens/register/list';
// import { RegisterResults } from '@/screens/register/results';
// import { SignIn } from '@/screens/signin';
// import { AuthContext } from '@/contexts/general';


// const PrivateRoute = ({ element: Element, ...rest }) => {
//     const { authenticated } = useContext(AuthContext);

//     return <Element {...rest} /> : <Navigate to="/" />;
// };

// export const AppRoutes = () => {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<SignIn />} />
//                 <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
//                 <Route path="/serial/add" element={<PrivateRoute element={SerialAdd} />} />
//                 <Route path="/serial" element={<PrivateRoute element={SerialList} />} />
//                 <Route path="/serial/edit/:id" element={<PrivateRoute element={SerialEdit} />} />
//                 <Route path="/client/add" element={<PrivateRoute element={ClientAdd} />} />
//                 <Route path="/client" element={<PrivateRoute element={ClientList} />} />
//                 <Route path="/client/edit/:id" element={<PrivateRoute element={ClientEdit} />} />
//                 <Route path="/branch" element={<PrivateRoute element={BranchSelect} />} />
//                 <Route path="/branch/list/:client" element={<PrivateRoute element={BranchList} />} />
//                 <Route path="/user/add" element={<PrivateRoute element={UserAdd} />} />
//                 <Route path="/user" element={<PrivateRoute element={UserList} />} />
//                 <Route path="/register/add" element={<PrivateRoute element={RegisterAdd} />} />
//                 <Route path="/register" element={<PrivateRoute element={RegisterList} />} />
//                 <Route path="/register/results" element={<PrivateRoute element={RegisterResults} />} />
//             </Routes>
//         </BrowserRouter>
//     );
// };




