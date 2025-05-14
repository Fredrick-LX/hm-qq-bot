import { Command } from "../types";
import axios from "axios";

interface DailyResponse {
    code: number;
    data: {
        content: string;
        name: string;
        origin: string;
        tag: string;
    };
    error: null;
}

export const dailyCommand: Command = {
    name: "daily",
    aliases: ["每日一句"],
    description: "获取每日一句精美句子",
    async execute(message) {
        try {
            const response = await axios.get<DailyResponse>("https://api.xygeng.cn/one");
            const { data } = response.data;

            await message.reply({
                type: "text",
                text: `每日一句：\n${data.content}\n\n出处：${data.origin}\n作者：${data.name}\n标签：${data.tag}`,
            });
        } catch (error) {
            console.error("获取每日一句失败:", error);
            await message.reply({
                type: "text",
                text: "获取每日一句失败，请稍后再试！",
            });
        }
    },
}; 