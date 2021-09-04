const initialState = {
    targetedProfileInfo: [],
    targetedFollowing: [],
    targetedFollowers: [],
    targetedPosts: [],
}

export default function targetProfileReducer(state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case 'TARGET_INFO':
            return {
                targetedProfileInfo: payload,
                targetedFollowing: state.targetedFollowing,
                targetedFollowers: state.targetedFollowers,
                targetedPosts: state.targetedPosts,
            }
        case 'TARGET_FOLLOWING':
            return{
                targetedProfileInfo: state.targetedProfileInfo,
                targetedFollowing: payload,
                targetedFollowers: state.targetedFollowers,
                targetedPosts: state.targetedPosts,
            }
        case 'TARGET_FOLLOWERS':
            return{
                targetedProfileInfo: state.targetedProfileInfo,
                targetedFollowing: state.targetedFollowing,
                targetedFollowers: payload,
                targetedPosts: state.targetedPosts,
            }
        case 'TARGET_POSTS':
            return {
                targetedProfileInfo: state.targetedProfileInfo,
                targetedFollowing: state.targetedFollowing,
                targetedFollowers:state.targetedFollowers,
                targetedPosts: payload,
            }
        default:
            return state;
    }
}


export function targetInfo(payload) {
    return {
        type: 'TARGET_INFO',
        payload: payload
    }
}

export function targetFollowing(payload){
    return{
        type:'TARGET_FOLLOWING',
        payload:payload
    }
}
export function targetFollowers(payload){
    return{
        type:'TARGET_FOLLOWERS',
        payload:payload
    }
}
export function targetPosts(payload){
    return{
        type:'TARGET_POSTS',
        payload:payload
    }
}