import { useState, useEffect } from "react";
import Nav from "../components/nav";
import { signIn, signOut, useSession } from "next-auth/client";
import useSWR from "swr";

export default function IndexPage() {
    const [session, loading] = useSession();
    const [connections, setConnections] = useState(null);

    // 初回だけ読み込む
    useEffect(() => {
        if (!session) return;
        fetch("https://discord.com/api/users/@me/connections", {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        })
            .then((res) => res.json())
            .then((data) =>
                setConnections(
                    data.filter((c) => c.type == "steam").map((c) => c.id)
                )
            );
    }, [loading]);

    return (
        <div>
            <Nav />
            <div className="py-20">
                <h1 className="text-5xl text-center text-gray-700 dark:text-gray-100">
                    {connections}
                </h1>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            // props for your component
        },
    };
}
