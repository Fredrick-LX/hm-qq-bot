import axios from "axios";

export async function getZvvPic(keyword: string): Promise<string> {
    try {
        const response = await axios.get(`https://api.zvv.quest/search?q=${encodeURIComponent(keyword)}&n=1`);
        const data = response.data;
        if (data.code === 200 && data.data && data.data.length > 0) {
            return data.data[0];
        }
        return "https://api.zvv.quest/search?q=1&n=1";
    } catch (error) {
        console.error("获取维维图片失败:", error);
        return "https://api.zvv.quest/search?q=1&n=1";
    }
} 