const config = {
    env: {
        apiEndPoint: process.env.NEXT_PUBLIC_API_END_POINT!,
        prodApiEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndPoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        },
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL!,
            redisToken: process.env.UPSTASH_REDIS_TOKEN,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
    }
}

export default config