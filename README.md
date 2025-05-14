# QQ群机器人

一个基于qq-group-bot的 QQ 群机器人，提供多种实用功能。

## 功能特性

- 天气查询：支持查询全国主要城市的实时天气和未来预报
- 每日一句：获取每日一句精美句子
- 签到功能：群成员每日签到
- 人品测试：测试今日人品值
- 更多功能持续开发中...

## 安装

1. 克隆项目
```bash
git clone https://github.com/Fredrick-LX/hm-qq-bot/hm-qq-bot.git
cd hm-qq-bot
```

2. 安装依赖
```bash
pnpm install
```

3. 配置机器人
在 `src/config/bot.config.ts` 中配置你的机器人信息：
```typescript
export const botConfig = {
    appid: "你的机器人AppID",
    token: "你的机器人Token",
    // 其他配置...
};
```

## 开发

1. 启动开发服务器
```bash
pnpm dev
```

2. 构建项目
```bash
pnpm build
```

## 命令列表

- `/weather <城市>` 或 `/天气 <城市>` - 查询指定城市的天气信息
- `/daily` 或 `/每日一句` - 获取每日一句精美句子
- `/sign` 或 `/签到` - 进行每日签到
- `/rp` 或 `/随机图片` - 随机涩图
- `/help` 或 `/帮助` - 显示帮助信息
- `/zvv` 或 `/维维` - 随机zvv

## 技术栈

- TypeScript
- Node.js
- qq-group-bot
- Axios

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
