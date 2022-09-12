import * as React from 'react';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import API from '../api';
import Success from "../components/Success";
import FullLayout from "../layout/FullLayout";
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { LinkButton } from "../components/Styles/LinkButton";
import { Wrapper } from "./styles";

function Home() {
    const [qrUrl, setQRUrl] = useState('')
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [showQrCode, setShowQrCode] = useState(false);

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
                setInterval(function () {
                    socket.emit('check-status', sessionId)
                }, 2000);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const activate = () => {
        if (qrUrl) {
            setShowQrCode(true);
        }
    };

    return (
        <FullLayout>
            <Wrapper>
                {isLoggedIn ? <Success/> :
                    showQrCode ?
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
                        </Box> : <LinkButton className="d-none d-lg-block" onClick={activate}>
                            Activate
                        </LinkButton>}
            </Wrapper>
        </FullLayout>
    );
}

export default Home;
