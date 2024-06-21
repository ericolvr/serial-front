import { useEffect, useState, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { UserActions } from "@/components/app/userActions";
import { Messages } from "@/components/app/messages";
import ApiSerial from "./service";


export function BranchList() {
    const { opened } = useContext(AuthContext);
    const { client } = useParams();
    const [branchs, setBranchs] = useState([]);

    const branchList = async () => {
        const response = await ApiSerial.List({ client });
        if (response) {
            setBranchs(response);
        } else {
            console.log('erro', response);
        }
    }

    useEffect(() => {
        branchList();
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
                                        <BreadcrumbLink className="font-mono text-black text-md">Dashboard</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <Link to="/branch">
                                        <BreadcrumbLink className="font-mono text-black text-md">Branchs</BreadcrumbLink>
                                    </Link>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Listando</BreadcrumbPage>
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
                            <DataTable columns={columns} data={branchs} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}