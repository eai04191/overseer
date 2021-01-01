import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import { ProfileSelector } from "../components/ProfileSelector";
import { signIn, useSession } from "next-auth/client";
import useSWR from "swr";
import { 爆破 } from "../components/爆破";

const IndexPage = () => {
    const [session, loading] = useSession();
    const [linkedSteamIds, setLinkedSteamIds] = useState<string[] | null>(null);
    const [steamProfile, setSteamProfile] = useState(null);
    const setSteamProfileHandle = (profile) => {
        setSteamProfile(profile);
    };

    const { data, error } = useSWR<string[], Error>(
        session ? "https://discord.com/api/users/@me/connections" : null,
        (url) =>
            fetch(url, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
            })
                .then((response) => response.json())
                .then((connections: DiscordConnectionEntry[]) => {
                    return connections
                        .filter((connection) => connection.type == "steam")
                        .map((connection) => connection.id);
                })
    );

    useEffect(() => {
        if (!data) return;
        console.log(data);
        setLinkedSteamIds(data);
    }, [data]);

    return (
        <div>
            <Nav />
            {steamProfile && (
                <>
                    "現在アカウント:" {steamProfile.personaname}
                    <爆破 profile={steamProfile} />
                </>
            )}
            <div className="py-20">
                {!session && "ログインしてください"}
                {session && linkedSteamIds && (
                    <ProfileSelector
                        steamId={linkedSteamIds}
                        handler={setSteamProfileHandle}
                    />
                )}
            </div>
        </div>
    );
};

export default IndexPage;
