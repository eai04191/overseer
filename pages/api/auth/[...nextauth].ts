import { profile } from "console";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    providers: [
        {
            id: "discord",
            name: "Discord",
            type: "oauth",
            version: "2.0",
            scope: "identify email connections",
            params: { grant_type: "authorization_code" },
            accessTokenUrl: "https://discord.com/api/oauth2/token",
            authorizationUrl:
                "https://discord.com/api/oauth2/authorize?response_type=code&prompt=none",
            profileUrl: "https://discord.com/api/users/@me",
            profile: (profile) => {
                if (profile.avatar === null) {
                    const default_avatar_num =
                        parseInt(profile.discriminator) % 5;
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${default_avatar_num}.png`;
                } else {
                    // const format =
                    //     profile.premium_type === 1 || profile.premium_type === 2
                    //         ? "gif"
                    //         : "png";
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
                }
                return {
                    id: profile.id,
                    user_id: profile.id,
                    bot: profile.bot,
                    name: profile.username,
                    image: profile.image_url,
                    email: profile.email,
                };
            },
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        },
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {},
    callbacks: {
        // signIn: async (user, account, profile) => { return Promise.resolve(true) },
        // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
        // session: async (session, user, sessionToken) => {
        //     console.log(sessionToken);
        //     session.bar = 'HILL';
        //     return Promise.resolve(session);
        //},
        session: async (session, user) => {
            session.user.name = `${user.name}#${user.profile.discriminator}`;
            session.user.id = user.profile.id;
            session.refreshToken = user.account.refreshToken;
            session.accessToken = user.account.accessToken;
            return Promise.resolve(session);
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            if (profile) {
                token.profile = profile;
                token.account = account;
            }
            return Promise.resolve(token);
        },
    },
};

export default (req, res) => NextAuth(req, res, options);
