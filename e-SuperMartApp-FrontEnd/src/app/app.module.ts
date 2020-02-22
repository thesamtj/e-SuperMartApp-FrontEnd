import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Module imports
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { BlocksModule } from './blocks/blocks.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlocksModule,
    SharedModule,
    HttpClientModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
