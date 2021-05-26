export default function(userInvited = {}, action) {
    if(action.type === "userInvited") {
        console.log(action.userInvited)

        return {
            ...userInvited, //copie de l'objet, peut pas modifier directement l'objet et on y injecte les infos suivantes 
            id: action.userInvited.id,
            firstname: action.userInvited.firstname,
            picture:action.userInvited.picture,
            token: action.userInvited.token,
        }

    } else {
    return userInvited; 
}
}