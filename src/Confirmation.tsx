import React, { useState, useEffect } from "react";
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';

const NowTime = () => {
    const [data, setData] = React.useState<Dayjs | null>(dayjs());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(dayjs());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return data ? data : null;
}


export default function Confirmation(props: any) {
    const handleViewChange1 = (num: number) => { props.handleViewChange(num) };
    let nextCostTime = dayjs();


    function elapsedTime(mode: dayjs.QUnitType | dayjs.OpUnitType = 'ms') {
        const now = NowTime() as Dayjs;
        dayjs.extend(utc);
        return now ? dayjs(0).millisecond(now.diff(props.settings.inputTime, mode)) : dayjs(0);
    }

    function isDayMode(time: Dayjs) {
        return time.isBetween(time.hour(props.settings.nightEnd).minute(0), time.hour(props.settings.nightStart).minute(0), 'm');
    }

    function nextAddTime(time: Dayjs, nowCost: number) {
        const offset = props.settings.inputTime.minute() % props.settings.baseCostTime;
        //if(nowCost<(isDayMode(time)?props.settings.maxCost:props.settings.nightCost)) return time;

        if (nowCost < props.settings.maxCost)//700円以下
        {

            if (nowCost >= props.settings.nightCost && !isDayMode(time)) {
                //500円以上かつ次回判定時刻が夜間
                const timeMin = Math.min(props.settings.nightEnd, props.settings.nightStart);

                if (time.hour() <= timeMin) return time.hour(timeMin).minute(0).add(offset, 'm');
                else return time.hour(timeMin).minute(0).add(1, 'd').add(offset, 'm');
            }//500円以下もしくは次回判定時刻が日中
            else return time;
        }//700以上なので24時間切り替わり後
        else return props.settings.inputTime.day(time).add(1, 'd');
        // if(isDayMode(time))
        // {
        //     if(dayCost<props.settings.maxCost) return time;
        //     else return time.hour(props.settings.nightStart).minute(0).add(offset, 'm');
        // }
        // else
        // {
        //     if(nightCost<props.settings.nightCost) return time;
        //     else 
        //     {
        //         if(time.hour()<=props.settings.nightEnd) return time.hour(props.settings.nightEnd).minute(0).add(offset, 'm');
        //         else return time.hour(props.settings.nightEnd).minute(0).add(1,'d').add(offset, 'm');
        //     }
        // }
    }


    function costCalculate(diff: Dayjs) {
        let time = diff.unix() / 60;
        let nextTime = props.settings.inputTime;
        let result = 0;
        let maxFlag = true;
        const maxCostTimeMin = 60 * props.settings.maxCostTime;

        //24時間毎繰り返し(最大料金処理)
        for (; time > 0;) {
            let debug = 0;
            // let debug2 = 0;

            //24時間ごとの加算金額
            let tmpCost = 0;

            //30分毎繰り返し(基本料金加算)
            for (let tmpTime = 0; tmpTime <= Math.min(time, maxCostTimeMin); tmpTime += props.settings.baseCostTime) {
                dayjs.extend(isBetween);
                if (maxFlag && (tmpCost < (isDayMode(nextTime) ? props.settings.maxCost : props.settings.nightCost))) {
                    tmpCost = Math.min(tmpCost + props.settings.baseCost, ((isDayMode(nextTime) || result > props.settings.nightCost) ? props.settings.maxCost : props.settings.nightCost));
                }
                debug++;
                console.log("[" + debug + "," + nextTime.format("HH:mm") + isDayMode(nextTime) + "]" + tmpCost);
                nextTime = nextTime.add(props.settings.baseCostTime, 'm');

            }
            result += tmpCost;


            // result+=Math.min(Math.floor(time%maxCostTimeSec / (60 * props.settings.baseCostTime) + 1)*props.settings.baseCost,maxFlag? props.settings.maxCost:Infinity)
            if (!props.settings.maxCostLoop) maxFlag = false;
            time -= maxCostTimeMin;
            if (time <= 0) nextCostTime = nextAddTime(nextTime, tmpCost);



        }

        return result;
    }

    return (

        <div style={{ marginTop: "5em" }}>
            <ReturnButtonStyle variant="contained" onClick={() => { handleViewChange1(0) }} sx={{ position: "absolute", backgroundColor: "lightgray" }}>戻る</ReturnButtonStyle>
            <div style={{ position: "relative", left: "60%" }}>
                <p>入庫時刻 <span>{props.settings.inputTime.format("HH:mm")}</span></p>
                <p>経過時間 <span>{elapsedTime().utc().format("HH:mm")}</span></p>
            </div>
            <div>
                <p style={Title}>利用金額</p>
                <p style={CostText}><span>{costCalculate(elapsedTime())}</span><span>円</span></p>
            </div>
            <div>
                <p style={subTitle}>次の追加料金の発生は</p>
                <p style={Title}><span>{nextCostTime?.format("HH:mm")}</span></p>
            </div>
        </div>
    );
}


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