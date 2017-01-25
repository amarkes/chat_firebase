import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoomPage } from '../pages/room/room';
import { FiltradaPage } from '../pages/filtrada/filtrada';
import { FavoritosPage } from '../pages/favoritospage/favoritospage';
import { LoginPage } from '../pages/login/login';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBcq6tumoVbc7e83EqeY40SL41Sxxt6LGQ",
  authDomain: "chatsample-ace9d.firebaseapp.com",
  databaseURL: "https://chatsample-ace9d.firebaseio.com",
  storageBucket: "chatsample-ace9d.appspot.com",
  messagingSenderId: "847402266268"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoomPage,
    FiltradaPage,
    FavoritosPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoomPage,
    FiltradaPage,
    FavoritosPage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
