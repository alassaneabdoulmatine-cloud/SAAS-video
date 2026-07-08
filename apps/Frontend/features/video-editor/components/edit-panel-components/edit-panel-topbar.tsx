
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
import TextStylePanel from "./TextStylePanel-components/style-base-components/texte-Style-bases"
import { Button } from "@/components/ui/button"
import TextStyleBase from "./TextStylePanel-components/style-base-components/texte-Style-bases";
import TextStrokeSection from "./TextStylePanel-components/style-text-line-components/text-stroke-section";
import TextShadowSection from "./TextStylePanel-components/style-shadow-components/TextShadowSection";
import { Separator } from "@/components/ui/separator";
import GeneralSubtitleSettings from "./SubtitlePanel-components/GeneralSubtitleSettings";

const tabs = [

    {
        id: 1,
        label: "Texte",
        value: "text"
    },
    {
        id: 2,
        label: "Sous-titre",
        value: "sous-titre"
    }
];


export function EditPanelTopBar() {
    return (
        <Tabs defaultValue="text" className="w-full">
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

            <TabsContent value="text" className="px-6 py-4">
                <div className="space-y-4">
                    <TextStyleBase />
                    <Separator />
                    <TextStrokeSection />
                    <Separator />
                    <TextShadowSection />
                </div>
            </TabsContent>
            <TabsContent value="sous-titre" className="px-6 py-4">
                <div>
                    <GeneralSubtitleSettings />
                </div>
            </TabsContent>
        </Tabs>
    )
}


