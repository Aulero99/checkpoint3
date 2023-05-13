// import { Value } from "./Models/Value.js"
import { Note } from "./Models/Note.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  // /** @type {import('./Models/Value').Value[]} */
  // values = loadState('values', [Value])

  /** @type {import('./Models/Note').Note[]} */
  // notes = [
  //   new Note({title: 'note1', color:'red', user:'auston'}),
  //   new Note({title: 'note2', color:'orange', user:'auston'}),
  //   new Note({title: 'note3', color:'yellow', user:'auston'}),
  //   new Note({title: 'note4', color:'green', user:'auston'}),
  //   new Note({title: 'note5', color:'teal', user:'auston'}),
  //   new Note({title: 'note6', color:'blue', user:'auston'}),
  //   new Note({title: 'note7', color:'purple', user:'auston'}),
  //   new Note({title: 'note8', color:'white', user:'auston'}),
  //   new Note({title: 'note9', color:'black', user:'auston'}),
  // ]
  notes = loadState('notes', [Note])

  activeNote = null
  userName = ''
  notesNum = 0


}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
