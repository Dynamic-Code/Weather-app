import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  url='https://api.unsplash.com/search/photos?query=%27rainy,sky%27&client_id=pOEt5wvoFKYJZ9Lk2ci7jWcsO7EIrb4COBQwwIzQ_cc'
  image='https://source.unsplash.com/1920x1080/?rain';
  //image=''
  constructor(private http:HttpClient){

  }
  ngOnInit(){
    console.log(this.image);
    
  //    this.http.get(this.url)
  //    .subscribe((data:any)=>{
  //      console.log(data.results[0].urls.full);
  //      this.image = data.results[4].urls.full;
  //    })
    }
}

