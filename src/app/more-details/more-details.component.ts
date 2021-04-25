import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.sass']
})
export class MoreDetailsComponent implements OnInit {
  lon: any;
  lat: any;
  aqi: number;
  clouds: any;
  humidity: any;
  maxuv: any;
  pressure: any;
  sunrise: any;
  sunset: any;
  visibility: any;
  aqides:any

  constructor(private homeservice:HomeService) { }

  ngOnInit(): void {
    this.homeservice.getPosition().then(pos=>
     {
      function precise(x) {
        return Number.parseFloat(x).toPrecision(6)
        
      }
      this.lat = precise(pos.lat)
      this.lon = precise(pos.lng)

      
      const weather ='https://api.openweathermap.org/data/2.5/onecall?lat='+this.lat+'&lon='+this.lon+'&exclude=minutely,hourly,alerts&units=metric&appid=d7ad192a5b946fa61b1de0d7821d97fc'
      const pollution = 'http://api.openweathermap.org/data/2.5/air_pollution?lat='+this.lat+'&lon='+this.lon+'&appid=d7ad192a5b946fa61b1de0d7821d97fc'
      this.homeservice.getTemp(weather).toPromise().then((data:any)=>{
        this.sunrise = this.homeservice.time((data.current.sunrise) * 1000);
        this.sunset = this.homeservice.time((data.current.sunset) * 1000);
        this.maxuv = data.current.uvi
        this.pressure = data.current.pressure
        this.humidity = data.current.humidity
        this.clouds = data.current.clouds
        this.visibility = data.current.visibility/1000

      })

      this.homeservice.pollution(pollution).toPromise().then((data:any)=>{
        this.aqi = data.list[0].main.aqi        
        switch(this.aqi){
          case 1:
            this.aqides = 'Good'
            break;
  
          case 2:
            this.aqides = 'Fair'
            break;
  
          case 3:
            this.aqides = 'Moderate'
            break;
          
          case 4:
            this.aqides = 'Poor'
            break;
            
          case 5:
            this.aqides = 'Very Poor'
            break;
            
          default:
            this.aqides = 'No Data'
            break;
        }
        return this.aqides
      })
      
    }
  )}

}
