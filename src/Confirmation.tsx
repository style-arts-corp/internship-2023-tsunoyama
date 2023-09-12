import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Confirmation(){
    return(

    <div>
     <div style={{marginTop:"5em"}}>
       <ReturnButtonStyle variant="contained" onClick={() => {  }}sx={{backgroundColor: "lightgray"}}>戻る</ReturnButtonStyle>
       <p style={Title}>利用金額</p>
       <p style={CostText}>1234<span>円</span></p>
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