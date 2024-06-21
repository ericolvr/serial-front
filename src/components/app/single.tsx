
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";

export function Single({ sheetOpen, toggleSheet }) {
    return (
        <Sheet open={sheetOpen} onOpenChange={(value) => toggleSheet(value)} className="fixed inset-0 z-50">
            <SheetContent className="sheet-content">
                <SheetHeader>
                    <SheetTitle>Escrever no Campo</SheetTitle>
                    <SheetDescription>
                        Esta parte será a última ser desenvolvida, logs e mensagens pessoais
                    </SheetDescription>
					<Button onClick={() => toggleSheet(false)}>Fechar</Button>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}


// import { useState } from 'react';
// import {
//     Sheet,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
// } from "@/components/ui/sheet";

// export function Single() {
//     const [opened, setOpened] = useState(false);
//     const toggleSheet = () => {
//         setOpened(!opened); // Toggle isOpen state
//     };

//     return (
//         <div>
//             <p className="p-3" onClick={toggleSheet}>Open Sheet</p>
//             <Sheet open={opened} onOpenChange={toggleSheet}>
//                 <SheetContent>
//                     <SheetHeader>
//                         <SheetTitle>Escrever no Campo</SheetTitle>
//                         <SheetDescription>
//                             Esta parte será a última ser desenvolvida, logs e mensagens pessoais
//                         </SheetDescription>
//                     </SheetHeader>
//                 </SheetContent>
//             </Sheet>
//         </div>
//     );
// }