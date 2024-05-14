import { useEffect, useState, useContext } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AuthContext } from "@/contexts/general";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import ApiClient from "./service";
import { Link } from "react-router-dom";


export function UserList() {
    const { opened } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const userList = async () => {
        const response = await ApiClient.List();
        if (response) {
            setUsers(response);
        } else {
            console.log('erro', response);
        }
    }

    useEffect(() => {
        userList();
    }, []);

    return (
        <div className="flex">
            <Sidebar />

            <div className={ opened ? "flex-1 bg-[#f0f0f0]" : "flex-1 bg-[#f0f0f0] h-dvh" }>
                <section className="flex pt-6 pr-10 pb-6 pl-9 justify-between">
                    <div className="justify-start pt-3 pl-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link to="/">
                                        <BreadcrumbLink className="font-mono text-[#000000] text-md">Dashboard</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                <BreadcrumbPage className="font-mono text-gray-500 text-md">Usuários</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='justify-end'>
                        <div className="flex justify-between">
                            <Messages />
                            <UserActions />
                        </div>
                    </div>
                </section>
        
                <section className=" h-auto pt-2 pl-10 pr-10">
                    <div className="flex flex-row justify-between mt-1">
                        <div className="bg-white shadow-md p-10 w-full rounded-md">
                            <DataTable columns={columns} data={users} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}