import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {

  @ViewChild('blur') blur:ElementRef;
  @ViewChild('principal') principal:ElementRef;
  firstIteration = true;

  constructor() { }

  ngOnInit(): void {
  }

  pause(){
    if(this.firstIteration){
      this.firstIteration = false;
    }
    this.replay(this.blur.nativeElement);
    this.replay(this.principal.nativeElement);
  }

  update(){
    if(!this.firstIteration){
      if((<HTMLVideoElement>this.blur.nativeElement).currentTime >= 56){
        this.pause();
      }
    }
  }

  private replay(video:HTMLVideoElement){
    video.currentTime = 20;
    video.play();
  }
}
