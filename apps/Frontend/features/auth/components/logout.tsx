"use client"

import { Button } from "@/components/ui/button"
import { uselogout } from "../queries/logout"

export default function logout() {
    const { mutate: logout } = uselogout();
    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        logout();
    }
    return (
        <div>
            <Button onClick={handleLogout} className="cursor-pointer">Logout</Button>
        </div>
    )
}