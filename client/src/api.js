import qrcode from './api/qrcode';

const axios_package = require('axios');

axios_package.interceptors.response.use(undefined, (err) => {
    switch (err.response.status) {
        case 401:
            if (!localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            break;
        default:
            break;
    }
    return Promise.reject(err)
});

axios_package.interceptors.request.use(req => {
    req.headers.authorization = localStorage.getItem('token');
    return req;
});

export default {
    qrcode
}

export const axios = axios_package;
