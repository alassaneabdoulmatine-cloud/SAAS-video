import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from "@/components/ui/spinner";
import { Video } from "../../types/video-type";
import { useVideos } from "../../queries/videos-queries";

type deleteVideoModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    video: Video;
}

export function DeleteVideoModal({ open, setOpen, video }: deleteVideoModalProps) {

    const { deleteVideo, isPendingDeleteVideo } = useVideos();

    function handldeDeleteVideo() {
        deleteVideo({ videoId: video.id });
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent >

                {/* HEADER : Icône et Titre sur la même ligne, alignés à gauche */}
                <AlertDialogHeader className="flex flex-row items-center justify-start gap-3 space-y-0 text-left">
                    <AlertDialogTitle className="text-lg font-semibold">
                        Supprimer projet
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {/* BODY : La phrase descriptive */}
                <div className="text-sm text-muted-foreground text-left">
                    Etes vous sure de vouloir supprimer <span className="font-bold text-foreground">{video.title}</span> ? <span className="text-destructive">cette action est irreversible</span>
                </div>

                {/* FOOTER : Les boutons aux deux extrémités */}
                <AlertDialogFooter className="flex sm:flex-row items-center justify-between gap-2  sm:space-x-0">
                    <AlertDialogCancel variant="outline" className="cursor-pointer m-0 sm:m-0">
                        Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handldeDeleteVideo} variant="destructive" disabled={isPendingDeleteVideo} className="cursor-pointer m-0 sm:m-0">
                        {isPendingDeleteVideo && <Spinner />}
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}