import { Level } from "level";

interface SignInRecord {
    timestamp: number;
    totalCount: number;
    continuousCount: number;
    lastSignInDate: string;
}

const db = new Level("./data/signIn", { valueEncoding: "json" });

export const signIn = async (userId: string): Promise<string> => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const key = `${userId}:${today}`;
        const userKey = `user:${userId}`;
        
        // 检查今日是否已签到
        const todayRecord = await db.get(key).catch(() => null);
        if (todayRecord) {
            return "你今天已经签到过了！";
        }

        // 获取用户签到记录
        let userRecord: SignInRecord;
        try {
            const record = await db.get(userKey);
            userRecord = JSON.parse(record as string);
        } catch {
            userRecord = {
                timestamp: 0,
                totalCount: 0,
                continuousCount: 0,
                lastSignInDate: "",
            };
        }

        // 计算连续签到
        const lastDate = new Date(userRecord.lastSignInDate);
        const todayDate = new Date();
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            userRecord.continuousCount++;
        } else if (diffDays > 1) {
            userRecord.continuousCount = 1;
        }

        // 更新签到记录
        userRecord.totalCount++;
        userRecord.lastSignInDate = todayDate.toISOString().split("T")[0];
        userRecord.timestamp = Date.now();

        // 保存记录
        await db.put(key, JSON.stringify({ timestamp: Date.now() }));
        await db.put(userKey, JSON.stringify(userRecord));

        // 生成回复消息
        const message = [
            "签到成功！",
            `总签到次数：${userRecord.totalCount}次`,
            `连续签到：${userRecord.continuousCount}天`,
        ].join("\n");

        return message;
    } catch (error) {
        console.error("签到失败:", error);
        return "签到失败，请稍后再试！";
    }
};

// 添加导出声明
export default signIn; 