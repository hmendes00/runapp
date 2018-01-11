import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { RunStarterComponent } from './runstarter/runstarter.component';
import { AuthService } from './providers/auth.service';
import { WeatherService } from './weather.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
const firebaseConfig = require('./../credentials.json');
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    RunStarterComponent,
    LoginPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    RouterModule.forRoot(routes)
  ],
  providers: [AngularFireAuth, AuthService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
