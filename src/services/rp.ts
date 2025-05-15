import axios from "axios";
import { JSDOM } from "jsdom";

export async function getRandomPic(): Promise<string> {
    try {
        const response = await axios({
            method: 'get',
            url: "https://v2.xxapi.cn/api/randomAcgPic?type=pc&return=json",
            timeout: 10000
        });
        return response.data.data;
    } catch (error) {
        console.error("获取随机图片失败:", error);
        return "https://v2.xxapi.cn/api/randomAcgPic?type=pc&return=json";
    }
} 