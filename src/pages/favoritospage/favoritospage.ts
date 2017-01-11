import {NavController, AlertController} from 'ionic-angular';
import {FirebaseAuth, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";
 
 import {HomePage} from '../home/home';

@Component({
  templateUrl: 'favoritospage.html'
})
export class FavoritosPage {
  todoList: FirebaseListObservable<any>;
 
  constructor(public af: AngularFire, public auth: FirebaseAuth, public nav: NavController, private alertCtrl: AlertController) {}
 
  
  ngOnInit() {
    this.auth.subscribe((data) => {
      if (data) {
        this.todoList = this.af.database.list('/favoritos', {
          query: {
            orderByChild: 'user',
            equalTo: localStorage.getItem('user')
          }
        });
      }
    });
  }
  sendhome() {
    this.nav.setRoot(HomePage);
  }
}