import { signIn, signOut, useSession } from "next-auth/client";
import clsx from "clsx";

export const SignIn = () => {
    const [session] = useSession();

    return (
        <div
            className={clsx(
                "relative flex flex-col p-4 border-2 border-gray-200 rounded-lg shadow-md",
                session && "pointer-events-none opacity-50"
            )}
        >
            <h2 className="text-lg font-bold">1. Sign in</h2>

            {/* セッションがないならログインボタンを表示する */}
            {!session && (
                <button
                    onClick={() => signIn("discord")}
                    className="inline-flex flex-grow items-center justify-center mt-2 p-4 text-white font-medium bg-discord border rounded-md shadow-sm select-none"
                >
                    Sign in with Discord
                </button>
            )}

            {/* セッションがあるならログイン情報を表示する */}
            {session && (
                <div className="flex flex-col mt-2 md:flex-row">
                    <div className="flex flex-grow items-center justify-center p-4 min-w-0 text-white font-medium bg-discord border rounded-md shadow-sm select-none">
                        {/* 画面がmdのときはSigned in as */}
                        <div className="hidden flex-grow-0 flex-shrink-0 md:block">
                            Signed in as&nbsp;
                        </div>
                        {/* 画面がsmのときはasのみ */}
                        <div className="md:hidden">as&nbsp;</div>
                        {/* ユーザー名
                        #0000 の数字は常に表示する */}
                        <div className="font-semibold truncate">
                            {session.user.name.split("#")[0]}
                        </div>
                        <div>#{session.user.name.split("#")[1]}</div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="text-gray inline-flex flex-grow-0 flex-shrink-0 items-center justify-center mt-2 px-8 py-4 min-w-0 font-medium bg-white border rounded-md shadow-sm pointer-events-auto select-none md:ml-4 md:mt-0"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};
