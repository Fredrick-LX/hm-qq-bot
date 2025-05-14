import axios from "axios";
import { JSDOM } from "jsdom";

export async function getZvvPic(keyword: string): Promise<string> {
    try {
        const response = await axios.get(`https://zvv.vercel.app/api/search?keyword=${encodeURIComponent(keyword)}`);
        const dom = new JSDOM(response.data);
        const images = Array.from(dom.window.document.querySelectorAll("img"));
        const randomImage = images[Math.floor(Math.random() * images.length)];
        return randomImage?.src || "https://zvv.vercel.app/api/random";
    } catch (error) {
        console.error("获取维维图片失败:", error);
        return "https://zvv.vercel.app/api/random";
    }
} 