import { Command } from "../types";
import { chatWithTuring } from "../services/chat";

export const chatCommand: Command = {
    name: "chat",
    aliases: ["聊天"],
    description: "与机器人聊天",
    async execute(message, args) {
        if (args.length === 0) {
            await message.reply({
                type: "text",
                text: "请输入要聊天的内容，例如：/chat 你好",
            });
            return;
        }

        try {
            const response = await chatWithTuring(args.join(" "));
            await message.reply({
                type: "text",
                text: response,
            });
        } catch (error) {
            console.error("聊天失败:", error);
            await message.reply({
                type: "text",
                text: "抱歉，我遇到了一些问题，请稍后再试~",
            });
        }
    },
}; 