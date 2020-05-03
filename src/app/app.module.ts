import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TrailerComponent } from './trailer/trailer.component';
import { AoeDataComponent } from './aoe-data/aoe-data.component';
import { AoeItemComponent } from './aoe-item/aoe-item.component';
import { CivilizationsComponent } from './civilizations/civilizations.component';
import { UnitsComponent } from './units/units.component';
import { StructuresComponent } from './structures/structures.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { ModalFormComponent } from './modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrailerComponent,
    AoeDataComponent,
    AoeItemComponent,
    CivilizationsComponent,
    UnitsComponent,
    StructuresComponent,
    TechnologiesComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
