import React, { useState,useEffect} from "react";
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
  
    return data? data: null;
  }

 
export default function Confirmation(props:any){
    const handleiViewChange1 = (num:number) => {props.handleViewChange(num)};
    let nextCostTime = dayjs();


    function elapsedTime(mode:dayjs.QUnitType | dayjs.OpUnitType='ms')
    {
        const now = NowTime() as Dayjs;
        dayjs.extend(utc);
      return now ? dayjs(0).millisecond(now.diff(props.settings.inputtime,mode)) : dayjs(0);
    }

    function isDayMode(time:Dayjs)
    {
        return time.isBetween(time.hour(props.settings.nightEnd).minute(0),time.hour(props.settings.nightStart).minute(0), 'm');
    }

    function nextAddTime(time:Dayjs,nowCost:number)
    {
        const offset = props.settings.inputtime.minute()%props.settings.baseCostTime;
        //if(nowCost<(isDayMode(time)?props.settings.maxCost:props.settings.nightCost)) return time;

        if(nowCost<props.settings.maxCost)
        {
            // if(nowCost<)
            // else return props.settings.inputtime.day(time).add(1,'d');
        }
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


    function costCalculat(diff:Dayjs)
    {
     let time = diff.unix()/60;
     let nextTime = props.settings.inputtime;
     let result = 0;
     let maxflag = true;
     const maxCostTimeMin = 60*props.settings.maxCostTime;
     
     //24時間毎繰り返し(最大料金処理)
     for(;time>0;)
     { 
        let debug = 0;
        // let debug2 = 0;
        
        //24時間ごとの加算金額
        let tmpCost=0;

        //30分毎繰り返し(基本料金加算)
        for(let tmptime=0;tmptime<=Math.min(time,maxCostTimeMin);tmptime+=props.settings.baseCostTime)
        {
            dayjs.extend(isBetween);
            if(maxflag&&(tmpCost < (isDayMode(nextTime)?props.settings.maxCost:props.settings.nightCost)))
            {
                tmpCost = Math.min(tmpCost+props.settings.baseCost,((isDayMode(nextTime)||result>props.settings.nightCost)?props.settings.maxCost:props.settings.nightCost));
            }
            debug++;
            console.log("["+debug+","+nextTime.format("HH:mm")+isDayMode(nextTime)+"]"+tmpCost);
            nextTime = nextTime.add(props.settings.baseCostTime, 'm');
            
        }
        result += tmpCost;
        
        
        // result+=Math.min(Math.floor(time%maxCostTimeSec / (60 * props.settings.baseCostTime) + 1)*props.settings.baseCost,maxflag? props.settings.maxCost:Infinity)
        if(!props.settings.maxCostLoop)maxflag = false;
        time-=maxCostTimeMin;
        // if(time<=0) nextCostTime =nextAddTime(nextTime,tmpCost);

        
        
     }
     
     return result;
    }
  
    return(

    <div style={{marginTop:"5em"}}>
     <ReturnButtonStyle variant="contained" onClick={() => {handleiViewChange1(0)}}sx={{position:"absolute",backgroundColor: "lightgray"}}>戻る</ReturnButtonStyle>
    <div style={{position:"relative",left:"60%"}}>
        <p>入庫時刻 <span>{props.settings.inputtime.format("HH:mm")}</span></p>
        <p>経過時間 <span>{elapsedTime().utc().format("HH:mm")}</span></p>
    </div>
     <div>  
       <p style={Title}>利用金額</p>
       <p style={CostText}><span>{costCalculat(elapsedTime())}</span><span>円</span></p>
     </div>
     <div>
        <p style={subTitle}>次の追加料金の発生は</p>
        <p style={Title}><span>{nextCostTime?.format("HH:mm")}</span></p>
     </div>
    </div>
    );}


const Title: React.CSSProperties ={
    margin:0,
    fontSize:40,
    color: "black",
    textAlign:"center"
}
const subTitle: React.CSSProperties ={
    fontSize:30,
    color: "black",
    textAlign:"center"
}

const CostText: React.CSSProperties ={
    fontSize:45,
    color: "black",
    textAlign:"center"
}



const ReturnButtonStyle = styled(Button)({
    backgroundColor:"lightgray",
    borderRadius: 10,
    color: "black",
    width: 100,
    height: 60,
    fontSize:23
  })