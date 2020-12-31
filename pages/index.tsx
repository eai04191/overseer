import { useState, useEffect } from "react";
import Nav from "../components/nav";
import ProfileSelector from "../components/ProfileSelector";
import { signIn, useSession } from "next-auth/client";
// import { useDiscordConnections } from "../lib/swr";
import useSWR from "swr";
import 爆破 from "../components/爆破";

const IndexPage = () => {
    const [session, loading] = useSession();
    const [connections, setConnections] = useState<number[] | null>(null);
    const [steamProfile, setSteamProfile] = useState(null);
    const setSteamProfileHandle = (profile) => {
        setSteamProfile(profile);
    };

    const { data, error } = useSWR(
        session ? "https://discord.com/api/users/@me/connections" : null,
        (url) =>
            fetch(url, {
                headers: { Authorization: `Bearer ${session.accessToken}` },
            })
                .then((response) => response.json())
                .then((connections) => {
                    return connections
                        .filter((connection) => connection.type == "steam")
                        .map((connection) => connection.id);
                })
    );

    console.log(data);

    useEffect(() => {
        if (!data) return;
        setConnections(data);
    }, [data]);

    return (
        <div>
            <Nav />
            {steamProfile && (
                <>
                    "現在アカウント:" {steamProfile.personaname}
                    <爆破 profile={steamProfile}/>
                </>
            )}
            <div className="py-20">
                {/* {connections ? (
                    <ProfileSelector steamId={connections} />
                ) : session ? (
                    "Discordから接続情報を取得中..."
                ) : (
                    "ログインしてください"
                )} */}

                {!session && "ログインしてください"}
                {session && connections && (
                    <ProfileSelector
                        steamId={connections}
                        handler={setSteamProfileHandle}
                    />
                )}
            </div>
        </div>
    );
};

export default IndexPage;
