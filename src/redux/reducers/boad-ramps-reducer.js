import BOAT_RAMPS from '../../config/boat_ramps.json'

const INITIAL_STATE = BOAT_RAMPS;

export default function boadRamps(state = INITIAL_STATE, action) {
    switch (action.type) {

        default:
            return state;
    }
}

