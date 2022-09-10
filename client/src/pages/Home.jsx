import * as React from 'react';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import API from '../api';
import Success from "../components/Success";
import FullLayout from "../layout/FullLayout";
import { Wrapper } from "./styles";
import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import ProcessSteps from "../parts/ProcessSteps";

function Home() {
    const [qrUrl, setQRUrl] = useState('')
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [voucher, setVoucher] = useState(null)

    useEffect(() => {
        socket.on('authorised', function (isAuthorized) {
            setLoggedIn(isAuthorized)
        })
    }, []);

    useEffect(() => {
        (async function getUrlNow() {
            await getQRUrl();
        })();
    }, []);

    const getQRUrl = async () => {
        try {
            const res = await API.qrcode.getQRCodeUrl();

            if (res.data.success) {
                setQRUrl(res.data.data.url);
                const sessionId = res.data.data.session_id
                localStorage.setItem('token', sessionId)
                localStorage.setItem('issuer', res.data.data.issuer)
                setVoucher(res.data.data.voucher)
                setInterval(function () {
                    socket.emit('check-status', sessionId)
                }, 2000);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <FullLayout>
            <Wrapper>

                <div className="title-container">
                    <img className="unit-img" src="/assets/img/unit-left-tablet.png" alt=""/>

                    <Box
                        sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', mx: 'auto'}}
                    >
                        {voucher && <Typography
                            className="title"
                            sx={{color: '#fbd400'}}

                        >
                            {voucher.credentialSubject.offers ? voucher.credentialSubject.offers.benefit.discount : 0} discount
                        </Typography>}

                        <Typography
                            className="title"
                            sx={{color: '#fff'}}
                        >
                            on NFTs*
                        </Typography>
                    </Box>

                    <img className="unit-img" src="/assets/img/unit-right-tablet.png" alt=""/>
                </div>

                <div className="download-section">
                    <img className="download-img" src="/assets/img/google-play.png" alt=""/>
                    <img className="download-img" src="/assets/img/app-store.png" alt=""/>
                </div>

                <Box sx={{mb: 10}}>
                    <ProcessSteps/>
                </Box>

                {isLoggedIn ? <Success/> :
                    qrUrl &&
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <h6 style={{color: "white", marginBottom: '1rem'}}>
                            Scan the QR code
                        </h6>
                        <div style={{padding: '1rem', backgroundColor: "white", borderRadius: "1rem"}}>
                            <QRCode
                                title="Download the App"
                                value={qrUrl}
                            />
                        </div>
                    </Box>}
            </Wrapper>
        </FullLayout>
    );
}

export default Home;
