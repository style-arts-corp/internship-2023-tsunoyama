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
    const [nextCostTime,setNextCostTime] = React.useState<Dayjs | null>(null);


    function elapsedTime(mode:dayjs.QUnitType | dayjs.OpUnitType='ms')
    {
        const now = NowTime() as Dayjs;
        dayjs.extend(utc);
      return now ? dayjs(0).millisecond(now.diff(props.settings.inputtime,mode)) : dayjs(0);
    }


    function costCalculat(diff:Dayjs)
    {
     let time = diff.unix()/60;
     let nextTime = props.settings.inputtime;
     let result = 0;
     let maxflag = true;
     const maxCostTimeMin = 60*props.settings.maxCostTime;
     
     for(;time>0;time-=maxCostTimeMin)
     { 
        // let debug = 0;
        // let debug2 = 0;
        
        //24時間ごとの加算金額
        let tmpCostDay=0;
        let tmpCostNight=0;

        //24時間毎繰り返し
        for(let tmptime=0;tmptime<=Math.min(time,maxCostTimeMin);tmptime+=props.settings.baseCostTime)
        {
            
            let isAddCost = false;
            
            // console.log("nextTime"+nextTime.format("YYYY-MM-DD-HH:mm")+" End"+nextTime.hour(props.settings.nightEnd).format("YYYY-MM-DD-HH:mm")+" Start"+nextTime.hour(props.settings.nightStart).format("YYYY-MM-DD-HH:mm"));   
            dayjs.extend(isBetween);
            if(nextTime.isBetween(nextTime.hour(props.settings.nightEnd),nextTime.hour(props.settings.nightStart), 'm'))
            {
                if(maxflag&&(tmpCostDay<props.settings.maxCost))
                {
                    tmpCostDay = Math.min(tmpCostDay+props.settings.baseCost,props.settings.maxCost);
                    // isAddCost = true;
                    // debug++;
                }
            }
            else
            {
                if(maxflag&&(tmpCostNight<props.settings.nightCost))
                {
                    tmpCostNight = Math.min(tmpCostNight+props.settings.baseCost,props.settings.nightCost);
                    // isAddCost = true;
                    // debug2++;
                }  
            }
            // if(isAddCost){if(!nextCostTime) setNextCostTime(nextTime);}

            nextTime = nextTime.add(props.settings.baseCostTime, 'm');
            
        }
        result += tmpCostDay + tmpCostNight;
        // console.log("D"+tmpCostDay+"("+debug+")"+" N"+tmpCostNight+"("+debug2+")");
        
        // result+=Math.min(Math.floor(time%maxCostTimeSec / (60 * props.settings.baseCostTime) + 1)*props.settings.baseCost,maxflag? props.settings.maxCost:Infinity)
        // if(!props.settings.maxCostLoop)maxflag = false;
        
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