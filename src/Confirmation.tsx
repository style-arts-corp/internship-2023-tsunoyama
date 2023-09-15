import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import { Settings } from './App';
import { APP_KEY } from './App';

const NowTime = () => {
    const [data, setData] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return data ? data : null;
}

type ConfirmationProps = {
    handleViewChange: (n: number) => void,
    settings: Settings
}

const Confirmation: React.FC<ConfirmationProps> = ({ handleViewChange, settings }) => {
    //  function Confirmation() {
    const handleViewChange1 = (num: number) => { handleViewChange(num) };
    let nextCostTime = dayjs();
    //Appから料金設定の受け取り、夜間設定なしの場合は夜間最大料金は通常の最大料金とする
    const { inputTime, baseCost, baseCostTime, maxCost, maxCostTime, maxCostLoop, nightStart, nightEnd, nightCost } = { ...settings, nightCost: settings.nightMode ? settings.nightCost : settings.maxCost };


    function elapsedTime(mode: dayjs.QUnitType | dayjs.OpUnitType = 'ms') {
        const now = NowTime() as Dayjs;
        dayjs.extend(utc);
        return now ? dayjs(0).millisecond(now.diff(inputTime, mode)) : dayjs(0);
    }

    function isDayMode(time: Dayjs) {
        return time.isBetween(time.hour(nightEnd).minute(59).subtract(1, 'h'), time.hour(nightStart).minute(0), 'm');
    }


    function nextAddTime(time: Dayjs, nowCost: number) {
        //if(nowCost<(isDayMode(time)?maxCost:nightCost)) return time;

        // 早期リターンで検索！
        // if (nowCost < maxCost)//700円以下
        // {

        //     if (nowCost >= nightCost && !isDayMode(time)) {
        //         //500円以上かつ次回判定時刻が夜間
        //         const timeMin = Math.min(nightEnd, nightStart);

        //         if (time.hour() <= timeMin) return time.hour(timeMin).minute(0);
        //         else return time.hour(timeMin).minute(0).add(1, 'd');

        //         return time.hour() <= timeMin ?
        //             time.hour(timeMin).minute(0) :
        //             time.hour(timeMin).minute(0).add(1, 'd');

        //     }//500円以下もしくは次回判定時刻が日中
        //     else return time;
        // }//700以上なので24時間切り替わり後
        // else return inputTime.day(time.day()).add(1, 'd');

        // 相曽
        //700以上なので24時間切り替わり後
        if (nowCost >= maxCost) return inputTime.day(time.day()).add(1, 'd');

        //500円以下もしくは次回判定時刻が日中
        if (nowCost < nightCost || isDayMode(time)) return time
        //700円以下
        //500円以上かつ次回判定時刻が夜間
        const timeMin = Math.min(nightEnd, nightStart);

        return time.hour() <= timeMin ?
            time.hour(timeMin).minute(0) :
            time.hour(timeMin).minute(0).add(1, 'd');

    }



    // if(isDayMode(time))
    // {
    //     if(dayCost<maxCost) return time;
    //     else return time.hour(nightStart).minute(0).add(offset, 'm');
    // }
    // else
    // {
    //     if(nightCost<nightCost) return time;
    //     else 
    //     {
    //         if(time.hour()<=nightEnd) return time.hour(nightEnd).minute(0).add(offset, 'm');
    //         else return time.hour(nightEnd).minute(0).add(1,'d').add(offset, 'm');
    //     }
    // }



    function costCalculate(diff: Dayjs) {
        let time = diff.unix() / 60;
        let nextTime = inputTime;
        let result = 0;
        let maxFlag = true;
        const maxCostTimeMin = 60 * maxCostTime;

        //24時間毎繰り返し(最大料金処理)
        for (; time > 0;) {
            let debug = 0;
            // let debug2 = 0;

            //24時間ごとの加算金額
            let tmpCost = 0;

            //30分毎繰り返し(基本料金加算)
            for (let tmpTime = 0; tmpTime <= Math.min(time, maxCostTimeMin); tmpTime += baseCostTime) {
                dayjs.extend(isBetween);
                if (maxFlag && (tmpCost < (isDayMode(nextTime) ? maxCost : nightCost))) {
                    tmpCost = Math.min(tmpCost + baseCost, ((isDayMode(nextTime) || result > nightCost) ? maxCost : nightCost));
                }
                debug++;
                // console.log("[" + debug + "," + nextTime.format("HH:mm") + isDayMode(nextTime) + "]" + tmpCost);
                nextTime = nextTime.add(baseCostTime, 'm');

            }
            result += tmpCost;


            // result+=Math.min(Math.floor(time%maxCostTimeSec / (60 * baseCostTime) + 1)*baseCost,maxFlag? maxCost:Infinity)
            if (!maxCostLoop) maxFlag = false;
            time -= maxCostTimeMin;
            if (time <= 0) {
                // console.log(nextTime.format());
                // console.log(nextAddTime(nextTime, tmpCost).format());
                nextCostTime = nextAddTime(nextTime, tmpCost);
                // console.log("nextCostTime", nextCostTime)
            }




        }

        return result;
    }

    return (

        <div style={{ marginTop: "5em" }}>
            <ReturnButtonStyle variant="contained" onClick={() => { handleViewChange1(0); localStorage.setItem(APP_KEY, '') }} sx={{ position: "absolute", backgroundColor: "lightgray" }}>戻る</ReturnButtonStyle>
            <div style={{ position: "relative", left: "60%" }}>
                <p>入庫時刻 <span>{inputTime.format("HH:mm")}</span></p>
                <p>経過時間 <span>{elapsedTime().utc().format("HH:mm")}</span></p>
            </div>
            <div>
                <p style={Title}>利用金額</p>
                <p style={CostText}><span>{costCalculate(elapsedTime())}</span><span>円</span></p>
            </div>
            <div>
                <p style={subTitle}>次の追加料金の発生は</p>
                <p style={Title}><span>{nextCostTime.format("DD日 HH:mm")}</span></p>
            </div>
        </div>
    );
}

export default Confirmation

const Title: React.CSSProperties = {
    margin: 0,
    fontSize: 40,
    color: "black",
    textAlign: "center"
}
const subTitle: React.CSSProperties = {
    fontSize: 30,
    color: "black",
    textAlign: "center"
}

const CostText: React.CSSProperties = {
    fontSize: 45,
    color: "black",
    textAlign: "center"
}



const ReturnButtonStyle = styled(Button)({
    backgroundColor: "lightgray",
    borderRadius: 10,
    color: "black",
    width: 100,
    height: 60,
    fontSize: 23
})