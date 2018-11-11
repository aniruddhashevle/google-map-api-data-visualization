import {
    GET_BOAT_RAMP_DATA
} from '../action-constants';
import Axios from 'axios';

export function boatRampData(data) {
    return {
        type: GET_BOAT_RAMP_DATA,
        data
    }
}

export function getBoatRampData() {
    return async (dispatch) => {
        try {
            let resp = await Axios({
                method: 'get',
                //fake REST API using json-server : https://github.com/typicode/json-server
                url: `http://localhost:3030/boat_ramps`,
                withCredentials: true
            });
            if (!resp) throw new Error('no response');
            if (resp && resp.data && resp.data.status && resp.data.status.success) {
                const { data = null } = resp.data;
                data && dispatch(boatRampData(data));
            }
            return resp;
        } catch (error) {
            throw error;
        }
    }
}