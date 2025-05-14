import { Command } from "../types";
import axios from "axios";
import cityIds from "../config/city_ids.json";

interface CityInfo {
    areaid: number;
    countyname: string;
}

interface WeatherIndex {
    name: string;
    level: string;
    content: string;
}

interface PM25 {
    aqi: string;
    quality: string;
    pm25: string;
    pm10: string;
}

interface Realtime {
    temp: string;
    weather: string;
    wD: string;
    wS: string;
    sD: string;
    time: string;
}

interface Weather {
    date: string;
    weather: string;
    temp_day_c: string;
    temp_night_c: string;
    week: string;
}

interface WeatherResponse {
    code: string;
    value: [{
        city: string;
        indexes: WeatherIndex[];
        pm25: PM25;
        realtime: Realtime;
        weathers: Weather[];
    }];
}

export const weatherCommand: Command = {
    name: "weather",
    aliases: ["天气"],
    description: "查询指定城市的天气信息",
    async execute(message, args) {
        if (args.length === 0) {
            await message.reply({
                type: "text",
                text: "请指定要查询的城市，例如：/weather 北京",
            });
            return;
        }

        const city = args[0];
        const cityInfo = (cityIds as CityInfo[]).find(c => c.countyname === city);

        if (!cityInfo) {
            const availableCities = (cityIds as CityInfo[]).map(c => c.countyname).join("、");
            await message.reply({
                type: "text",
                text: "暂不支持该城市的天气查询，目前支持的城市有：\n" + availableCities,
            });
            return;
        }

        try {
            const response = await axios.get<WeatherResponse>(`http://aider.meizu.com/app/weather/listWeather?cityIds=${cityInfo.areaid}`);
            const weatherData = response.data;

            if (weatherData.code !== "200" || !weatherData.value || weatherData.value[0] === undefined) {
                throw new Error("API返回数据为空");
            }

            const data = weatherData.value[0];
            const realtime = data.realtime;
            const pm25 = data.pm25;
            const today = data.weathers[0];
            const tomorrow = data.weathers[1];

            // 获取生活指数
            const indexes = data.indexes.reduce((acc, index) => {
                if (index.content) {
                    acc.push(`${index.name}：${index.level}\n${index.content}`);
                }
                return acc;
            }, [] as string[]);

            await message.reply({
                type: "text",
                text: `${data.city}天气情况：\n\n` +
                    `实时天气：\n` +
                    `温度：${realtime.temp}°C\n` +
                    `天气：${realtime.weather}\n` +
                    `风向：${realtime.wD}\n` +
                    `风力：${realtime.wS}\n` +
                    `湿度：${realtime.sD}%\n` +
                    `更新时间：${realtime.time}\n\n` +
                    `空气质量：\n` +
                    `AQI：${pm25.aqi}\n` +
                    `质量：${pm25.quality}\n` +
                    `PM2.5：${pm25.pm25}\n` +
                    `PM10：${pm25.pm10}\n\n` +
                    `今日预报：\n` +
                    `日期：${today.date} ${today.week}\n` +
                    `天气：${today.weather}\n` +
                    `温度：${today.temp_day_c}°C ~ ${today.temp_night_c}°C\n\n` +
                    `明日预报：\n` +
                    `日期：${tomorrow.date} ${tomorrow.week}\n` +
                    `天气：${tomorrow.weather}\n` +
                    `温度：${tomorrow.temp_day_c}°C ~ ${tomorrow.temp_night_c}°C\n\n` +
                    `生活指数：\n${indexes.join("\n\n")}`,
            });
        } catch (error) {
            console.error("获取天气信息失败:", error);
            await message.reply({
                type: "text",
                text: "获取天气信息失败，请稍后再试！",
            });
        }
    },
}; 