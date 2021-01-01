import Image from "next/image";
import { useSteamProfiles } from "../lib/swr";

export const ProfileSelector = ({
    steamId,
    handler,
}: {
    steamId: string[];
    handler: (steamProfile: SteamProfile) => void;
}): JSX.Element => {
    const { profiles, isLoading, isError } = useSteamProfiles(
        steamId.join(",")
    );

    if (isLoading || isError)
        return (
            <div className="relative flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow">
                <h2 className="text-lg font-bold">2. Choose Steam Profile</h2>
                <div className="">
                    {isLoading && "Steamから情報を取得中……"}
                    {isError && "Steamから情報を取得中にエラーが発生しました"}
                </div>
            </div>
        );

    // 接続されているアカウントが1つの場合は自動的に選択する
    if (profiles.length === 1) handler(profiles[0]);

    return (
        <div className="relative flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow">
            <h2 className="text-lg font-bold">2. Choose Steam Profile</h2>
            {profiles.length !== 1 && (
                <p>
                    アカウントに2つ以上のSteamプロフィールが接続されています。使用するSteamプロフィールを選択してください。
                </p>
            )}
            <div className="mt-2 space-y-2">
                {profiles.map((profile) => (
                    <div onClick={() => handler(profile)}>
                        <div className="flex items-center p-2 border rounded-md shadow-sm space-x-2 md:p-4 md:space-x-4">
                            <div
                                className="flex flex-grow-0 flex-shrink-0 rounded-md shadow-sm"
                                style={{ height: "52px" }}
                            >
                                <Image
                                    className="rounded-md"
                                    src={profile.avatarfull}
                                    width={52}
                                    height={52}
                                />
                            </div>
                            <div className="flex flex-col flex-shrink justify-end min-w-0">
                                <div className="text-black font-medium leading-6 truncate">
                                    {profile.personaname}
                                </div>
                                {/* <div className="text-gray-500 text-sm leading-snug overflow-x-auto">
                                    {profile.steamid}
                                </div> */}
                                <div className="whitespace-nowrap text-sm leading-snug overflow-x-auto">
                                    <a
                                        href={profile.profileurl}
                                        target="_blank"
                                        className="text-blue-400"
                                    >
                                        {profile.profileurl.replace(
                                            "https://",
                                            ""
                                        )}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
