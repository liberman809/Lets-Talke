export const SET_CHATID = 'SET_CHATID' 
export const SET_CHATNAME = 'SET_CHATNAME' 
export const SET_PARTICIPANTS = 'SET_PARTICIPANTS' 
export const SET_MANAGERS = 'SET_MANAGERS' 
export const SET_MESSAGES = 'SET_MESSAGES' 
export const SET_DESCRIPTION = 'SET_DESCRIPTION' 
export const SET_TYPE ='SET_TYPE'
export const SET_FOUNDER ='SET_FOUNDER'


const initialState = {
    chatId: undefined,
    chatName: null,
    participants:null,
    managers:null,
    messages:[],
    description:null,
    type:null,
    founder:null
}

export function chatReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CHATID:
            newState = { ...state, chatId: action.chatId }
            break
        case SET_CHATNAME:
            newState = { ...state, chatName: action.chatName }
            break
        case SET_PARTICIPANTS:
            newState = { ...state, participants: action.participants }
            break
        case SET_MANAGERS:
            newState = { ...state, managers: action.managers }
            break
        case SET_MESSAGES:
            newState = { ...state, messages: action.messages }
        break
        case SET_DESCRIPTION:
            newState = { ...state, description: action.description }
        break
        case SET_FOUNDER:
            newState = { ...state, founder: action.founder }
        break
        case SET_TYPE:
            newState = { ...state, type: action.chatType }
        break


                        
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}