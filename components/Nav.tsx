import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

export const Nav = () => {
    const [session] = useSession();
    return (
        <nav className="relative bg-white">
            <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 space-x-10">
                <div className="flex justify-start">Overseer</div>
                <div className="flex justify-end"></div>
            </div>
        </nav>
    );
};
