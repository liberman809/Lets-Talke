export const SET_USERID = 'SET_USERID' 
export const SET_USERNAME = 'SET_USERNAE' 
export const SET_USEREMAIL = 'SET_USEREMAIL' 
export const SET_USERCHATS = 'SET_USERCHATS' 

export const initialState = {
    userId: undefined,
    userName: null,
    userEmail:null,
    userChats:[],
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USERID:
            newState = { ...state, userId: action.userId }
            break
        case SET_USERNAME:
            newState = { ...state, userName: action.userName }
            break
        case SET_USEREMAIL:
            newState = { ...state, userEmail: action.userEmail }
            break
        case SET_USERCHATS:
            newState = { ...state, userChats: action.userChats }
            break
                        
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}