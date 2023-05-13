// import { ValuesController } from "./Controllers/ValuesController.js";

import { NotesController } from "./Controllers/NotesController.js";
import { UsersController } from "./Controllers/UsersController.js";

class App {
  // valuesController = new ValuesController();
  notesController = new NotesController()
  usersController = new UsersController()
}

window["app"] = new App();
