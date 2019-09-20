// reducer is function that gets 2 properties

const INITIAL_STATE = {
    currentUser: null   
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
        return {
            ...state,
            currentUser: action.payload
        }
        default: 
        return state;
    }
};

export default userReducer;