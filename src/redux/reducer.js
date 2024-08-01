import { ADDTODB, REMOVETODB, UPDATETODB } from "./actions";


const Initialstate = {};

const apireducer = (state = Initialstate, action) => {
    switch (action.type) {
        case ADDTODB:
            return {
                state
            }

        case REMOVETODB:
            return {
                state
            }

        case UPDATETODB:
            return {
                state
            }
    }
}


export default apireducer;