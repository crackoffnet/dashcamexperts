declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                obsidian: string;
                graphite: string;
                steel: string;
                gold: {
                    300: string;
                    400: string;
                    500: string;
                    600: string;
                };
            };
            fontFamily: {
                sans: [string, string, string, string, string];
            };
            boxShadow: {
                glow: string;
            };
            backgroundImage: {
                "hero-radial": string;
                "panel-gradient": string;
            };
            keyframes: {
                float: {
                    "0%, 100%": {
                        transform: string;
                    };
                    "50%": {
                        transform: string;
                    };
                };
                pulseLine: {
                    "0%, 100%": {
                        opacity: string;
                    };
                    "50%": {
                        opacity: string;
                    };
                };
            };
            animation: {
                float: string;
                pulseLine: string;
            };
        };
    };
    plugins: any[];
};
export default _default;
