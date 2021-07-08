import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppInputComponent} from './app-input/app-input.component';
import {FormsModule} from "@angular/forms";
import {RenderService} from "../services/render.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    AppInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [ RenderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
