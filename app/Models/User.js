

export class User {
  constructor(data) {
    this.name = data.name
    this.notes = data.notes
  }

  get UserTemplate() {
    return /*html*/`
        <div class="title">USER: <h5>${this.ComputeName}</h5></div>
        <div class="title">NOTES: <h5>${this.notes}</h5></div>
    `
  }

  get ComputeName(){
    let computedName = ''
    let name = this.name
    let fLetter = name.charAt(0).toUpperCase()
    let lowerLetters = ''

    // This pulls out the entered string, except the first letter
    for (let i = 1; i < name ; i++){ lowerLetters += name.charAt(i) }
    // This capitalizes the first letter of the username
    computedName = fLetter + lowerLetters
    
    return computedName
    }
}
