import { Command } from "../types";
import { getTodayHistory } from "../services/history";

export const historyCommand: Command = {
    name: "history",
    aliases: ["史今"],
    description: "获取历史上的今天发生的事件",
    async execute(message) {
        try {
            const historyEvents = await getTodayHistory();
            const formattedMessage = historyEvents.join("\n");
            console.log(formattedMessage);
            await message.reply({
                type: "text",
                text: `历史上的今天：\n${formattedMessage}`
            });
        } catch (error) {
            console.error("执行历史上的今天命令失败:", error);
            await message.reply({
                type: "text",
                text: "被和谐力(╯°□°)╯︵ ┻━┻"
            });
        }
    }
}; 