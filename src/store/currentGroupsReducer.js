const initialState = {
    currentGroupPath: '',
    showCurrentGroupPath: false,
    currentGroupContent: [],
    showCurrentGroupContent: false,
    groupPosts: [],
    showGroupPosts: false,
    currentGroupID: null,
    groupMembers: [],
    showGroupMembers: false,
    groupPostsLikes: [],
    showGroupPostsLikes: false,
    groupComments: [],
    showGroupComments: false,
}


export default function currentGroupReducer(state = initialState, actions) {
    const { type, payload } = actions;
    switch (type) {

        case 'HANDLE_VIEW_GROUP':
            return {
                currentGroupPath: `/groups/${payload}`,
                showCurrentGroupPath: true,
                currentGroupContent: state.currentGroupContent,
                showCurrentGroupContent: state.showCurrentGroupContent,
                groupPosts: state.groupPosts,
                showGroupPosts: state.showGroupPosts,
                currentGroupID: payload,
                groupMembers: state.groupMembers,
                showGroupMembers: state.showGroupMembers,
                groupPostsLikes: state.groupPostsLikes,
                showGroupPostsLikes: state.showGroupPostsLikes,
                groupComments: state.groupComments,
                showGroupComments: state.showGroupComments,
            }
        case 'RETURN_CURRENT_GROUP_CONTENT':
            return {
                currentGroupPath: state.currentGroupPath,
                showCurrentGroupPath: state.showCurrentGroupPath,
                currentGroupContent: payload,
                showCurrentGroupContent: true,
                groupPosts: state.groupPosts,
                showGroupPosts: state.showGroupPosts,
                currentGroupID: state.currentGroupID,
                groupMembers: state.groupMembers,
                showGroupMembers: state.showGroupMembers,
                groupPostsLikes: state.groupPostsLikes,
                showGroupPostsLikes: state.showGroupPostsLikes,
                groupComments: state.groupComments,
                showGroupComments: state.showGroupComments,
            }
        case 'NEW_GROUP_POST':
            return {
                currentGroupPath: state.currentGroupPath,
                showCurrentGroupPath: state.showCurrentGroupPath,
                currentGroupContent: state.currentGroupContent,
                showCurrentGroupContent: state.showCurrentGroupContent,
                groupPosts: payload,
                showGroupPosts: true,
                currentGroupID: state.currentGroupID,
                groupMembers: state.groupMembers,
                showGroupMembers: state.showGroupMembers,
                groupPostsLikes: state.groupPostsLikes,
                showGroupPostsLikes: state.showGroupPostsLikes,
                groupComments: state.groupComments,
                showGroupComments: state.showGroupComments,
            }
        case 'RETURN_GROUP_MEMBERS':
            return {
                currentGroupPath: state.currentGroupPath,
                showCurrentGroupPath: state.showCurrentGroupPath,
                currentGroupContent: state.currentGroupContent,
                showCurrentGroupContent: state.showCurrentGroupContent,
                groupPosts: state.groupPosts,
                showGroupPosts: state.showGroupPosts,
                currentGroupID: state.currentGroupID,
                groupMembers: payload,
                showGroupMembers: true,
                groupPostsLikes: state.groupPostsLikes,
                showGroupPostsLikes: state.showGroupPostsLikes,
                groupComments: state.groupComments,
                showGroupComments: state.showGroupComments,
            }
        case 'RETURN_GROUP_COMMENTS':
            return {
                currentGroupPath: state.currentGroupPath,
                showCurrentGroupPath: state.showCurrentGroupPath,
                currentGroupContent: state.currentGroupContent,
                showCurrentGroupContent: state.showCurrentGroupContent,
                groupPosts: state.groupPosts,
                showGroupPosts: state.showGroupPosts,
                currentGroupID: state.currentGroupID,
                groupMembers: state.groupMembers,
                showGroupMembers: state.showGroupMembers,
                groupPostsLikes: state.groupPostsLikes,
                showGroupPostsLikes: state.showGroupPostsLikes,
                groupComments: payload,
                showGroupComments: true,
            }
        default:
            return state;
    }
}


export function handleViewgroup(payload) {
    return {
        type: 'HANDLE_VIEW_GROUP',
        payload: payload
    }
}

export function returnCurrentGroupContent(payload) {
    return {
        type: 'RETURN_CURRENT_GROUP_CONTENT',
        payload: payload
    }
}
export function returnNewGroupPost(payload) {
    return {
        type: 'NEW_GROUP_POST',
        payload: payload
    }
}

export function returnGroupMembers(payload) {
    return {
        type: 'RETURN_GROUP_MEMBERS',
        paylaod: payload,
    }
}


export function returnGroupComments(payload) {
    return {
        type: 'RETURN_GROUP_COMMENTS',
        payload: payload
    }
}