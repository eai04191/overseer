import {} from "react";
import { signIn, useSession } from "next-auth/client";

const fire = ({ profile: profile, token: token }) => {
    console.log(profile.steamid);
    fetch(`/api/ark/kick/${profile.steamid}?accessToken=${token}`, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((body) => alert(body.message));
};

const 爆破 = (profile) => {
    const [session, loading] = useSession();
    return (
        <div
            className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-red-100 border-red-600 rounded-md shadow-sm"
            // WHY
            onClick={() =>
                fire({ profile: profile.profile, token: session.accessToken })
            }
        >
            爆破
        </div>
    );
};

export default 爆破;
