/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        customKey: 'Test Next Config',
    },

    // URL 변하지 않고 root으로 이동
    async rewrites() {
        return [
            {
                source: '/about/:slug*',
                destination: '/',
                has: [{ type: 'query', key: 'test', value: 'rewrite' }], // 특정 쿼리에만 홈으로
            },
        ];
    },

    // aboutme입력시 root로 변환 및 이동
    async redirects() {
        return [
            {
                source: '/aboutme',
                destination: '/',
                permanent: false,
            },
        ];
    },

    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
    },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
