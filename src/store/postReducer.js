const initialState = {
    posts: [],
    comments: [],
    showPosts: false,
}


export default function postReducer(state = initialState, actions) {
    const { type, payload } = actions;
    switch (type) {
        case 'READ':
            return {
                posts: payload,
                showPosts: true,
            }
        case 'READ_COMMENTS':
            return{
                comments: payload,
            }
        default:
            return state;
    }
}


export function read(payload) {
    return {
        type: 'READ',
        paylaod: payload
    }
}

export function readComments(payload){
    return{
        type:'READ_COMMENTS',
        payload:payload
    }
}