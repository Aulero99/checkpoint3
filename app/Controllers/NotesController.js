import { appState } from "../AppState.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";
import { setText } from "../Utils/Writer.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js"
import { Note } from "../Models/Note.js"


function _drawNotes(){
    let notes = appState.notes
    let notesTemplate = ''

    let filteredNotes = notes.filter(n => n.user == appState.userName)

    filteredNotes.forEach(n => notesTemplate += n.NoteTemplate)
    notesTemplate += Note.CreateNoteTemplate()
    setHTML('noteBoardHTM', notesTemplate)
}

function _drawActiveNote(){
    let activeNote = appState.activeNote
    if(activeNote == 'Select a Note' ){
        setText('activeBoardHTM', 'Select a Note')
    }else{
        // @ts-ignore
        setHTML('activeBoardHTM', activeNote.ActiveTemplate)
    }
}


export class NotesController {

    constructor(){
        appState.on('userName', _drawNotes)
        appState.on('activeNote', _drawActiveNote)
        appState.on('notes', _drawNotes)
    }

    setActive(noteId){
        notesService.setActive(noteId)
    }

    alterNote(noteId){
        window.event?.preventDefault()
        const form = window.event.target

        let formData = getFormData(form)

        notesService.alterNote(noteId, formData)
    }

    newNote(){
        notesService.newNote()
    }

    changeColor(noteId, color){
        window.event?.preventDefault()
        notesService.changeColor(noteId, color)
    }

    async deleteNote(noteId){
        if(await Pop.confirm('Are you sure you want to delete this note?')){
            notesService.deleteNote(noteId)
        }
    }


}