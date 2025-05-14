import { Command } from "../types";
import { getZvvPic } from "../services/zvv";

export const zvvCommand: Command = {
    name: "zvv",
    aliases: ["维维"],
    description: "随机获取指定关键字的zvv图片",
    execute: async (message, args) => {
        const keyword = args[0] || "？";
        const picUrl = await getZvvPic(keyword);
        await message.reply({
            type: "image",
            file: picUrl,
        });
    },
}; 