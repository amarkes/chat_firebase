import {NavController, AlertController} from 'ionic-angular';
import {FirebaseAuth, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";


import {LoginPage} from '../login/login';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  Rooms: FirebaseListObservable<any>;
  usuario = localStorage.getItem('user');
  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public nav: NavController,
    private alertCtrl: AlertController) {
      if(!localStorage.getItem('user')){
      	this.nav.setRoot(LoginPage);
      }
    }

  public createTodo() {
    this.editTodo(null, true);
  }

  public openTodo(todo) {
    this.editTodo(todo, false);
  }

  public removeTodo(item) {
    this.Rooms.remove(item);
  }

  editTodo(todo, isNew: boolean) {
    let prompt = this.alertCtrl.create({
      title: isNew ? 'Criar sala?' : 'Update Todo',
      message: 'Deseja criar uma nova sala?',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome da sala',
          value: todo ? todo.nome : ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: todo ? 'Alterar' : 'Adicionar',
          handler: data => {
          	var save = {
          		user:localStorage.getItem('user'),
          		nome:data.nome,
          		usuarios:0,
          		date:Date()
          	}
            if (isNew) {
              this.Rooms.push(save);
            } else {
              this.Rooms.update(todo, save);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  ngOnInit() {
    this.auth.subscribe((data) => {
      if (data) {
        this.Rooms = this.af.database.list('/Rooms');
      }
    })
  }

}
