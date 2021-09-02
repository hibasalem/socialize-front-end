const initialState = {
    showMessenger: false,
    messageReceiverId: null,
    allMessages: [],
    showMessages: false,
}


export default function messageReducer(state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case 'HANDLE_SHOW_MESSENGER':
            return {
                showMessenger: true,
                messageReceiverId: payload,
                allMessages: state.allMessages,
                showMessages: state.showMessages,
            }
        case 'RETURN_MESSAGES':
            return{
                showMessenger: state.showMessenger,
                messageReceiverId: state.messageReceiverId,
                allMessages: payload,
                showMessages: true,
            }
        default:
            return state;
    }
}


export function handleShowMessenger(payload) {
    return {
        type: 'HANDLE_SHOW_MESSENGER',
        payload: payload
    }
}

export function returnMessages(payload){
    return {
        type:'RETURN_MESSAGES',
        payload:payload
    }
}