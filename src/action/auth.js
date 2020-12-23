import auth from "@react-native-firebase/auth"; 
import Snackbar from "react-native-snackbar"; 
import database from "@react-native-firebase/database"; 

export const signUp = (data) => async(dispatch) => {
    console.log(data)

    const {name, instaUsername, bio, email, password, country, image} = data

    auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data)
        console.log("User creation was suceess")

        database()
        .ref('/users/' + data.user.uid)
        .set({
            name, instaUsername, country, 
            image, bio, uid: data.user.uid
        })
        .then(() => console.log("Data set success"))
        Snackbar.show({
            text: "Account created", 
            textColor: "#FFF", 
            backgroundColor: "1b262c",
        })
    })
    .catch((error) => {
        console.log(error)
        Snackbar.show({
            text: "Signup failed", 
            textColor: "#FFF", 
            backgroundColor: "red"
        })
    })

}

export const signIn = (data) => async(dispatch) => {
    console.log(data)
    const {email, password} = data

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
        console.log("SIgned in")

        Snackbar.show({
            text: "Signed in succesfully", 
            textColor: "white", 
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.error(error)
        Snackbar.show({
            text: "Could not sign in", 
            textColor: "#FFF", 
            backgroundColor: "red"
        })
    })
}

export const signOut = () => async(dispatch) => {
    auth()
    .signOut()
    .then(() => {
        console.log("Signed out")

        Snackbar.show({
            text: "Signed out succesfully", 
            textColor: "white", 
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.log(error)
        Snackbar.show({
            text: "Cannot logout",
            textColor: "#FFF", 
            backgroundColor: "red"
        })
    })
}