export default function(userToken = "", action) {
    if (action.type == 'getUserToken' ) {
        return action.userToken;
    } else {
        return userToken;
    }
}


// TO DO : Ajouter le MapDispatchToProps sur la page ScreenInscription5
