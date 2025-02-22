const config = {
    env: {
        apiEndPoint: process.env.NEXT_PUBLIC_API_END_POINT!,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            urlEndPoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        }
    }
}

export default config