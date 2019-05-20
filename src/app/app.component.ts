import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAIeA_Zvl6BZilDp-dpZRr9wu1EMO1rvVw',
      authDomain: 'axial-sunup-222821.firebaseapp.com'
    });
  }
}
