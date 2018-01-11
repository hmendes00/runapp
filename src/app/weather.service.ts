import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { TimeObj } from './runstarter/runstarter.component';
const credentials = require('./../credentials.json');


@Injectable()
export class WeatherService {
  private baseUrl = 'http://api.openweathermap.org/data/2.5';
  constructor(private http: Http) { }

  getWeather(filter: TimeObj) {
    const endpoint = `${this.baseUrl}/forecast?q=Quebec,ca&appid=${credentials.openweather.apikey}`;
    return this.http
        .get(endpoint)
        .map(res => {
          const forecasts = res.json();
          const fromTime = filter.getFromTimeAsDate().getTime();
          const toTime = filter.getToTimeAsDate().getTime();
          const listOfWeather = forecasts.list.filter(forecast => {
            return forecast.dt >= Math.ceil(fromTime / 1000) && forecast.dt <= Math.ceil(toTime / 1000);
          });
          return listOfWeather;
        });
  }
}
