import { Component, OnInit } from '@angular/core';
import {animate, group, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('divState',[
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(500)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', group([
        style({
          backgroundColor: 'orange',
          borderRadius: '0'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500),
      ])),
    ]),
    trigger('wildState',[
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(500, keyframes([
        style({
          backgroundColor: 'red',
          transform: 'translateX(50px) scale(1)'
        }),
        style({
          backgroundColor: 'blue',
          transform: 'translateX(80px) scale(1)'
        })
      ]))),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
          borderRadius: '0'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500),
      ]),
    ])
  ]
})
export class HomeComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';

  constructor() { }

  ngOnInit() {
  }

  onAnimation() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
    this.state = 'shrunken';
  }

  animationStarted(event) {
    console.log(event);
  }
}
