// "use client";

// import { Button } from "@/components/ui/button";
// import { icons } from "lucide-react";

// const tabs = [
//     {
//         id: 1,
//         label: "Sous-titre"
//     },
//     {
//         id: 2,
//         label: "Text"
//     },
//     {
//         id: 3,
//         label: "Animation"
//     }
// ]

// export function EditPanelTopBar() {

//     return (
//         <header className="h-14 flex items-center justify-between border-b border-border px-6 z-50 bg-muted/50">
//             <div className="flex gap-4">
//                 {tabs.map((tab) => (
//                     <Button key={tab.id} variant="ghost" className="text-sm">
//                         {tab.label}
//                     </Button>
//                 ))}
//             </div>

//             <div className="flex items-center gap-4">
//                 <Button variant="outline" size="sm" className="font-semibold cursor-pointer">Sauvegarder</Button>
//                 <Button size="sm" className="font-semibold cursor-pointer">
//                     Exporter
//                 </Button>
//             </div>

//         </header>
//     );
// }



import {
    Card,
    CardContent,
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
import TextStylePanel from "./TextStylePanel-components/TextStylePanel"
import { Button } from "@/components/ui/button"

const tabs = [

    {
        id: 1,
        label: "Propriétés",
        value: "Propriétés"
    },
];


export function EditPanelTopBar() {
    return (
        <Tabs defaultValue="Propriétés" className="w-full">
            <div className="w-full flex items-center justify-between gap-4 bg-muted/50 p-4 border-b border-border ">
                <TabsList className="bg-transparent gap-4">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.id} className="shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent! data-[state=active]:text-primary! border-none cursor-pointer" value={tab.value}>{tab.label}</TabsTrigger>
                    ))}
                </TabsList>

                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="font-semibold cursor-pointer">Sauvegarder</Button>
                    <Button size="sm" className="font-semibold cursor-pointer">
                        Exporter
                    </Button>
                </div>
            </div>

            <TabsContent value="Propriétés" className="px-6 py-4">
                <TextStylePanel />
            </TabsContent>
        </Tabs>
    )
}




// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs"
// import TextStylePanel from "./TextStylePanel-components/TextStylePanel"
// import { Button } from "@/components/ui/button"

// export function EditPanelTopBar() {
//     return (
//         <Tabs defaultValue="sous-titre" className="w-full">
//             <div className="w-full flex items-center justify-between gap-4 bg-muted/50 p-4 border-b border-border ">
//                 <TabsList className="bg-transparent gap-4">
//                     {/* Utilisation de data-[state=active]: et text-yellow-500 pour le texte jaune sans fond ni bordure */}
//                     <TabsTrigger
//                         className="bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:text-yellow-500 data-[state=active]:shadow-none text-zinc-400 transition-colors"
//                         value="sous-titre"
//                     >
//                         sous-titre
//                     </TabsTrigger>

//                     <TabsTrigger
//                         className="bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:text-yellow-500 data-[state=active]:shadow-none text-zinc-400 transition-colors"
//                         value="text"
//                     >
//                         Text
//                     </TabsTrigger>

//                     <TabsTrigger
//                         className="bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:text-yellow-500 data-[state=active]:shadow-none text-zinc-400 transition-colors"
//                         value="animation"
//                     >
//                         Animation
//                     </TabsTrigger>
//                 </TabsList>

//                 <div className="flex items-center gap-4">
//                     <Button variant="outline" size="sm" className="font-semibold cursor-pointer">Sauvegarder</Button>
//                     <Button size="sm" className="font-semibold cursor-pointer">
//                         Exporter
//                     </Button>
//                 </div>
//             </div>

//             <TabsContent value="sous-titre">
//                 {/* Contenu sous-titre */}
//             </TabsContent>

//             <TabsContent value="text" className="p-6">
//                 <TextStylePanel />
//             </TabsContent>

//             <TabsContent value="animation">
//                 {/* Contenu animation */}
//             </TabsContent>
//         </Tabs>
//     )
// }

