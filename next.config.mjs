import webpack from 'webpack';

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
