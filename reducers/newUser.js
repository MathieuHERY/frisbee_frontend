export default function(newUser = {}, action) {
    if(action.type === "addInfoFirstStep") {
        console.log(action.newUser)
        return action.newUser
    }
    if(action.type === "addInfoSecondStep") {
        console.log(action.newUser)
        return {
            ...newUser,
            age: action.newUser.age,
            description:action.newUser.description,
        }
    }
    if(action.type === "addInfoFourStep") {
        console.log(action.newUser)
        return {
            ...newUser,
            habits:action.newUser.habits, 
            hoursStart : action.newUser.hoursStart,
            hoursEnd : action.newUser.hoursEnd
        }
    
    }
    if(action.type === "addInfoThirdStep") {
        console.log(action.newUser)
        return {
            ...newUser,
            sport:action.newUser.sport
        }
    
    } else {
        return newUser;
    }
}