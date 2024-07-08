// import { Target, View } from "lucide-react";
// import { Messages } from "./messages";
// import { UserActions } from "./userActions";
// import { useEffect, useState } from "react";
// import ApiDashboard from "./dashboard/service";


// export function Navbar() {

//     const [status, setStatus] = useState(false);
    
//     const checkSerial = async () => {
//         const response = await ApiDashboard.CheckSerialPort();
//         if (response) {
//             setStatus(response);
//             return response;
//         } else {
//             setStatus(response);
//         }
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             checkSerial();
//             return () => clearInterval(interval);
//         }, 4000);
//     }, []);

//     return (
//         <></>
//         // <div className='justify-end'>
//         //     <div className="flex justify-between">
//         //         <View
//         //             className={`h-6 w-6 mt-2 mr-8 ${status ? 'text-green-500' : 'text-red-500'}`} 
//         //         />
//         //         <Messages />
//         //         <UserActions />
//         //     </div>
//         // </div>        
//     )
// }