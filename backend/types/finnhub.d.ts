declare module "finnhub" {
    export class DefaultApi {
        constructor(apiKey: string)
        marketNews(
            category: string,
            opts: { minId?: number },
            callback: (error: unknown, data: unknown, response: unknown) => void
        ): void
    }

    const finnhub: { DefaultApi: typeof DefaultApi }
    export default finnhub
}
