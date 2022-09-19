import * as React from 'react';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import API from '../api';
import Success from "../components/Success";
import FullLayout from "../layout/FullLayout";
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { Wrapper } from "./styles";
import { LinkButton } from "../components/Styles/LinkButton";

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
                setShowQrCode(true);
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

    return (
        <FullLayout>
            <Wrapper>
                <div className={"arago-card"}>
                    <img src="/assets/img/arago-banner.svg" alt="" />
                </div>

                {/* Only for mobile screen */}
                <div className={"d-lg-none"}>
                    <LinkButton>
                        <a className="text-decoration-none text-dark" href={`https://app.altme.io/app/download?uri=${qrUrl}`}>
                            Ajouter au Wallet Arago
                        </a>
                    </LinkButton>

                    <img className="arago-card" src="/assets/img/arago-wallet-mobile.png" alt="" />
                </div>

                <div className={"arago-content d-none d-lg-flex"}>
                    {isLoggedIn ? <Success/> :
                        showQrCode &&
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            <h6 style={{marginBottom: '1rem'}}>
                                Scannez pour ajouter cette carte à votre Wallet Argo
                            </h6>
                            <div style={{padding: '1rem', backgroundColor: "white", borderRadius: "1rem"}}>
                                <QRCode
                                    title="Download the App"
                                    value={qrUrl}
                                />
                            </div>
                        </Box>}

                    <img className="arago-card" src="/assets/img/arago-wallet.png" alt="" />
                </div>
            </Wrapper>
        </FullLayout>
    );
}

export default Home;
