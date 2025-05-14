import { Bot } from "qq-group-bot";
import { botConfig } from "./config/bot.config";
import { commands } from "./commands";

const bot = new Bot(botConfig);

bot.start().then(() => {
    console.log("机器人启动成功！");
    
    bot.on("message", async (message) => {
        const content = message.toJSON().content.trim();
        const [command, ...args] = content.split(" ");
        
        if (!command.startsWith("/")) {
            return;
        }
        
        const cmdName = command.slice(1);
        const cmd = commands.find(c => 
            c.name === cmdName || c.aliases.includes(cmdName)
        );
        
        if (cmd) {
            try {
                await cmd.execute(message, args);
            } catch (error) {
                console.error(`执行命令 ${cmdName} 失败:`, error);
                await message.reply({
                    type: "text",
                    text: "命令执行失败，请稍后再试！",
                });
            }
        } else {
            await message.reply({
                type: "text",
                text: "叽里咕噜说什么呢",
            });
        }
    });
}).catch(error => {
    console.error("机器人启动失败:", error);
});
