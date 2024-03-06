import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { protectedResources } from '../auth-config';

type WeatherForecast = {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string | null;
}

type WeatherForecastResult = {
  result: WeatherForecast[]
};

@Component({
  selector: 'app-webapi',
  templateUrl: './webapi.component.html',
  styleUrls: ['./webapi.component.css']
})
export class WebapiComponent implements OnInit {
  todoListEndpoint: string = protectedResources.api.endpoint;
  weatherForecast: WeatherForecastResult = {
    result: []
  };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get<WeatherForecastResult>(this.todoListEndpoint)
      .subscribe((profile) => {
        this.weatherForecast = profile;
      });
  }
}