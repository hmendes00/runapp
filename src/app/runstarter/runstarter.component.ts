import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../weather.service';

@Component({
  selector: 'app-run-starter',
  templateUrl: './runstarter.component.html',
  styleUrls: ['./runstarter.component.css']
})
export class RunStarterComponent implements OnInit {
  maxHours: number[];
  maxMinutes: number[];
  fromHours = 15;
  fromMinutes = 0;
  toHours = 16;
  toMinutes = 0;
  infoMsg: string;
  infoMsgColor: string;
  constructor(private weatherService: WeatherService) {
    this.maxHours = Array(23).fill(1);
    this.maxMinutes = Array(60).fill(1);
  }

  ngOnInit() {
  }

  checkWeather() {
    const filter = new TimeObj(this.fromHours, this.fromMinutes, this.toHours, this.toMinutes);
    const result = this.weatherService.getWeather(filter);
    result.subscribe(forecasts => {
      if (forecasts.length) {
        const weather = forecasts[0].weather[0].main;
        if (forecasts.some(forecast => forecast.weather[0].main === 'Rain')) { // if exist any forecast with rain
          this.infoMsg = 'Oops.. It will rain. :(';
          this.infoMsgColor = 'label label-primary';
        } else {
          this.infoMsg = `You are good to go! :) - (${weather})`; // show also the first forecast
          this.infoMsgColor = 'label label-success';
        }
      }
    });
  }
}

export class TimeObj {
  fromHours: number;
  fromMinutes: number;
  toHours: number;
  toMinutes: number;
  constructor(fromHours, fromMinutes, toHours, toMinutes) {
    this.fromHours = fromHours;
    this.fromMinutes = fromMinutes;
    this.toHours = toHours;
    this.toMinutes = toMinutes;
  }

  getFromTimeAsDate() {
    const _date = new Date(Date.now());
    _date.setHours(this.fromHours);
    _date.setMinutes(this.fromMinutes);
    return _date;
  }

  getToTimeAsDate() {
    const _date = new Date(Date.now());
    _date.setHours(this.toHours);
    _date.setMinutes(this.toMinutes);
    return _date;
  }
}
