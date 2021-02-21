import { NextApiRequest, NextApiResponse } from "next";
import { Rcon } from "rcon-client";

const getSteamProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { steamId, accessToken },
    } = req;
    // console.log(req.query);

    if (Array.isArray(steamId) || Array.isArray(accessToken)) {
        res.status(400).json({
            error: `steamId及びaccessTokenは配列であってはいけない`,
        });
        return;
    }
    if (!(await check({ steamId, discordAccessToken: accessToken }))) {
        res.status(400).json({
            error: `自分のではないSteamIDをキックしようとしている`,
        });
        return;
    }

    const response = await kick(steamId);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: response }));
};

export default getSteamProfile;

const kick = async (steamId: string) => {
    const host = process.env.ARK_RCON_HOST;
    const port = parseInt(process.env.ARK_RCON_PORT);
    const password = process.env.ARK_RCON_PASSWORD;

    try {
        const rcon = await Rcon.connect({
            host,
            port,
            password,
        });
        const response = await rcon.send(`KickPlayer ${steamId}`);
        rcon.end();
        return response.trim();
    } catch (error) {
        return error.message;
    }
};

const check = async ({
    steamId,
    discordAccessToken,
}: {
    steamId: string;
    discordAccessToken: string;
}) => {
    const response = await fetch(
        "https://discord.com/api/users/@me/connections",
        {
            headers: { Authorization: `Bearer ${discordAccessToken}` },
        }
    );
    const body = await response.json();

    return body
        .filter((connection) => connection.type == "steam")
        .map((connection) => connection.id)
        .includes(steamId);
};
