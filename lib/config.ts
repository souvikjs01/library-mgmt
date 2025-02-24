const config = {
    env: {
        apiEndPoint: process.env.NEXT_PUBLIC_API_END_POINT!,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndPoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        },
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL!,
            redisToken: process.env.UPSTASH_REDIS_TOKEN,
        }
    }
}

export default config