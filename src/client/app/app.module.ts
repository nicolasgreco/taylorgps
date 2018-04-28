import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatGridListModule, MatListModule, MatFormFieldModule, MatSlideToggleModule, MatExpansionModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollEventModule } from 'ngx-scroll-event';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';

import { DataService } from './store/data.service';
import { TripService } from './services/trip-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { ShrinkDirective } from './shrink.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RouteListComponent,
    RouteDetailComponent,
    ShrinkDirective
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    FlexLayoutModule,
    MatListModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ScrollEventModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [DataService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
