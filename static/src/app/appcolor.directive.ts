import { Directive, Renderer2, ElementRef,OnInit,Input } from '@angular/core';

@Directive({
  selector: '[appAppcolor]'
})
export class AppcolorDirective implements OnInit {
  constructor(private eleRef:ElementRef,  private renderer:Renderer2) { }

  ngOnInit(){
    this.renderer.setStyle(this.eleRef.nativeElement,'background-color','blue');

  }
}
