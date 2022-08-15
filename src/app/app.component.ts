import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CustemerApp';
  constructor(){
    // this.lang=localStorage.getItem("keyLanguage");
    // if(this.lang==="ar"){document.querySelector('input').style.textAlign="end";}
  }
  ngOnInit(): void {

  }

}
