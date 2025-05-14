import axios from "axios";

export async function getRandomPic(): Promise<string> {
    try {
        const response = await axios.get("https://api.yimian.xyz/img?type=moe&size=1920x1080");
        return response.data;
    } catch (error) {
        console.error("获取随机图片失败:", error);
        return "https://api.yimian.xyz/img?type=moe&size=1920x1080";
    }
} 