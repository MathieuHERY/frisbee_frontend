export default function(userId = "", action) {
    if (action.type == 'getUserId' ) {
        return action.userId;
    } else {
        return userId;
    }
}


// TO DO : Ajouter le MapDispatchToProps sur la page ScreenInscription4
