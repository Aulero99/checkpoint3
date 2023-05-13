import { appState } from "../AppState.js";

class UsersService{
    logout() {
        console.log('clear everything')
        appState.userName = ''
        appState.notesNum = 0
        appState.activeNote = 'Select a Note'
    }
    verifyUser(input) {
        let userLower = input.toLowerCase()
        appState.userName = userLower

        console.log('The username is', appState.userName)

        this.userNoteCheck()
    }

    userNoteCheck(){
        let notes = appState.notes
        let filteredNotes = notes.filter(n => n.user == appState.userName)

        appState.notesNum = filteredNotes.length

        console.log('the number of notes is', appState.notesNum)

        appState.emit('notesNum')
    }
}

export const usersService = new UsersService();