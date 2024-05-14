import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import ApiSerial from "./service";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Navbar } from "@/components/app/navbar";


export function SerialList() {
    const { opened } = useContext(AuthContext);
    const [serials, setSerial] = useState([]);

    const serialList = async () => {
        const response = await ApiSerial.List();
        if (response) {
            setSerial(response);
        } else {
            console.log('erro', response);
        }
    }

    useEffect(() => {
        serialList();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className={ opened ? "flex-1 bg-[#f0f0f0]" : "flex-1 bg-[#f0f0f0] h-dvh" }>
                <Navbar first="Dashboard" second="Seriais" />
                {/* <section className="flex pt-6 pr-10 pb-6 pl-9 justify-between">
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
                                <BreadcrumbPage className="font-mono text-gray-500 text-md">Seriais</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className='justify-end'> <div className="flex justify-between">
                            <Messages />
                            <UserActions />
                        </div>
                    </div>
                </section> */}
        
                <section className=" h-auto pt-2 pl-10 pr-10">
                    <div className="flex flex-row justify-between mt-1">
                        <div className="bg-white shadow-md p-10 w-full rounded-md">
                            <DataTable columns={columns} data={serials} />
                        </div>
                    </div>
                </section>
            </div>

            
        </div>
    )
}