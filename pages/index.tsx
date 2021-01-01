import { useState, useEffect } from "react";
import { Nav } from "../components/Nav";
import Image from "next/image";
import { ProfileSelector } from "../components/ProfileSelector";
import { useSession } from "next-auth/client";
import useSWR from "swr";
import { 爆破 } from "../components/爆破";
import { SignIn } from "../components/SignIn";
import Head from "next/head";

const IndexPage = () => {
    const [session, loading] = useSession();
    const [linkedSteamIds, setLinkedSteamIds] = useState<string[] | null>(null);
    const [steamProfile, setSteamProfile] = useState(null);
    const setSteamProfileHandle = (profile) => {
        setSteamProfile(profile);
    };
    const [noConnection, setNoConnection] = useState(false);

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
        if (data.length === 0) {
            setNoConnection(true);
            return;
        }
        console.log(data);
        setLinkedSteamIds(data);
    }, [data]);

    console.log(data);

    return (
        <div>
            <Head>
                <title>Overseer</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta property="og:title" content="Overseer" />
                <meta
                    name="description"
                    content="Overseer is a web app for small ARK servers. Players can log in with their Discord account and kick themselves."
                />
            </Head>
            <Nav />
            <div className="container mx-auto px-4 py-4 space-y-4">
                <SignIn />
                {noConnection && (
                    <div className="relative flex flex-col mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow">
                        DiscordにSteamプロフィールが接続されていないようです。
                        <br />
                        Discordのユーザー設定を開き、接続からSteamプロフィールを接続してください。
                        {/* HACK: roundedのアールが画像と枠で合わない */}
                        <div className="flex mt-2 bg-gradient-to-r border-2 rounded-md shadow-sm from-gray-200 to-white">
                            <Image
                                className="rounded-md"
                                src="/images/connect_steam_profile_to_discord.png"
                                alt=""
                                width={1058}
                                height={237}
                            />
                        </div>
                    </div>
                )}
                {session && linkedSteamIds && (
                    <ProfileSelector
                        steamId={linkedSteamIds}
                        handler={setSteamProfileHandle}
                    />
                )}
                {steamProfile && (
                    <div className="relative flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow">
                        <h2 className="text-lg font-bold">3. Kick Yourself!</h2>
                        現在選択されているアカウント: {steamProfile.personaname}
                        <br />
                        <爆破 profile={steamProfile} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndexPage;
