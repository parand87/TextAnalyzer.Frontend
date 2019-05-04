import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './components/settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoreModule } from './core';
import { StopwordsApiClientService } from './stopwords-api-client.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    CoreModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule
  ],
  providers: [StopwordsApiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
