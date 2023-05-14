import { generateId } from "../Utils/generateId.js"

export class Note{
    constructor(data){
        this.id = data.id || generateId()
        this.title = data.title || 'New Note'
        this.content = data.content || ''
        this.created = data.date || data.ComputeDateCreated
        this.edited = data.edited || 'Never'
        this.color = data.color || 'white'
        this.user = data.user 
        this.saved = data.saved || true
    }

    get NoteTemplate() {
        return /*html*/`
        <div class="notecard ${this.color} id="${this.id}" onclick="app.notesController.setActive('${this.id}')">
        <div class="notecard-body">
            <h5 class="notecard-title">
            ${this.title}
            </h5>
            <p class="notecard-text">
            ${this.ComputeContent}
            </p>
        </div>
        <div class="notecard-footer">
            <small>
            Last Updated: ${this.edited}
            </small>
        </div>
      </div>
        `
    }

    get ActiveTemplate(){
        return/*html*/`
        <div class="col-12 active-notecard ${this.color}">
            <form action="" onsubmit="app.notesController.alterNote('${this.id}')" id="activeCardHTM">
                <div class="info">

                    <input type="text" onblur="app.notesController.alterContent('${this.id}', value, 'title')" name="title" placeholder="New Note" value="${this.title}" type="text" minLength="3" maxlength="15">
                    <select type="text" name="color" onchange="app.notesController.alterContent('${this.id}', value, 'color')">
                        <option>-- Color --</option>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="teal">Teal</option>
                        <option value="blue">Blue</option>
                        <option value="purple">Purple</option>
                        <option value="black">Black</option>
                    </select>

                    <p for="Date Created">Created: ${this.ComputeDateCreated} | Updated: ${this.edited}</p>
                    
                    <p>Characters: ${this.ComputeCharacters}</p>
                    <div class="d-flex flex-row justify-content-around">
                        <div class="delete" onclick="app.notesController.deleteNote('${this.id}')">
                        Delete
                        </div>
                        <button class="save" type="submit">
                        Save
                        </button>
                    </div>
                </div>
                <div class="content">
                    <textarea onblur="app.notesController.alterContent('${this.id}', value, 'content')" name="content" placeholder="Jot Something Down">${this.content}</textarea>
                </div>
            </form>
      </div>
        `
    }

    static CreateNoteTemplate(){
        return /*html*/`
        <div class="newcard white order-3" onclick="app.notesController.newNote()">

            <h4>
            +
            </h4>
            <p>
            New Note
            </p>

      </div>
        `
    }

    get ComputeDateCreated() {
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let month = new Date().getMonth()
        let day = new Date().getDate()
        let date = this.created 
        return months[month] + ' ' + day
    }

    get ComputeContent(){
        let computedContent = this.content
        if (computedContent.length < 10){
            return computedContent
        }else{
            let edit = ''
            for(let i = 0; i<10 ; i++){
                edit += computedContent[i]
            }
            let editedContent = edit + '...'
            return editedContent
        }
    }

    get ComputeCharacters() {
        let characterCount = this.content
        return characterCount.length
    }

}