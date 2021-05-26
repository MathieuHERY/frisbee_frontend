export default function(userInvited = {}, action) {
    if(action.type === "userInvited") {
        console.log(action.userInvited)
        return action.userInvited
    } if(action.type === "userInvited") {
        console.log(action.userInvited)
        return {
            ...userInvited,
            id: action.userInvited.id,
            firstname: action.userInvited.firstname,
            picture:action.userInvited.picture,
        }
    
    } else {
    return userInvited;
}
}
