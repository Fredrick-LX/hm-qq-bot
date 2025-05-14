import { Command } from "../types";
import { commands } from "./index";

export const helpCommand: Command = {
    name: "help",
    aliases: ["帮助"],
    description: "显示帮助信息",
    execute: async (message) => {
        const helpText = commands
            .map(cmd => `/${cmd.name}|/${cmd.aliases.join("|/")}：${cmd.description}`)
            .join("\n");
        
        await message.reply({
            type: "text",
            text: `帮助：\n${helpText}`,
        });
    },
}; 