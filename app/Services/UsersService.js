import { appState } from "../AppState.js";
// import { saveState } from "../Utils/Store.js";
// import { User } from "../Models/User.js";

class UsersService{
    autosave() {
        appState.autoSave = !appState.autoSave
    }
    
    logInOut() {
        try {
            // Clears all data when the user logs in or out
            appState.userName = ''
            appState.notesNum = 0
            // @ts-ignore
            appState.activeNote = 'Select a Note' 
        } catch (error) { console.error(error) }
    }

    verifyUser(input) {
        try {
            // Logs the username in the appData as all lowercase
            let userLower = input.toLowerCase()
            appState.userName = userLower
        }catch (error) {console.error(error)}

        // asks the numCheck to check to see how many notes they have
        this.noteNumCheck()
    }

    noteNumCheck(){
        // Filters out the notes for the user from the array
        let notes = appState.notes
        let filteredNotes = notes.filter(n => n.user == appState.userName)

        // commits the number of notes to the appState
        appState.notesNum = filteredNotes.length

        // lets the controllers know that there was a change on notesNum
        appState.emit('notesNum')
    }

    ComputeName(name){
        let computedName = ''
        let fLetter = name.charAt(0).toUpperCase()
        let lowerLetters = ''
    
        // This pulls out the entered string, except the first letter
        for (let i = 1; i < name.length ; i++){ lowerLetters += name.charAt(i) }
        // This capitalizes the first letter of the username
        computedName = fLetter + lowerLetters
        
        return computedName
        }
}

export const usersService = new UsersService();