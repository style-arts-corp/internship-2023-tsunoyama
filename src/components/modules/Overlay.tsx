import React from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function Overlay()
{
    return(
        <StyledOverlayBG style={{display:"none"}}>
            <StyledOverlayWin>
                <div style={{width: "100%",height: "100%",display:"flex",flexDirection: "column",justifyContent:"space-around"}}>
                    <p style={{textAlign:"center",fontSize:"1.1em"}}>この時間でよろしいですか?</p>
                    <div style={{display:"flex",flexDirection: "row", justifyContent:"space-around"}}>
                        <Button variant="contained" sx={{backgroundColor: "red",":hover" :"#990000"}}>戻る</Button>
                        <Button variant="contained" sx={{backgroundColor: "green",":hover" :"#003300"}}>進む</Button>
                    </div>
                </div>
            </StyledOverlayWin>
        </StyledOverlayBG>
    );
}
const StyledOverlayBG = styled(Box)({
    zIndex: 1,
    backgroundColor : "#00000030",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%"
  })


const StyledOverlayWin = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor : "white",
    alignItems: "center",
    width: "14em",
    height: "14em"
})

