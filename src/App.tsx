import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import Overlay from './components/modules/Overlay';
import Box from '@mui/material/Box';


import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import  Dropdown  from '@mui/base/Dropdown';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { colors } from '@mui/material';
import TextField from '@mui/material/TextField';


import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';




const appInfoBoxStyle: React.CSSProperties  = {
  margin: "3em",
  padding:"1em",
  fontSize: "calc(10px + 2vmin)",
  backgroundColor: "lightgray",
  textAlign: "start",
};

const HolizontalContents: React.CSSProperties  ={
  display:"flex",flexDirection: "row", justifyContent:"space-around"
}

function App() {
  const [inputtime, setInputtime] = React.useState<Dayjs | null>(dayjs());
  const [maxcosttime, setMaxcosttime] = React.useState<Dayjs | null>(dayjs().hour(24));

  const [nightmode,setNmode] = React.useState(false);
  const [nmodeloop,setNmodeloop] = React.useState(false);
  const [nightstart, setNightstart] = React.useState<Dayjs | null>(dayjs().hour(16));
  const [nightend, setNightend] = React.useState<Dayjs | null>(dayjs().hour(8));
  const [hasfreetime,setHasfreetime] = React.useState(true);
  const [freetimeover,setFreetimeover] = React.useState(true);


  return (
    <div>
      <div>
        <Overlay/>
      </div>
      <div className="App">
        <main>
          <div>
            <p className="App-bigtext">入庫時刻</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimeField
                value={inputtime}
                onChange={(newValue) => setInputtime(newValue)}
                format="HH:mm"
              />
            </LocalizationProvider>
          </div>
          <div style={{margin:20}}>
          <Accordion sx={{backgroundColor: "lightgray"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>駐車場料金設定の変更</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <FormGroup sx={{margin:1}}>
                  <div style={HolizontalContents}>
                    <p>基本料金</p>
                    
                      <TextField id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"4em"}} /><p>円</p>
                      <p>/</p>
                      <TextField id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"3em"}} /><p>分</p>
                      
                  </div>
                  <div style={HolizontalContents}>
                    <TextField id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"3em"}} /><p>時間毎最大料金</p>
                    <TextField id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"5em"}} /><p>円</p>
                    
                  </div>
                  <FormControlLabel control={<Checkbox/>} label="繰り返し" />
                  <FormControlLabel control={<Checkbox onChange={(event) => setNmode(event.target.checked)}/>} label="夜間で変化"/>
                  <FormControl disabled={!nightmode}>
                    <FormGroup row={true} sx={{textAlign: "end"}}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}><TimeField disabled={!nightmode} value={nightstart} onChange={(newValue) => setNightstart(newValue)} format="HH" variant="filled" size="small" sx={{height:"1em",width:"3em"}} /></LocalizationProvider><p>時</p>
                      <p>～</p>
                      <LocalizationProvider dateAdapter={AdapterDayjs}><TimeField disabled={!nightmode} value={nightend} onChange={(newValue) => setNightend(newValue)} format="HH" variant="filled" size="small" sx={{height:"1em",width:"3em"}} /></LocalizationProvider><p>時</p>
                      <TextField disabled={!nightmode} id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"5em"}} /><p>円</p>

                    </FormGroup>
                  </FormControl>
                  <div style={HolizontalContents}>
                    
                    <FormControlLabel control={<Checkbox onChange={(event) => setHasfreetime(event.target.checked)}/>} label="無料期間"/>
                    <TextField disabled={!hasfreetime} id="filled-number" type="number" size="small" InputLabelProps={{shrink:true,}}variant="filled" sx={{height:"1em",width:"3em"}} /><p>分</p>
                  </div>
                  <FormControlLabel control={<Checkbox disabled={!hasfreetime} onChange={(event) => setFreetimeover(event.target.checked)}/>} label="超過した場合無効"/>
                  
                </FormGroup>
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/*<Checkbox/><p className="App-smalltext">駐車場料金設定の変更</p>*/}
          </div>
          <div>
            <SetButton variant="contained" onClick={() => {  }}sx={{backgroundColor: "lightgray"}}>確認</SetButton>
          </div>
          <div style={appInfoBoxStyle}>
            <p>このサイトの使用方法</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default App;

const SetButton = styled(Button)({
  borderRadius: 10,
  color: "black",
  width: 250,
  height: 60,
  fontSize:23
})





