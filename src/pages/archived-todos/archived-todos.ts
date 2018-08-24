import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";

/**
 * Generated class for the ArchivedTodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archived-todos',
  templateUrl: 'archived-todos.html',
})
export class ArchivedTodosPage {
  public archivedTodos = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private todoProvider: TodoProvider) {
  }

  ionViewDidLoad() {
    this.archivedTodos = this.todoProvider.getArchivedTodos();
  }

}
