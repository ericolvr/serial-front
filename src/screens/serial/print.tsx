import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import ApiSerial from './service'; 
import { time } from 'console';




export function SerialPrint() {
    const { id } = useParams<{ id: string }>();
    const [serial, setSerial] = useState<any>({});
    

    const getSerial = async () => {
        const response = await ApiSerial.GetSerial({id});
        console.log(response)
        if (response.qrcode) {
            setSerial(response);
        } else {
            console.log('SEM EQUIPMENTO')
        }
    }

    const print = () => {
        window.print();
    }

    useEffect(() => {
        getSerial();
        if(serial.qrcode) {
            print();
        }
    }, [serial.qrcode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg">

                <div className='flex flex-row justify-between gap-4 pt-6 items-center'>
                    <h2 className="text-2xl pl-6 mb-1">Alarmtek</h2>
                    {/* <p className="pr-6 mb-1 text-xs">MADE IN BRAZIL</p> */}
                    <p className="pr-6 mb-1 text-xl font-extrabold">S/N {serial.serial_number}</p>
                </div>

                <div className='flex flex-row justify-between items-center'>
                    <img src={`data:image/png;base64,${serial.qrcode}`} className='w-[150px] h-[150px] ml-1 mr-4' />
                    <div className='flex flex-col gap-1 w-[150px] h-[150px] mr-6 mt-3'>
                        <p className='text-xl pt-2 pl-3 font-bold text-right'>{serial.client_name}</p>
                        <p className='pt-6 pl-3 text-lg text-right'>Fog Cannon</p>
                        <p className='text-lg pl-3 text-right'>ATK{serial.equipment}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg">

                <div className='flex flex-row justify-between gap-4 pt-6 items-center'>
                    <h2 className="text-2xl pl-6 mb-1">Alarmtek</h2>
                    {/* <p className="pr-6 mb-1 text-xs">MADE IN BRAZIL</p> */}
                    <p className="pr-6 mb-1 text-xl font-extrabold">S/N {serial.serial_number}</p>
                </div>

                <div className='flex flex-row justify-between items-center'>
                    <img src={`data:image/png;base64,${serial.qrcode}`} className='w-[150px] h-[150px] ml-1 mr-4' />
                    <div className='flex flex-col gap-1 w-[150px] h-[150px] mr-6 mt-3'>
                        <p className='text-xl pt-2 pl-3 font-bold text-right'>{serial.client_name}</p>
                        <p className='pt-6 pl-3 text-lg text-right'>Fog Cannon</p>
                        <p className='text-lg pl-3 text-right'>ATK{serial.equipment}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


