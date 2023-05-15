import { appState } from "../AppState.js"


export class User {
  constructor(data) {
    this.name = data.name
    this.notes = data.notes || 0
  }

  get UserTemplate(){
    return /*html*/`
        <div class="title">USER: <h5>${this.ComputeName}</h5></div>
        <div class="title">NOTES: <h5>${this.ComputeNotes}</h5></div>
        <div class="autosave-toggle order-2 ${this.ComputeAutosave}" onclick="app.usersController.autosave()">AUTOSAVE: ${this.ComputeAutosave}</div>
        <div class="logout order-${this.ComputeOrder}" onclick="app.usersController.${this.ComputeLogged}()">${this.ComputeLogged}</div>
    `
  }

  get ComputeName(){
    let name = this.name
    let computedName = ''
    let fLetter = name.charAt(0).toUpperCase()
    let lowerLetters = ''

    // This pulls out the entered string, except the first letter
    for (let i = 1; i < name.length ; i++){ lowerLetters += name.charAt(i) }
    // This capitalizes the first letter of the username
    computedName = fLetter + lowerLetters
    
    return computedName
    }

  get ComputeAutosave(){
    let autoSave = appState.autoSave
    let autoSaveValue = ''
    if (autoSave == true){ autoSaveValue = 'on' }
    else{ autoSaveValue = 'off' }
    return autoSaveValue
    }

    get ComputeLogged(){
      let name = appState.userName
      let logged = ''
      
      // @ts-ignore
      if( name != '' ){ logged = 'LOGOUT'}
      else{ logged = 'LOGIN'}

      return logged
    }

    get ComputeOrder(){
      let order = 2
      if (this.ComputeLogged == 'LOGIN'){
        order = 1
      }
      return order
    }

    get ComputeNotes(){
      return appState.notesNum
    }
}
