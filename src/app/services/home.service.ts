import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
cityName:string
isloaded:boolean = false;

  constructor(private http:HttpClient){}

  getDateTime(unixTimestampinmilisec){
    const dateObject = new Date(unixTimestampinmilisec)
    const humanDateFormat = dateObject.toLocaleString()
    const CurrentTime = dateObject.toLocaleString("en-us", {hour: "numeric",hour12: false})
   // console.log(CurrentTime);
    return CurrentTime
   }

  time(unixTimestampinmilisec){
    const dateObject = new Date(unixTimestampinmilisec)
    const humanDateFormat = dateObject.toLocaleString()
    const CurrentTime = dateObject.toLocaleString("en-us", {hour12: true}).slice(-11,-6)
    console.log(CurrentTime);
    return CurrentTime
   
  } 
   getLocation(reverselocation) {
    return this.http.get(reverselocation)
  }

  getTemp(weather){
   return this.http.get(weather)
   }

  pollution(pollurl){
   return this.http.get(pollurl)

   }

   getPosition(): Promise<any>
   {
     return new Promise((resolve, reject) => {
 
       navigator.geolocation.getCurrentPosition(resp => {
 
           resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
         },
         err => {
           reject(err);
         });
     });
 
   }
}

