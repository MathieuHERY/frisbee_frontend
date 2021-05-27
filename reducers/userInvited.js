<<<<<<< HEAD
//traitement de l'action réalisée sur la page UsersFrisbee via le onPress
// traitement de l'ordre 
//Le rôle du reduceur est de gérer une et une seule valeur stockée dans le store de Redux.
//C’est le reduceur qui va être en charge de modifier la valeur dans le store


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
=======
export default function(userInvited = {}, action) {
    if(action.type === "getUserInvitedInfo") {
        console.log('console log dans le reducer:', action.userInvited)
        return action.userInvited
        } else {
            return userInvited; 
        }
>>>>>>> eb63040c27843ea8e00a168ab70bf026b7efd041
}
