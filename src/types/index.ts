import { GroupMessageEvent, GuildMessageEvent, Intent, PrivateMessageEvent } from "qq-group-bot";

export interface Command {
    name: string;
    aliases: string[];
    description: string;
    execute: (message: GroupMessageEvent | PrivateMessageEvent | GuildMessageEvent, args: string[]) => Promise<void>;
}

export interface CommandResult {
    type: "text" | "image";
    text?: string;
    file?: string;
}

export interface BotConfig {
    appid: string;
    secret: string;
    sandbox: boolean;
    logLevel: "info" | "debug" | "warn" | "error";
    maxRetry: number;
    intents: Intent[];
} 