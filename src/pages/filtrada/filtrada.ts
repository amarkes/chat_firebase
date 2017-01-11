import {NavController, AlertController} from 'ionic-angular';
import {FirebaseAuth, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";
 
 import {HomePage} from '../home/home';

@Component({
  templateUrl: 'filtrada.html'
})
export class FiltradaPage {
  todoList: FirebaseListObservable<any>;
 
  constructor(public af: AngularFire, public auth: FirebaseAuth, public nav: NavController, private alertCtrl: AlertController) {}
 
  
  ngOnInit() {
    
  }
  sendhome() {
    this.nav.setRoot(HomePage);
  }
  filtrar(flltro) {
    this.auth.subscribe((data) => {
      if (data) {
        this.todoList = this.af.database.list('/todoList', {
          query: {
            orderByChild: 'id',
            equalTo: flltro
          }
        });
      }
    })
  }
}