import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemoteMfeModule } from './remote-mfe/remote-mfe.module';
import { HttpConfigInterceptor } from './interceptor/http-config-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ButtonComponent } from './components/ag-grid-custom-components/button/button.component';
import { ComponentModule } from './components/component.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComponentModule,
    BrowserModule,
    AppRoutingModule,
    RemoteMfeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      timeOut: 5000
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
