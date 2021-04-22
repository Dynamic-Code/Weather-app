import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  lat:any
  lon:any
  unixTimestampinmilisec:any
  CurrentTime:string
  description:any
  descriptionId:number
  city:any
  temp:number
  min_temp:number
  max_temp:number
  constructor(private homeservice:HomeService, private http:HttpClient) { }
  
  ngOnInit() {

   this.homeservice.getPosition().then(pos=>
    {
      function precise(x) {
        return Number.parseFloat(x).toPrecision(6);
      }

       this.lat = precise(pos.lat)
       this.lon = precise(pos.lng)

       const weather ='https://api.openweathermap.org/data/2.5/onecall?lat='+this.lat+'&lon='+this.lon+'&exclude=minutely,hourly,alerts&units=metric&appid=d7ad192a5b946fa61b1de0d7821d97fc'
       const reverselocation = 'https://api.openweathermap.org/geo/1.0/reverse?lat='+this.lat+'&lon='+this.lon+'&limit=5&appid=d7ad192a5b946fa61b1de0d7821d97fc'
      console.log(weather);

       this.homeservice.getTemp(weather).toPromise().then((data:any)=>{
        //  console.log(data);
            this.unixTimestampinmilisec=(data.current.dt) * 1000
            this.description=data.current.weather[0].main
            this.descriptionId=data.current.weather[0].id
            this.temp=data.current.temp
            this.min_temp=data.daily[0].temp.min
            this.max_temp=data.daily[0].temp.max
            this.CurrentTime = this.homeservice.getDateTime(this.unixTimestampinmilisec);
            console.log(this.descriptionId);
        });
       this.homeservice.getLocation(reverselocation).toPromise().then((data:any)=>{
        //console.log(data);
         this.city = data[0].name
      });
    });


    }    
   
  }




