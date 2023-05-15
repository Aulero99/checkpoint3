import { appState } from "../AppState.js";
import { saveState } from "../Utils/Store.js";
import { Note } from "../Models/Note.js"


function _saveNotes() {
    saveState('notes', appState.notes)
  }


class NotesService{

    //NOTE these two classes handle creating and deleting notes

    deleteNote(noteId) {
        // Checks to find the right note based on the id passed to it
        appState.notes = appState.notes.filter(n=> n.id != noteId)

        // Sets the active note back to the default value
        // @ts-ignore
        appState.activeNote = 'Select a Note'

        this.saveNotes()
    }
    
    newNote() {
        // checks the userName then makes a new note with that userName
        let userName = appState.userName
        let newNote = new Note({user:userName})

        // Pushes the new note to the notes array, then emits on notes to have the changes drawn
        appState.notes.push(newNote)
        appState.emit('notes')

        // sets the new note as the active note
        let newNoteIndex = appState.notes.length-1
        let foundNote = appState.notes[newNoteIndex]
        this.setActive(foundNote.id)

        // notifies the usersService that the number of notes has changed
        // usersService.userNoteCheck()

        this.saveNotes()
    }
    

    alterContent(noteId, content, type){
        let foundNote = appState.notes.find(n => n.id == noteId)
        
        if(type == 'title'){
            if(content.length < 3){
                return
            }
            // @ts-ignore
            foundNote.title = content
        }
        if(type == 'content'){
            // @ts-ignore
            foundNote.content = content
        }
        if(type == 'color'){
            // @ts-ignore
            foundNote.color = content
        }
        if(type == 'collection'){
            // @ts-ignore
            foundNote.collection = content
        }

        if(appState.autoSave){
            // @ts-ignore
            foundNote.edited = this.computeTime()
        }

        // @ts-ignore
        appState.activeNote = foundNote

        appState.emit('notes')
        appState.emit('activeNote')

        this.saveNotes()
    }

    alterNote(noteId, formData) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        
        // @ts-ignore
        foundNote.title = formData.title
        // @ts-ignore
        foundNote.content = formData.content
        // @ts-ignore
        foundNote.edited = this.computeTime()

        // @ts-ignore
        appState.activeNote = foundNote
        appState.emit('notes')
        appState.emit('activeNote')

        if(appState.userName != ''){ _saveNotes() }
    }

    setActive(noteId){
        let foundNote = appState.notes.find(n => n.id == noteId)
        // @ts-ignore
        appState.activeNote = foundNote
    }

    computeTime(){
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        let month = (new Date().getMonth())
        let date = new Date().getDate().toString()
        let hourMilit = new Date().getHours()
        let minutesSd = new Date().getMinutes().toString()
        
        let minutes = ''
        let time = '' 

        if(minutesSd.length > 1){
            minutes = minutesSd
        }else{
            minutes = '0' + minutesSd
        }

        if(hourMilit > 12){time = (hourMilit - 12).toString() + ':' + minutes + ' pm'}
        else if(hourMilit == 0){time = (hourMilit + 12).toString() + ':' + minutes + ' am'}
        else {time = hourMilit.toString() + ':' + minutes + ' am'}

        let finalTime =  months[month] + ' ' + date + ', ' + time

        return finalTime
    }

    saveNotes(){
        if(appState.userName != '' && appState.autoSave){ _saveNotes() }
    }

}


export const notesService = new NotesService();