import {NavController, AlertController, NavParams} from 'ionic-angular';
import {FirebaseAuth, AngularFire, FirebaseListObservable} from 'angularfire2';
import {Component} from "@angular/core";


import {LoginPage} from '../login/login';


@Component({
  templateUrl: 'room.html'
})
export class RoomPage {
  Room: FirebaseListObservable<any>;
  public usuario:any = localStorage.getItem('user');
  public mensagem:any = "";
  public roomname:any = "";
  constructor(
    public af: AngularFire,
    public auth: FirebaseAuth,
    public nav: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
      if(!localStorage.getItem('user') && !localStorage.getItem('auth')){
      	this.nav.setRoot(LoginPage);
      }
    }

  public removeTodo(item) {
    this.Room.remove(item);
  }

  SendMensagem() {
    console.log(this.mensagem);
    if(this.mensagem != ""){
      var salvando = {
        user: this.usuario,
        mensagem: this.mensagem
      };
      this.Room.push(salvando);
      this.mensagem = "";
    }
  }


  ngOnInit() {
    let ident = this.navParams.get('ident');
    let nome = this.navParams.get('nome');
    this.auth.subscribe((data) => {
      if (data) {
        
        this.Room = this.af.database.list('/Room/'+ident+'/data');
      }
    })
    this.roomname = nome;
  }

}
