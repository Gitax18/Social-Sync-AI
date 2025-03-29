import { _post } from "./base-api"

class AiApi {
    static async generate(platform: string, { description, inspiration }: { description: string, inspiration: string }):Promise<string> {
        try {
            const data = await _post({ api: "/ai/generate/" + platform, data: { description, inspiration } })
            localStorage.setItem(platform, JSON.stringify(data))
            return data as string
        } catch (error) {
            return "error"
        }
    }
}

export default AiApi