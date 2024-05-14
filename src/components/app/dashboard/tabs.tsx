import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export function TabClients() {
    return (
        <Tabs defaultValue="basa" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basa">Basa</TabsTrigger>
                <TabsTrigger value="bnb">BNB</TabsTrigger>
                <TabsTrigger value="caixa">Caixa</TabsTrigger>
            </TabsList>

            <TabsContent value="basa">
                <div className="grid grid-cols-12 gap-4 mt-8">
                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Produção
                                </CardDescription>
                                <CardTitle>42</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Operacional
                                </CardDescription>
                                <CardTitle>232</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Estoque
                                </CardDescription>
                                <CardTitle>198</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Financeiro
                                </CardDescription>
                                <CardTitle>16</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-12"> 
                        <Card className="bg-black">
                            <CardHeader>
                                <CardDescription className="text-white">
                                    Total de Geradores em Produção
                                </CardDescription>
                                <CardTitle className="text-white">488</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </TabsContent>
            
            <TabsContent value="bnb">
                <div className="grid grid-cols-12 gap-4 mt-8">
                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Produção
                                </CardDescription>
                                <CardTitle>31</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Operacional
                                </CardDescription>
                                <CardTitle>189</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Estoque
                                </CardDescription>
                                <CardTitle>52</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Financeiro
                                </CardDescription>
                                <CardTitle>21</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-12"> 
                        <Card className="bg-black">
                            <CardHeader>
                                <CardDescription className="text-white">
                                    Total de Geradores em Produção
                                </CardDescription>
                                <CardTitle className="text-white">293</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="caixa">
                <div className="grid grid-cols-12 gap-4 mt-8">
                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Produção
                                </CardDescription>
                                <CardTitle>76</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Operacional
                                </CardDescription>
                                <CardTitle>1037</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Estoque
                                </CardDescription>
                                <CardTitle>69</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-6"> 
                        <Card>
                            <CardHeader>
                                <CardDescription>
                                    Fase - Financeiro
                                </CardDescription>
                                <CardTitle>76</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="col-span-12"> 
                        <Card className="bg-black">
                            <CardHeader>
                                <CardDescription className="text-white">
                                    Total de Geradores em Produção
                                </CardDescription>
                                <CardTitle className="text-white">1258</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </TabsContent>

        </Tabs>
    )
}