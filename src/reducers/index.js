export const usrReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_INFO':
        return action.info;

        default:
        return state;
    }
}