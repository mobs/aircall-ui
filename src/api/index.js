import axios from "axios"

const API = axios.create({baseURL: "https://cerulean-marlin-wig.cyclic.app"})

export const getActivities = async () => {
    try {
        const resposne = API.get('/activities');
        return resposne;
    } catch (err) {
        console.log("Error in api :: getActivities: ", err.message);
    }
}

export const getActivityDetail = async (call_id) => {
    try {
        const response = API.get(`/activities/${call_id}`);
        return response;
    } catch (err) {
        console.log("Error in api :: getActivityDetail: ", err.message);
    }
}

export const updateActivityStatus = async (call_id, status) => {
    try {
        const response = API.patch(`/activities/${call_id}`, status);
        return response;
    } catch (err) {
        console.log("Error in api :: updateActivityStatus: ", err.message)
    }
}