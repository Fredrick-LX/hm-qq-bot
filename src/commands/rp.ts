import { Command } from "../types";
import { getRandomPic } from "../services/rp";

export const rpCommand: Command = {
    name: "rp",
    aliases: ["随机图片"],
    description: "获取随机图片",
    execute: async (message) => {
        const picUrl = await getRandomPic();
        await message.reply({
            type: "image",
            file: picUrl,
        });
    },
}; 