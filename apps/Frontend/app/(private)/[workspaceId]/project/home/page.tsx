"use client";
import EmptyProject from "@/features/projects/components/emptyProject"
import ProjectGrid from "@/features/projects/components/ProjectGrid"
import { useProjects } from "@/features/projects/queries/projects-queries";

export default function Page() {
    const { projects, projectsLoading } = useProjects();
    if (projectsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }
    return (
        <>
            {projects && projects.length > 0 ? <ProjectGrid /> : <EmptyProject />}
        </>
    )
}