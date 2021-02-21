import { useState } from "react";
import { useSession } from "next-auth/client";

const fire = ({ profile: profile, token: token }) => {
    return fetch(`/api/ark/kick/${profile.steamid}?accessToken=${token}`, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((body) => body.message)
        .catch((error) => {
            "Kickに失敗しました。設定を見直してください。\n\n" + error;
        });
};

export const KickButton = ({ profile }) => {
    const [waiting, setWaiting] = useState(false);
    const [session] = useSession();
    return (
        <div
            className="inline-flex items-center justify-center px-4 py-2 text-red-100 bg-red-500 border-red-600 rounded-md shadow-sm"
            onClick={async () => {
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
