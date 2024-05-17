import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Link, RotateCw } from "lucide-react";
import { AuthContext } from "@/contexts/general";
import { Sidebar } from "@/components/app/sidebar";
import { Navbar } from "@/components/app/navbar";
import { Last } from "@/components/app/dashboard/last";
import { Chart } from "@/components/app/dashboard/chart";
import { TabClients } from "@/components/app/dashboard/tabs";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";


export function Dashboard() {   
    const { opened } = useContext(AuthContext);

    return (
        <div className="flex">
            <Sidebar />
            <div className={ opened ? "flex-1 bg-[#f0f0f0]" : "flex-1 bg-[#f0f0f0] h-full" }>
                {/* <Navbar first="Dashboard" /> */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link to="/">
                                <BreadcrumbLink className="font-mono text-[#000000] text-md">Dashboard</BreadcrumbLink>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>

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