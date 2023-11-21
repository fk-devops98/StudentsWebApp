import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule as Shared } from './shared/shared.module';
import { SharedModule } from 'primeng/api';
import { LoaderInterceptor } from './core/triggers/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [AppComponent],
    imports: [
        SharedModule,
        AppRoutingModule,
        Shared,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxSpinnerModule.forRoot({
            type: 'ball-spin-clockwise',
        }),
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
