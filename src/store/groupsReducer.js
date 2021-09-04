const initialState = {
    allGroups: [],
    showGroups: false,
    GroupRequests: [],
    showGroupsRequests: false,
    usergroups: [],
    showUsergroups: false,
}

export default function groupReducer(state = initialState, actions) {
    const { type, payload } = actions;
    switch (type) {
        case 'RETURN_ALL_GROUPS':
            return {
                allGroups: payload,
                showGroups: true,
                GroupRequests: state.GroupRequests,
                showGroupsRequests: state.showGroupsRequests,
                usergroups: state.usergroups,
                showUsergroups: state.showUsergroups,
            }
        case 'RETURN_GROUP_REQUESTS':
            return {
                allGroups: state.allGroups,
                showGroups: state.showGroups,
                GroupRequests: payload,
                showGroupsRequests: true,
                usergroups: state.usergroups,
                showUsergroups: state.showUsergroups,
            }
        case 'RETURN_USER_GROUPS':
            return{
                allGroups: state.allGroups,
                showGroups: state.showGroups,
                GroupRequests: state.GroupRequests,
                showGroupsRequests: state.showGroupsRequests,
                usergroups: payload,
                showUsergroups: true,
            }
        default:
            return state;
    }
}


export function returnAllGroups(payload) {
    return {
        type: 'RETURN_ALL_GROUPS',
        payload: payload,
    }
}

export function returnGroupRequests(payload) {
    return {
        type: 'RETURN_GROUP_REQUESTS',
        payload: payload
    }
}

export function returnUsergroups(payload) {
    return {
        type: 'RETURN_USER_GROUPS',
        payload: payload
    }
}