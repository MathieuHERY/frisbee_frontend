export default function(newUser = {}, action) {
    if(action.type === "addInfoFirstStep") {

        return action.newUser
    }
    if(action.type === "addInfoSecondStep") {

        return {
            ...newUser,
            Age: action.newUser.age,
            Description:action.newUser.description,
        }
    }
    if(action.type === "addInfoFourStep") {

        return {
            ...newUser,
            SportsHabits:action.newUser.habits, 
            SportsHours : `${action.newUser.hoursStart} à ${action.newUser.hoursEnd}`,
        }
    
    }
    if(action.type === "addInfoThirdStep") {

        return {
            ...newUser,
            FavoritesSports:action.newUser.sport
        }
    
    } if(action.type === "GetUserInfoConnected") {
        console.log('userLog',action.newUser )
        return {
            ...newUser,
            token:action.newUser.token, 
            _id : action.newUser.id,
            UserPicture : action.newUser.picture
        }
    
    } if(action.type === "getUserInfoLogged") {
        console.log('userLog',action.newUser )
        return action.newUser


    } else {
        return newUser;
    }
}
