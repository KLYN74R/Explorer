import webpack from 'webpack';

const originalConsoleError = console.error;

console.error = (message, ...optionalParams) => {
    if (typeof message === 'string' && message.includes('[DEP0005] DeprecationWarning: Buffer() is deprecated')) {
        return;
    }
    originalConsoleError(message, ...optionalParams);
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Suppress specific warnings
        config.plugins.push(
            new webpack.ContextReplacementPlugin(
                /keyv[\/\\]src/,
                (data) => {
                    data.dependencies.forEach((dependency) => {
                        if (dependency.critical) {
                            delete dependency.critical;
                        }
                    });
                    return data;
                }
            )
        );

        return config;
    },
};

export default nextConfig;
