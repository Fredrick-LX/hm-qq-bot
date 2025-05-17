import axios from "axios";

interface HistoryResponse {
    code: number;
    msg: string;
    data: string[];
    request_id: string;
}

// 敏感词列表
const sensitiveWords = [
    // 政治人物
    "江泽民", "胡锦涛", "温家宝", "李鹏", "朱镕基", "李瑞环", "李岚清", "吴邦国", "贾庆林", "李长春",
    "习近平", "李克强", "张德江", "俞正声", "刘云山", "王岐山", "张高丽", "邓小平", "陈云", "华国锋",
    "叶剑英", "李先念", "汪东兴", "彭真", "万里", "乔石", "宋平", "李铁映", "丁关根", "田纪云",
    "罗干", "吴官正", "贺国强", "周永康", "薄熙来", "令计划", "孙政才", "苏荣", "周本顺", "杨晶",
    "项俊波", "王三运", "王珉", "黄兴国", "王保安", "陈树隆", "杨东明", "李云峰", "张越", "王阳",
    "李成云", "杨振超", "周春雨", "陈雪枫", "卢恩光", "张文雄", "张化为", "曲淑辉", "刘善桥", "张喜武",
    "王宏江",
    // 敏感事件
    "六四", "八九", "天安门", "六四事件", "八九事件", "天安门事件", "六四运动", "八九运动", "天安门运动",
    "六四学潮", "八九学潮", "天安门学潮", "六四风波", "八九风波", "天安门风波", "六四惨案", "八九惨案",
    "天安门惨案", "六四屠杀", "八九屠杀", "天安门屠杀", "六四镇压", "八九镇压", "天安门镇压",
    // 敏感组织
    "法轮功", "法轮大法", "法轮", "大法", "法轮功组织", "法轮大法组织", "法轮组织", "大法组织",
    "法轮功邪教", "法轮大法邪教", "法轮邪教", "大法邪教",
    // 敏感词汇
    "共产党", "中共", "中国共产党", "中国共", "中国共产", "中国共党"
];

// 处理敏感词
function processSensitiveWords(text: string): string {
    let processedText = text;
    for (const word of sensitiveWords) {
        if (processedText.includes(word)) {
            const maskedWord = word.charAt(0) + "*".repeat(word.length - 1);
            processedText = processedText.replace(word, maskedWord);
        }
    }
    return processedText;
}

export async function getTodayHistory(): Promise<string[]> {
    try {
        const response = await axios.get<HistoryResponse>("https://v2.xxapi.cn/api/history");
        if (response.data.code === 200 && response.data.data) {
            // 处理每条历史记录中的敏感词
            return response.data.data.map(processSensitiveWords);
        }
        return ["被和谐力(╯°□°)╯︵ ┻━┻"];
    } catch (error) {
        console.error("获取历史上的今天失败:", error);
        return ["API挂力(╯°□°)╯︵ ┻━┻"];
    }
} 