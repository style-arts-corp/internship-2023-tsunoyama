import React, { useState,useEffect} from "react";
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

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


    function elapsedTime(mode:dayjs.QUnitType | dayjs.OpUnitType='ms')
    {
        const now = NowTime() as Dayjs;
        dayjs.extend(utc);
      return now ? dayjs(0).millisecond(now.diff(props.settings.inputtime,mode)) : dayjs(0);
    }


    function costCalculat(diff:Dayjs)
    {
     let result = diff.unix();
      result = Math.floor(result / (60 * props.settings.baseCostTime) + 1)*props.settings.baseCost;
        
     return result;
    }
  
    return(

    <div style={{marginTop:"5em"}}>
     <ReturnButtonStyle variant="contained" onClick={() => {handleiViewChange1(0)}}sx={{position:"absolute",backgroundColor: "lightgray"}}>戻る</ReturnButtonStyle>
    <div style={{position:"relative",left:"60%"}}>
        <p>入庫時刻 <span>{props.settings.inputtime.format("HH:mm")}</span></p>
        <p>{costCalculat(elapsedTime())}</p>
        <p>経過時間 <span>{elapsedTime().utc().format("HH:mm")}</span></p>
    </div>
     <div>  
       <p style={Title}>利用金額</p>
       <p style={CostText}><span>{costCalculat(elapsedTime())}</span><span>円</span></p>
     </div>
     <div>
        <p style={subTitle}>次の追加料金の発生は</p>
        <p style={Title}>12:34</p>
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