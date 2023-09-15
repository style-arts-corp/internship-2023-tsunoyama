import React, { useState } from 'react';
import './App.css';
import CostView from './Confirmation';

import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import Overlay from './components/modules/Overlay';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import TextField from '@mui/material/TextField';




import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const appInfoBoxStyle: React.CSSProperties = {
  margin: "3em",
  padding: "1em",
  fontSize: "calc(10px + 2vmin)",
  backgroundColor: "lightgray",
  textAlign: "start",
};

const HorizontalContents: React.CSSProperties = {
  display: "flex", flexDirection: "row", justifyContent: "space-around"
}


function App() {

  const [currentWindow, setWindow] = useState(0);
  const handleViewChange = (newValue: number) => { setWindow(newValue); };
  const [costInfos, setInfos] = useState({
    inputTime: dayjs(),
    baseCost: 150,
    baseCostTime: 30,
    maxCost: 700,
    maxCostTime: 24,
    maxCostLoop: true,
    nightMode: true,
    nightStart: 16,
    nightEnd: 8,
    nightCost: 500,
    hasFreeTime: true,
    freeTime: 30,
    freeOverInvalid: true

  });

  return (
    <div>

      <div className="App" style={{ display: currentWindow === 0 ? '' : 'none' }}>
        <div>
          <Overlay />
        </div>
        <main>
          <div>
            <p className="App-bigtext">入庫時刻</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                value={costInfos.inputTime}
                onChange={(newValue) => setInfos({ ...costInfos, inputTime: newValue as Dayjs })}
                format="YYYY-MM-DD-HH:mm"
              />
            </LocalizationProvider>
          </div>
          <div style={{ margin: 20 }}>
            <Accordion sx={{ backgroundColor: "lightgray" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>駐車場料金設定の変更</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <FormGroup sx={{ margin: 1 }}>
                    <div style={HorizontalContents}>
                      <p>基本料金</p>

                      <TextField type="number" size="small" inputProps={{ inputMode: "numeric", min: 0 }} InputLabelProps={{ shrink: true }} variant="filled" sx={{ height: "1em", width: "4em" }} value={costInfos.baseCost} onChange={(event) => setInfos({ ...costInfos, baseCost: Math.max(0, Math.min(9999, parseInt(event.target.value))) })} /><p>円</p>
                      <p>/</p>
                      <TextField type="number" size="small" inputProps={{ inputMode: "numeric", min: 0 }} InputLabelProps={{ shrink: true }} variant="filled" sx={{ height: "1em", width: "3em" }} value={costInfos.baseCostTime} onChange={(event) => setInfos({ ...costInfos, baseCostTime: Math.max(0, Math.min(99, parseInt(event.target.value))) })} /><p>分</p>

                    </div>
                    <div style={HorizontalContents}>
                      <TextField type="number" size="small" inputProps={{ inputMode: "numeric", min: 0 }} InputLabelProps={{ shrink: true }} variant="filled" sx={{ height: "1em", width: "3em" }} value={costInfos.maxCostTime} onChange={(event) => setInfos({ ...costInfos, maxCostTime: Math.max(0, Math.min(99, parseInt(event.target.value))) })} /><p>時間毎最大料金</p>
                      <TextField type="number" size="small" inputProps={{ inputMode: "numeric", min: 0 }} InputLabelProps={{ shrink: true }} variant="filled" sx={{ height: "1em", width: "5em" }} value={costInfos.maxCost} onChange={(event) => setInfos({ ...costInfos, maxCost: Math.max(0, Math.min(costInfos.maxCostTime * costInfos.baseCost * (60 / costInfos.baseCostTime), parseInt(event.target.value))) })} /><p>円</p>

                    </div>
                    <FormControlLabel control={<Checkbox value={costInfos.maxCostLoop} onChange={(event) => setInfos({ ...costInfos, maxCostLoop: event.target.checked })} />} label="繰り返し" />
                    <FormControlLabel control={<Checkbox value={costInfos.nightMode} onChange={(event) => setInfos({ ...costInfos, nightMode: event.target.checked })} />} label="夜間で変化" />
                    <FormControl disabled={!costInfos.nightMode}>
                      <FormGroup row={true} sx={{ textAlign: "end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}><TimeField disabled={!costInfos.nightMode} value={dayjs().hour(costInfos.nightStart)} onChange={(newValue) => newValue ? setInfos({ ...costInfos, nightStart: newValue.hour() }) : 16} format="HH" variant="filled" size="small" sx={{ height: "1em", width: "3em" }} /></LocalizationProvider><p>時</p>
                        <p>～</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}><TimeField disabled={!costInfos.nightMode} value={dayjs().hour(costInfos.nightEnd)} onChange={(newValue) => newValue ? setInfos({ ...costInfos, nightEnd: newValue.hour() }) : 8} format="HH" variant="filled" size="small" sx={{ height: "1em", width: "3em" }} /></LocalizationProvider><p>時</p>
                        <TextField disabled={!costInfos.nightMode} type="number" size="small" InputLabelProps={{ shrink: true, }} variant="filled" sx={{ height: "1em", width: "5em" }} value={costInfos.nightCost} onChange={(event) => setInfos({ ...costInfos, nightCost: Math.max(0, Math.min(9999, parseInt(event.target.value))) })} /><p>円</p>

                      </FormGroup>
                    </FormControl>
                    <div style={HorizontalContents}>

                      <FormControlLabel control={<Checkbox value={costInfos.hasFreeTime} onChange={(event) => setInfos({ ...costInfos, hasFreeTime: event.target.checked })} />} label="無料期間" />
                      <TextField disabled={!costInfos.hasFreeTime} type="number" size="small" inputProps={{ inputMode: "numeric", min: 0 }} InputLabelProps={{ shrink: true }} variant="filled" sx={{ height: "1em", width: "3em" }} value={costInfos.freeTime} onChange={(event) => setInfos({ ...costInfos, freeTime: Math.max(0, Math.min(99, parseInt(event.target.value))) })} /><p>分</p>
                    </div>
                    <FormControlLabel control={<Checkbox disabled={!costInfos.hasFreeTime} value={costInfos.freeOverInvalid} onChange={(event) => setInfos({ ...costInfos, freeOverInvalid: event.target.checked })} />} label="超過した場合無効" />

                  </FormGroup>
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/*<Checkbox/><p className="App-smalltext">駐車場料金設定の変更</p>*/}
          </div>
          <div>
            <SetButton variant="contained" onClick={() => { setWindow(1) }} sx={{ backgroundColor: "lightgray" }}>確認</SetButton>
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
      <div className="CostView" style={{ display: currentWindow === 1 ? '' : 'none' }}>
        <CostView handleViewChange={handleViewChange} settings={costInfos} />
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
  fontSize: 23
})





