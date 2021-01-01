import { useSession } from "next-auth/client";

const fire = ({ profile: profile, token: token }) => {
    console.log(profile.steamid);
    fetch(`/api/ark/kick/${profile.steamid}?accessToken=${token}`, {
        method: "POST",
    })
        .then((response) => response.json())
        .then((body) => alert(body.message));
};

export const 爆破 = ({ profile }) => {
    const [session] = useSession();
    return (
        <div
            className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-red-100 border-red-600 rounded-md shadow-sm"
            onClick={() => fire({ profile, token: session.accessToken })}
        >
            爆破
        </div>
    );
};
