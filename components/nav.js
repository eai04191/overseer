import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Nav() {
    const [session, loading] = useSession();
    return (
        <nav className="relative bg-white">
            <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 space-x-10">
                <div className="flex justify-start">Overseer</div>
                <div className="flex justify-end">
                    <>
                        {!session && (
                            <>
                                <button
                                    onClick={() => signIn("discord")}
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base  bg-discord text-white font-medium"
                                >
                                    Sign in With Discord
                                </button>
                            </>
                        )}
                        {session && (
                            <>
                                <div className="w-8 h-8 rounded-full">
                                    <Image
                                        src={session.user.image}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                {session.user.name}
                                <button
                                    onClick={() => signOut()}
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base  bg-discord text-white font-medium"
                                >
                                    Sign out
                                </button>
                            </>
                        )}
                    </>
                </div>
            </div>
        </nav>
    );
}
