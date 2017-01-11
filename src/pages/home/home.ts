import {NavController, AlertController} from 'ionic-angular';
import {FirebaseAuth, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";
 

import {FiltradaPage} from '../filtrada/filtrada';
import {FavoritosPage} from '../favoritospage/favoritospage';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  todoList: FirebaseListObservable<any>;
  favoritos: FirebaseListObservable<any>;
  constructor(public af: AngularFire, public auth: FirebaseAuth, public nav: NavController, private alertCtrl: AlertController) {}
 
  public createTodo() {
    this.editTodo(null, true);
  }
 
  public openTodo(todo) {
    this.editTodo(todo, false);
  }
 
  public removeTodo(item) {
    this.todoList.remove(item);
  }
  public addFavoritos(item) {

    
  	var resulitem = { user:null, id:null };
 		resulitem = { user:localStorage.getItem('user'), id:item.id };
  	this.favoritos.push(resulitem);

  }
  editTodo(todo, isNew: boolean) {
    let prompt = this.alertCtrl.create({
      title: isNew ? 'Create Todo' : 'Update Todo',
      inputs: [
        {
          name: 'produto',
          placeholder: 'Nome do produto',
          value: todo ? todo.nome : ''
        },
        {
          name: 'valor',
          placeholder: 'Valor',
          value: todo ? todo.valor : ''
        },
        {
          name: 'quantidade',
          placeholder: 'Qtl',
          value: todo ? todo.quantidade : ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: todo ? 'Update' : 'Add',
          handler: data => {
          	var save = {
          		id:"11",
          		nome:data.produto,
          		valor:data.valor,
          		quantidade:data.quantidade,
          		date:Date()
          	}
          	console.log(save);
            if (isNew) {
              this.todoList.push(save);
            } else {
              this.todoList.update(todo, save);
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
        this.todoList = this.af.database.list('/todoList');
        this.favoritos = this.af.database.list('/favoritos');
      }
    })
  }
  primeira() {
  	this.nav.setRoot(FiltradaPage);
  }

  favoritospage() {
    this.nav.setRoot(FavoritosPage)
  }
}