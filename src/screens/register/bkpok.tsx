import { useState } from 'react';
import { MailPlus } from "lucide-react";
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

export function RegisterResults() {
    const [sheetOpen, setSheetOpen] = useState(false);

    const toggleSheet = () => {
        setSheetOpen(!sheetOpen); 
    };

    return (
        <div>
            <p className="p-3" onClick={toggleSheet}>Open Sheet</p>
            <Sheet open={sheetOpen} onOpenChange={toggleSheet}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Escrever no Campo</SheetTitle>
                        <SheetDescription>
                        {/* <Button onClick={toggleSheet}>Close</Button> */}
                            Esta parte será a última ser desenvolvida, logs e mensagens pessoais
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
}