import { GENERAL_CONSTS } from "../constants";

export const initialState = {
    selectedLanguage: '',
};

export default (state = initialState, action) => {
    switch ( action.type ) {


        default:
            return state;
    }
}
