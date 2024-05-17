import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { Last } from "@/components/app/dashboard/last";
import { Chart } from "@/components/app/dashboard/chart";
import { TabClients } from "@/components/app/dashboard/tabs";
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Messages } from "@/components/app/messages";
import { UserActions } from "@/components/app/userActions";


export function Dashboard() {   
    const { opened } = useContext(AuthContext);

    return (
        <div className="flex">
            <Sidebar />
            <div className={ opened ? "flex-1 bg-[#f0f0f0]" : "flex-1 bg-[#f0f0f0] h-full" }>
                <section className="flex pt-6 pr-10 pb-6 pl-9 justify-between">
                    <div className="justify-start pt-3 pl-3">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <Link to="/">
                                    <BreadcrumbPage className="font-mono text-gray-500 text-md">Dashboard</BreadcrumbPage>
                                    </Link>
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

                <section className="h-auto pt-2 pl-10 pr-10 mb-10">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-7 bg-white shadow-sm p-10 rounded-md"> 
                            <div className="text-left mb-10">
                                <h1 className="text-xl font-semibold w-full mb-1">Geradores de neblina</h1>
                                <p className="text-sm text-gray-400">Últimos geradores de neblina produzidos pelos times</p>
                            </div>
                            <Last />
                        </div>

                        <div className="col-span-5 bg-white shadow-sm p-10 rounded-md"> 
                            <div className="mb-6 flex justify-between items-start">
                                <h1 className="flex-start text-xl font-semibold mb-1">Por cliente</h1>
                                <Button variant="ghost" className="float-right mr-[-10px] mt-[-10px]">
                                    <RotateCw strokeWidth={1.5} className="w-6 h-6" />
                                </Button>
                            </div>
                            <TabClients />
                        </div>                        
                    </div>

                    <div className="grid grid-cols-12 gap-8 mt-8">
                        <div className="col-span-5 bg-white shadow-sm p-10 rounded-md"> 
                            <h1 className="pl-3 h-14 text-xl font-semibold">Produção de Geradores</h1>
                            <Last />
                        </div>
                        <div className="col-span-7 bg-white shadow-sm p-10 rounded-md"> 
                            <div className="flex flex-column">
                                <Chart />
                            </div>
                        </div>           
                    </div>
                </section>
            </div>
        </div>
    )
}