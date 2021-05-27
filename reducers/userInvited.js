export default function(userInvited = {}, action) {
    if(action.type === "getUserInvitedInfo") {
        console.log('console log dans le reducer:', action.userInvited)
        return action.userInvited
        } else {
            return userInvited; 
        }
}
