import {initialState as general} from "../reducers/general";

const reducers = {
    general,
};

export default state => {
    const sData = {};
    Object.keys(reducers).forEach(selectorKey => {
        Object.keys(reducers[selectorKey]).forEach(key => {
            sData[key] = state[selectorKey][key];
        });
    });
    return sData;
};
