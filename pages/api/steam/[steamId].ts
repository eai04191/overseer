import { NextApiRequest, NextApiResponse } from "next";

// https://www.webprofessional.jp/sort-an-array-of-objects-in-javascript/
const compare = (a, b) => {
    const steamidA = a.steamid;
    const steamidB = b.steamid;

    if (steamidA > steamidB) {
        return 1;
    } else if (steamidA < steamidB) {
        return -1;
    }
    return 0;
};

const getSteamProfile = async (req: NextApiRequest, res: NextApiResponse) => {
    const key = process.env.STEAM_API_KEY;
    const {
        query: { steamId },
    } = req;
    const response = await fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`
    );
    const body = await response.json();
    const players = body.response.players;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // SteamのAPIは帰ってくる順番が適当なのでソートする
    res.end(JSON.stringify(players.sort(compare)));
    return response;
};

export default getSteamProfile;
