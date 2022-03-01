import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { HeaderComponent } from './user-home/header/header.component';
import { FooterComponent } from './user-home/footer/footer.component';
import { BodyComponent } from './user-home/body/body.component';
import { CarouselComponent } from './user-home/body/carousel/carousel.component';
import { PrincipalComponent } from './user-home/body/principal/principal.component';
import { CrearpeliculaComponent } from './pelicula/crearpelicula/crearpelicula.component';
import { InfopeliculaComponent } from './pelicula/infopelicula/infopelicula.component';
import { TarifasComponent } from './pelicula/tarifas/tarifas.component';
import { ReservaComponent } from './reserva/reserva.component';
import { GetReservasComponent } from './reserva/get-reservas/get-reservas.component';

const routes:Routes=[
  { path: '', component:UserHomeComponent, pathMatch:'full'},
  { path: 'register', component:UserRegisterComponent},
  { path: 'login', component:UserLoginComponent},
  { path: 'home', component:UserHomeComponent},
  { path: 'crearPelicula', component:CrearpeliculaComponent},
  { path: 'crearPelicula/:id', component:CrearpeliculaComponent},
  { path: 'infopelicula/:id', component:InfopeliculaComponent},
  { path: 'tarifas', component:TarifasComponent},
  { path: 'reserva/:id', component:ReservaComponent},
  { path: 'reserva/:id/:idReserva', component:ReservaComponent},
  { path: 'reservasUsur/:id', component:GetReservasComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserHomeComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    CarouselComponent,
    PrincipalComponent,
    CrearpeliculaComponent,
    InfopeliculaComponent,
    TarifasComponent,
    ReservaComponent,
    GetReservasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
