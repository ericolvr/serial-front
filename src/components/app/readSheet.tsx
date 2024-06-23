import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    register: z.string({
        required_error: "Número do registrador",
    }),
});

interface ReadSheetProps {
    open: boolean;
    onOpenChange: () => void;
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const ReadSheet: React.FC<ReadSheetProps> = ({ open, onOpenChange, onSubmit }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Ler valor do registrador</SheetTitle>
                    <SheetDescription>
                        Informe o número do registrador a ser lido
                    </SheetDescription>
                    <div className="pt-7">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="register"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Número</FormLabel>
                                            <Input placeholder="Número do registrador" {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-8 w-full h-24">
                                    <Button type="submit" className="w-full bg-black font-mono cursor-pointer rounded-lg h-14">Ler Registrador</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default ReadSheet;
