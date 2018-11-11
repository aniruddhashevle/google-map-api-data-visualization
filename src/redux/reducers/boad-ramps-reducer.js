import {
    GET_BOAT_RAMP_DATA
} from '../action-constants';

const INITIAL_STATE = {
    boatRamps: {}
};

export default function boatRampsData(state = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_BOAT_RAMP_DATA: {
            return { ...state, boatRamps: action.data }
        }

        default:
            return state;
    }
}

