import { useState } from "react";
import { useSession } from "next-auth/client";
import clsx from "clsx";

const fire = ({ profile: profile, token: token }) => {
    return fetch(`/api/ark/kick/${profile.steamid}?accessToken=${token}`, {
        method: "POST",
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(
                    "Kickに失敗しました。設定を見直してください。\n\n" +
                        response.statusText
                );
            }
            return response.json();
        })
        .then((body) => body.message)
        .catch((error) => {
            "ネットワークエラーが発生しました" + error;
        });
};

export const KickButton = ({ profile }) => {
    const [waiting, setWaiting] = useState(false);
    const [session] = useSession();
    return (
        <div
            className={clsx(
                "inline-flex items-center justify-center px-4 py-2 text-red-100 bg-red-500 border-red-600 rounded-md shadow-sm",
                waiting ? "opacity-75" : "cursor-pointer"
            )}
            onClick={async () => {
                if (waiting) return;
                setWaiting(true);
                const message = await fire({
                    profile,
                    token: session.accessToken,
                });
                alert(message);
                setWaiting(false);
            }}
        >
            {waiting ? (
                <>
                    <img
                        src="https://s2.svgbox.net/loaders.svg?ic=elastic-spinner&color=red-100"
                        width="24"
                        height="24"
                        className="mr-1"
                    />
                    Sending...
                </>
            ) : (
                "KICK!"
            )}
        </div>
    );
};
