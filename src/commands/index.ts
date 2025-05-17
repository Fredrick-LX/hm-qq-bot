import { Command } from "../types";
import { helpCommand } from "./help";
import { zvvCommand } from "./zvv";
import { signInCommand } from "./signIn";
import { rpCommand } from "./rp";
import { weatherCommand } from "./weather";
import { dailyCommand } from "./daily";
import { historyCommand } from "./history";
import { chatCommand } from "./chat";

export const commands: Command[] = [
    helpCommand,
    zvvCommand,
    signInCommand,
    rpCommand,
    weatherCommand,
    dailyCommand,
    historyCommand,
    chatCommand,
]; 