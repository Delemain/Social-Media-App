import axios from 'axios';

const API_URL = 'http://localhost:8080/api/gcmessages';

export const fetchMessages = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createMessage = async (message) => {
    const response = await axios.post(API_URL, message);
    return response.data;
};

export const deleteAllMessages = async () => {
    await axios.delete(API_URL);
};