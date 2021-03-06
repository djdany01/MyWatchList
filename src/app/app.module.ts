import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule
} from '@angular/common/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';

import { ShareButtonsModule } from '@ngx-share/buttons';
import { ShareButtonsOptions } from '@ngx-share/core';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { IntroComponent } from './components/intro/intro.component';
import { ListShareComponent } from './components/list-share/list-share.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
// import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { NewSeriesComponent } from './components/new-series/new-series.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { Error404Component } from './shared/error-404/error-404.component';

import { LoginDialog } from './components/intro/login-dialog/login.dialog';
import { RememberDialog } from './components/intro/remember-dialog/remember.dialog';
import { DeleteDialog } from './components/profile/delete-dialog/delete.dialog';
import { EditDialog } from './components/list/edit-dialog/edit-series.dialog';

import { AppRoutingModule } from './shared/routes/app-routing.module';

import { TWITTER_ACCOUNT } from './shared/constants/api-keys.constants';
import { environment } from '../environments/environment';

/**
 * Options to SharedButtons Module
 */
const shareOptions: ShareButtonsOptions = {
  gaTracking: true,
  twitterAccount: TWITTER_ACCOUNT
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginDialog,
    RememberDialog,
    IntroComponent,
    EditDialog,
    DeleteDialog,
    ListShareComponent,
    ProfileComponent,
    ConfirmEmailComponent,
    // SeriesDetailsComponent,
    NewSeriesComponent,
    Error404Component,
    RegisterFormComponent,
    FeedbackFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule, // for share counts and translator
    HttpClientJsonpModule, // for linkedin and tumblr share counts
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ShareButtonsModule.forRoot({ options: shareOptions }),
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    NgProgressModule.forRoot({
      thick: true,
      color: '#673ab7',
      spinnerPosition: 'left'
    }),
    NgProgressHttpModule,
    NgProgressRouterModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListComponent,
    EditDialog,
    IntroComponent,
    LoginDialog,
    RememberDialog,
    ListShareComponent,
    DeleteDialog
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

// required for AOT compilation with Translate
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
