import { axios } from '../api';

const getQRCodeUrl = async () => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/arago`);
}

export default {
    getQRCodeUrl
}
