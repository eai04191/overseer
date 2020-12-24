module.exports = {
    purge: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media", // 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "discord": "#7289DA",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
