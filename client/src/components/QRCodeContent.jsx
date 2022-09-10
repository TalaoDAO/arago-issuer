import React from 'react';
import AppQrCode from '../components/AppQrCode';

function QRCodeContent({voucher, getQRUrl, qrUrl, isButtonWithoutVoucher = false,  isLoggedIn = false, isCenter=true, isCopy = true}) {
    return (
        <>
            <section className="page-content">
                <div className="container">
                    <div className={`flux-box ${isCenter && 'position-center'}`}>
                        <div className="header">
                            <div className="row g-0">
                                <div className="col-12 text-center">
                                    {/*<img src="assets/img/logo-tezotopia-desktop.png" alt="flux"/>*/}
                                </div>
                            </div>
                        </div>

                        {(voucher || isButtonWithoutVoucher) && <div className="button-area text-center">
                            <button
                                className="active-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#qrModal"
                                onClick={getQRUrl}
                            >
                                {isLoggedIn ? 'QR code generation' : 'Connect to the verifier generator'}
                            </button>
                        </div>}
                    </div>
                </div>
            </section>

            <AppQrCode url={qrUrl} isLoggedIn={isLoggedIn} isCopy={isCopy}/>

            <div
                className="modal fade theme-modal"
                id="successModal"
                tabIndex="-1"
                aria-labelledby="successModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h2>
                                Your voucher has been
                                <br/> successfully activated
                            </h2>
                            <img src="assets/img/ic-success.svg" width="186" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QRCodeContent;
