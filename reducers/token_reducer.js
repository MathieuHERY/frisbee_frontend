export default function(userToken = "", action) {
    if (action.type == 'getUserToken' ) {
        return action.userToken;
    } else {
        return userToken;
    }
}


