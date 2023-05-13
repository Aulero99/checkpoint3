import { appState } from "../AppState.js";
import { saveState } from "../Utils/Store.js";
import { Note } from "../Models/Note.js"
import { usersService } from "./UsersService.js";


function _saveNotes() {
    saveState('notes', appState.notes)
  }


class NotesService{
    deleteNote(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        appState.notes = appState.notes.filter(n=> n.id != noteId)

        // @ts-ignore
        appState.activeNote = 'Select a Note'

        usersService.userNoteCheck()

        if(appState.userName != ''){
            _saveNotes()
        }
    }
    
    newNote() {
        let userName = appState.userName
        let newNote = new Note({user:userName})

        appState.notes.push(newNote)
        appState.emit('notes')

        let newNoteIndex = appState.notes.length-1
        let foundNote = appState.notes[newNoteIndex]

        this.setActive(foundNote.id)
        usersService.userNoteCheck()

        if(appState.userName != ''){
            _saveNotes()
        }
    }
    
    changeColor(noteId, color) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        
        // @ts-ignore
        foundNote.color = color

        // @ts-ignore
        appState.activeNote = foundNote
        appState.emit('notes')
        appState.emit('activeNote')

        if(appState.userName != ''){
            _saveNotes()
        }
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

        if(appState.userName != ''){
            _saveNotes()
        }
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
        else{time = hourMilit.toString() + ':' + minutes + ' am'}

        return months[month] + ' ' + date + ', ' + time
    }

}


export const notesService = new NotesService();