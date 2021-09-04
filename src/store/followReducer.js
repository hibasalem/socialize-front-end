const initialState = {
    allFollowing: [],
    showFollowing: false,
    allFollowers: [],
    showFollowers: false,
}

export default function followReducer(state = initialState, actions) {
    const { payload, type } = actions;
    switch (type) {
        case 'GET_FOLLOWING':
            return {
                allFollowing: payload,
                showFollowing: true,
                allFollowers: state.allFollowers,
                showFollowers: state.showFollowers,
            }
        case 'GET_FOLLOWERS':
            return {
                allFollowing: state.allFollowing,
                showFollowing: state.showFollowing,
                allFollowers: payload,
                showFollowers: true,
            }
        default:
            return state;
    }

}


export function getFollowing(payload) {
    return {
        type: 'GET_FOLLOWING',
        payload: payload,
    }
}
export function getFollowers(payload) {
    return {
        type: 'GET_FOLLOWERS',
        payload: payload,
    }
}

