import { useContext } from "react";

import { MoveLeft, MoveRight, Network } from "lucide-react";
<MoveLeft absoluteStrokeWidth />

import { Link } from "react-router-dom";
import { Hotel, QrCode, Map, Users, Layers, Gauge, DatabaseZap } from "lucide-react";
import { Button } from "../ui/button";
import { AuthContext } from "../../contexts/general";


export function Sidebar() {
    const { opened, ToggleSidebar } = useContext(AuthContext);
    
    return (
        <div className={opened ? "w-80 bg-white h-screen border-r border-gray-200 transition-all duration-600" : "w-[110px] transition-all duration-600"}>
            <div className="px-8 pt-8">
                <div className={ opened ? "flex items-center justify-between" : "flex flex-col items-center" }>
                    
                    <div className={opened ? "hidden" : ""}>
                        <Button onClick={ToggleSidebar} className={ opened ? "p-2 rounded bg-[#1A1C1E] hover:bg-white" : "p-2 mb-6 "}>
                            <MoveRight className="w-4 h-4 text-white hover:text-black transition-colors duration-600" />
                        </Button>
                    </div>

                    <Link to="/" className="p-2">
                        <Layers className="text-[#1A1C1E] w-8 h-8" />
                    </Link>

                    <Button onClick={ToggleSidebar} className={ opened ? "p-2 rounded bg-[#1A1C1E] hover:bg-white" : "hidden"}>
                        <MoveLeft className="w-4 h-4 text-white hover:text-black transition-colors duration-600" />
                    </Button>
                    
                </div>
            </div>
            
            <hr className="mt-8 mr-8 ml-8 border-t-1 border-[#EFEFEF]" />
            <div className="px-6 pt-9">
                <ul>
                    <Link to="/" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-600 rounded-md mb-2">
                            <Gauge strokeWidth={2} className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-700" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Dashboard</p>
                        </li>
                    </Link>

                    <Link to="/serial" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-600 rounded-md mb-2">
                            <QrCode strokeWidth={2}  className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-600" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Seriais</p>
                        </li>
                    </Link>
                    
                    <Link to="/register" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-600 rounded-md mb-2">
                            <DatabaseZap strokeWidth={2}  className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-600" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Registradores</p>
                        </li>
                    </Link>

                    <Link to="/client" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-600 rounded-md mb-2">
                            <Hotel strokeWidth={2}  className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-700" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Clientes</p>
                        </li>
                    </Link>
                    <Link to="/branch" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-600 rounded-md mb-2">
                            <Map strokeWidth={2}  className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-700" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Branchs</p>
                        </li>
                    </Link>
                    <Link to="/user" className="group">
                        <li className="flex justify-start items-center font-mono subpixel-antialiased p-4 group-hover:bg-[#1A1C1E] transition-colors duration-300 rounded-md mb-2">
                            <Users strokeWidth={2}  className={opened ? "w-6 h-6 text[#1A1C1E] group-hover:text-white transition-colors duration-600" : "w-7 h-7 text[#1A1C1E] group-hover:text-white transition-colors duration-600"} />
                            <p className={ opened ? "pl-8 text-md text-black group-hover:text-white transition-colors duration-600" : "hidden"}>Usuários</p>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}