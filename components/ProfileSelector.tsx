import Image from "next/image";
import { useSteamProfiles } from "../lib/swr";

export const ProfileSelector = ({
    steamId,
    handler,
}: {
    steamId: number | number[];
    handler: (steamProfile: any) => void;
}): JSX.Element => {
    console.log(steamId);

    const id = typeof steamId === "number" ? steamId : steamId.join(",");
    console.log(id);
    const { profiles, isLoading, isError } = useSteamProfiles(id);

    if (isLoading) return <p>Steamから情報を取得中……</p>;
    if (isError) return <p>Steamから情報を取得中にエラーが発生しました</p>;
    if (profiles.length !== 1)
        return (
            <>
                <p>
                    アカウントに2つ以上のSteamプロフィールが接続されています。使用するSteamプロフィールを選択してください。
                </p>
                {profiles.map((profile) => (
                    <div onClick={() => handler(profile)}>
                        <div>
                            <Image
                                src={profile.avatarfull}
                                width={64}
                                height={64}
                            />
                        </div>
                        <div>{profile.personaname}</div>
                    </div>
                ))}
            </>
        );

    // 接続されているアカウントが1つの場合はそのまま処理をする
    handler(profiles[0]);
    return <></>;
};
