const initialState={
    allusers: [],
}

export default function allUsersReducer (state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case 'SET_ALL_USERS':
            return {
                allusers:payload
            }
        default:
            return state
    }
}

export function setAllUsers(payload){
    return {
        type:'SET_ALL_USERS',
        payload:payload
    }
}