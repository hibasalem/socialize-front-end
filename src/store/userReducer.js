const initialState ={
    loggedIn: false,
    user: {
      userID: null,
      firstname: null,
      lastname: null,
      gender: null,
      age: null,
      auth_id: null,
      image_url: null,
    },
    path:'/profile',
}


export default function userReducer(state=initialState,action){
    const {type,payload} = action;

    switch(type){
        case 'LOGIN':
            //code
            let newState={
                loggedIn: true,
                user: {
                  userID: payload.id,
                  firstname: payload.firstname,
                  lastname: payload.lastname,
                  age: payload.age,
                  gender: payload.gender,
                  auth_id: payload.auth_id,
                  image_url: payload.image_url,
                },
                path: `/profile/${payload.id}`,
            }
            return newState;
        case 'LOGOUT':
            return {
                loggedIn: false,
            }
        default:
             return state;
    }

}

export function login(payload){
    return {
        type:'LOGIN',
        payload:payload,
    }
}
export function logOut(payload){
    return {
        type:'LOGOUT',
        payload:payload,
    }
}