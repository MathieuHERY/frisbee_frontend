export default function(userInfo = [], action) {
    if (action.type == 'focusOnUser' ) {
        console.log(action.userInfo)
        return action.userInfo
    } else {
        return userInfo;
    }