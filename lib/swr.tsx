import useSWR from "swr";

export const useDiscordConnections = (accessToken) => {
    const fetcher = (url) =>
        fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }).then((response) => response.json());

    const { data, error } = useSWR(
        "https://discord.com/api/users/@me/connections",
        fetcher
    );

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useSteamProfiles = (steamId: string | number) => {
    console.log(steamId);
    const fetcher = (url) => fetch(url).then((response) => response.json());

    const { data, error } = useSWR(`/api/steam/${steamId}`, fetcher);

    return {
        profiles: data,
        isLoading: !error && !data,
        isError: error,
    };
};

// export const useName = (id) => {
//     return useSWR(`/api/user_name/${id}`, ioTsFetcher(userNameType));
// };
