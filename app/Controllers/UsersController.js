import { appState } from "../AppState.js";
import { Pop } from "../Utils/Pop.js";
import { usersService } from "../Services/UsersService.js";
import { setHTML } from "../Utils/Writer.js";

// TODO This is not working for.....some reason. I don't know
// function _drawTemplateUser(){
//     let users = appState.users
//     console.log('the users are',users)
//     let user = appState.userName
//     console.log('the user is',user)
//     let filteredUser = users.filter(u => u.name == user)
//     console.log('the filtered user is',filteredUser)
//     let template = filteredUser.UserTemplate

//     console.log(template)

//     setHTML('userBoardHTM', template)
// }

function _drawUser(){
    let notes = appState.notesNum
    let name = appState.userName
    let autoSave = appState.autoSave
    let computedName = usersService.ComputeName(name)
    let order = 2

    // this tracks whether or not the user is logging in or out
    let logged = ''
    let loggedStyle = ''
    // @ts-ignore
    if( name != '' ){ logged = 'LOGOUT'; loggedStyle = 'info'}
    else{ logged = 'LOGIN'; order = 1; loggedStyle = 'login' }

    let autoSaveValue = ''
    if (autoSave == true){autoSaveValue = 'on'}
    else{autoSaveValue = 'off'}
    
    // Since the user is only text editing, there isn't really a need to set up a model for it, however
    // if the user had a user page, then the need for a user model would arise
    let template = /*html*/`
        <div class="title order-2">USER: <h5>${computedName}</h5></div>
        <div class="title order-2">NOTES: <h5>${notes}</h5></div>
        <div class="autosave-toggle order-2 ${autoSaveValue}" onclick="app.usersController.autosave()">AUTOSAVE: ${autoSaveValue.toUpperCase()}</div>
        <div class="logout order-${order}" onclick="app.usersController.${logged}()">${logged}</div>
    `

    setHTML('userBoardHTM', template)
    setHTML('noteCountHTM', notes)
}

function _noteNumCheck(){
    usersService.noteNumCheck()
}

export class UsersController {

    constructor(){
        // Working Code
        _drawUser()
        appState.on('notesNum', _drawUser)
        appState.on('autoSave', _drawUser)
        
        //TODO this code pulls from the template, but for some reason will not write, I do not know why
        // _drawTemplateUser()
        // appState.on('notesNum', _drawTemplateUser)
        // appState.on('autoSave', _drawTemplateUser)

        this.verifyUser()
        appState.on('notes', _noteNumCheck)
    }

    // This function is called whenever the user first enters the page and dodges the login/out function
    async verifyUser(){
        let input = await Pop.prompt('Please enter your name')
        if (input){console.log('Logging in as',input); usersService.verifyUser(input)}
        
    }

    // Checks to see whether the user is logging in or out, then either asks for confirmation or passes the action along to the service
    async LOGOUT(){
        let input = await Pop.confirm('Any unsaved changes may be lost.')
        if (input){
            usersService.logInOut()
            this.verifyUser()
        }
    }

    LOGIN(){
        usersService.logInOut()
        this.verifyUser()
    }

    autosave(){
        usersService.autosave()
    }
}