import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap
} from 'rxjs/operators';

import { Series } from '../../shared/models/series';

import { OmdbapiService } from '../../shared/services/omdbapi.service';

import { MyErrorStateMatcher } from '../../app.component';
import { PredictSeries } from '../../shared/models/predictSeries';
import { TranslateService } from '@ngx-translate/core';
import { MatExpansionPanel } from '@angular/material';

/**
 * NewSeries Component
 * Component with form to add new series to list
 */
@Component({
  selector: 'app-new-series',
  templateUrl: './new-series.component.html',
  styleUrls: ['./new-series.component.less']
})
export class NewSeriesComponent implements OnInit {
  /**
   * Form control to name input
   *
   * Check if name is required
   */
  nameControl: FormControl = new FormControl('', [Validators.required]);
  /**
   * Form control to season input
   *
   * Check if season is required and a number
   */
  tempControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  /**
   * Form control to episode input
   *
   * Check if episode is required and a number
   */
  epiControl: FormControl = new FormControl('', [
    Validators.required
  ]);
  /**
   * Used to check if formcontrols have errors
   */
  matcher = new MyErrorStateMatcher();

  /**
   * Array with pairs of ID-TITLE fetched by OMDBAPI
   */
  predictSeries: Array<PredictSeries>;

  /**
   * Used to set nightMode
   */
  @Input() nightMode: string;

  /**
   * Used to emit the new Series added
   */
  @Output() series: EventEmitter<Series> = new EventEmitter();

  /**
   * Constructor
   * @param omdbAPI {OmdbApiService} Call the API to fetch series titles and iMDB IDs
   */
  constructor(private omdbAPI: OmdbapiService, private translate: TranslateService) {
    this.translate.use(localStorage.getItem('lang'));
  }

  /**
   * On init 'put' a 'watcher' to SeriesName input to call the API 'OnTheGo',
   * waiting 1sec between inputs and if the input is more than 3 chars.
   * Gets the Titles and IDs from the API and fill the arrays
   */
  ngOnInit() {
    this.nameControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((query: string) => query.trim().length > 2 || query.trim().length === 0),
        switchMap((query: string) =>
          this.omdbAPI.getSeriesTitleOMDB('*' + query.trim() + '*')
        )
      )
      .subscribe(
        (response: any) => {
          this.predictSeries = [];
          if (response.Search) {
            response.Search.forEach((element: any) => {
              this.predictSeries.push(
                new PredictSeries(element.imdbID, element.Title)
              );
            });
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  /**
   * When user click on Insert button, emit the series to list
   * @param elName Series' Name
   * @param elTemp Series' Season
   * @param elEpi Series' Episode
   */
  createSeries(elName: string, elTemp: number, elEpi: number, mep: MatExpansionPanel): void {
    let imdbID: string;
    if (this.predictSeries === undefined) {
      imdbID = undefined;
    } else {
      this.predictSeries.forEach(element => {
        if (element.title === elName) {
          imdbID = element.id;
        }
      });
    }
    if (imdbID === undefined) {
      imdbID = Math.floor(Math.random() * 10000).toString();
    }
    const active = elEpi > 0 ? true : false;
    const newSeries = new Series(imdbID, active, elName, elTemp, elEpi);
    this.series.emit(newSeries);

    this.nameControl.setValue(' ');
    this.tempControl.setValue(0);
    this.epiControl.setValue(0);
    mep.close();
  }
}
