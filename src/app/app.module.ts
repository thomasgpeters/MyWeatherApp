import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherListComponent } from './weather/weather-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './home/welcome/welcome.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherListComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'weather', component: WeatherListComponent },
      { path: 'weather/:zip', component: WeatherComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
