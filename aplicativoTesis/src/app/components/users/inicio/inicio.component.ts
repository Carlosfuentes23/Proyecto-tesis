import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  id = localStorage.getItem("USER_ID");

  constructor() { 
    console.log(this.id);
  }

  ngOnInit(): void {
  }


}
