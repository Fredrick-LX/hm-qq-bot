import { Command } from "../types";
import { signIn } from "../services/signIn";

export const signInCommand: Command = {
    name: "qd",
    aliases: ["签到"],
    description: "每日签到",
    execute: async (message) => {
        const userId = message.sender.user_id;
        const result = await signIn(userId);
        await message.reply({
            type: "text",
            text: result,
        });
    },
}; 