import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, reorderArray } from 'ionic-angular';
import { TodoProvider } from "../../providers/todo/todo";
import {ArchivedTodosPage} from "../archived-todos/archived-todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  public reorderIsEnabled = false;

  constructor(public navCtrl: NavController, private toastController: ToastController, private alertController: AlertController, private todoProvider: TodoProvider) {
    this.todos = this.todoProvider.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivePage(){
       this.navCtrl.push(ArchivedTodosPage);
  }

  itemReordered($event){
    reorderArray(this.todos, $event);
  }


  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
        title: "Tarefa",
        inputs:[
            {
              type: "text",
              name: "addTodoInput"
            }
        ],
        buttons: [
            {
              text: "Cancelar"
            },
            {
              text: "Adicionar",
              handler: (inputData)=> {
                  let todoText;
                  todoText = inputData.addTodoInput;
                  this.todoProvider.addTodo(todoText);

                  addTodoAlert.onDidDismiss(()=>{
                      let addTodoToast = this.toastController.create(
                          {
                              message: "Tarefa Adicionada!",
                              duration: 2000
                          }
                      );
                      addTodoToast.present();
                  });

              }
            }
        ]
    });
    addTodoAlert.present();
  }

    editTodo(todoIndex){
        let editTodoAlert = this.alertController.create({
            title: "Editar Tarefa",
            inputs:[
                {
                    type: "text",
                    name: "editTodoInput",
                    value: this.todos[todoIndex]
                }
            ],
            buttons: [
                {
                    text: "Cancelar"
                },
                {
                    text: "Editar Tarefa",
                    handler: (inputData)=> {
                        let todoText;
                        todoText = inputData.editTodoInput;
                        this.todoProvider.editTodo(todoText, todoIndex);

                        editTodoAlert.onDidDismiss(()=>{
                            let editTodoToast = this.toastController.create(
                                {
                                    message: "Tarefa alterada!",
                                    duration: 2000
                                }
                            );
                            editTodoToast.present();
                        });

                    }
                }
            ]
        });
        editTodoAlert.present();
    }

}
