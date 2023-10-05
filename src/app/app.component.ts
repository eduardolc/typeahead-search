import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, filter, map, of, switchMap } from 'rxjs';
import { mergeWith, tap } from 'rxjs/operators';

// tslint:disable-next-line:import-blacklist

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'typeahead-search';

  myInput = new FormControl();
  results = of([]).pipe(
    mergeWith(this.myInput.valueChanges),
    filter((v) => v.length > 2),
    debounceTime(300),
    map((v) => `https://swapi.dev/api/people/?search=${v}`),
    tap((url) => console.log(url)),
    switchMap((url) => this.http.get(url)),
    map((json: any) => json['results'])
  );

  constructor(private http: HttpClient) {}
}
