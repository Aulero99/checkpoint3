import { appState } from "../AppState.js";
import { Pop } from "../Utils/Pop.js";
import { usersService } from "../Services/UsersService.js";
import { setHTML } from "../Utils/Writer.js";

function _drawUser(){
    let userName = appState.userName
    let serName = ''

    for (let i = 1; i<userName.length ; i++){ serName += userName.charAt(i) }

    let capitolUser = userName.charAt(0).toUpperCase() + serName
    
    let logged = ''

    if( userName != '' ){ logged = 'LOGOUT' }
    else{ logged = 'LOGIN' }
    
    let userTemplate = /*html*/`
        <div class="user">
            <img src="assets/img/logo.svg">
            <div class="info">
                <div class="title">USER:</div><h5>${capitolUser}</h5>
                <div class="title">NOTES:</div><h5>${appState.notesNum}</h5>
                <div class="logout" onclick="app.usersController.logout()">${logged}</div>
        </div>
        `

        setHTML('userBoardHTM', userTemplate)
}

export class UsersController {
    constructor(){
        this.verifyUser()
        appState.on('notesNum', _drawUser)
    }

    async verifyUser(){
        let input = await Pop.prompt('Please enter your name')
        usersService.verifyUser(input)
    }

    logout(){
        usersService.logout()
        this.verifyUser()
    }
}