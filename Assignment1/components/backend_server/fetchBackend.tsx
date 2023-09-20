import Axios from 'axios';

const API_BASE_URL = 'http://192.168.20.78:3000'; // Replace with your server's URL

const fetchShifts = async () => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/shifts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw error;
    }
};

const fetchShiftById = async ({id}: { id: any }) => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/shifts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching shift with id ${id}:`, error);
        throw error;
    }
};

const bookShift = async (id: any) => {
    try {
        const response = await Axios.post(`${API_BASE_URL}/${id}/book`);
        return response.data;
    } catch (error) {
        console.error(`Error booking shift with id ${id}:`, error);
        throw error;
    }
};

const cancelShift = async (id: any) => {
    try {
        const response = await Axios.post(`${API_BASE_URL}/${id}/cancel`);
        return response.data;
    } catch (error) {
        console.error(`Error cancelling shift with id ${id}:`, error);
        throw error;
    }
};

export {fetchShifts, fetchShiftById, bookShift, cancelShift};
