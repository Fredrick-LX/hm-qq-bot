import axios from "axios";

interface ChatResponse {
    code: number;
    msg: string;
    data: string;
    request_id: string;
}

export async function chatWithTuring(message: string): Promise<string> {
    try {
        const response = await axios.get<ChatResponse>(`https://v2.xxapi.cn/api/turing?msg=${encodeURIComponent(message)}`);
        if (response.data.code === 200 && response.data.data) {
            return response.data.data;
        }
        return "抱歉，我现在有点累，稍后再聊吧~";
    } catch (error) {
        console.error("聊天API调用失败:", error);
        return "抱歉，我遇到了一些问题，请稍后再试~";
    }
} 