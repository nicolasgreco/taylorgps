import {Directive, HostListener, ElementRef, Renderer2, OnInit, OnDestroy, Input} from '@angular/core';

@Directive({
  selector: '[tgShrink]'
})
export class ShrinkDirective implements OnInit, OnDestroy {

  private lastScrollYPosition = 0;
  private height;
  private listenerFn;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @Input()
  tgShrink: any;

  ngOnInit() {
    this.tgShrink = this.tgShrink.replace(/'/g, '"');
    this.tgShrink = JSON.parse(this.tgShrink);
    this.height = this.element.nativeElement.offsetHeight;
    //this.renderer.setStyle(this.element.nativeElement, 'position', 'fixed');
    //this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform .2s');
    const $elementScroll = this.element.nativeElement.ownerDocument.querySelector(this.tgShrink.host);
    this.listenerFn = this.renderer.listen($elementScroll, 'scroll', ($event) => {

      if ((<any>$event.currentTarget).scrollTop < this.tgShrink.offset) {
        this.renderer.removeClass(this.element.nativeElement, 'DOWN');
        this.renderer.removeClass(this.element.nativeElement, 'UP');
        return false;
      }

      if ((<any>$event.currentTarget).scrollTop > this.lastScrollYPosition) {
        this.renderer.removeClass(this.element.nativeElement, 'DOWN');
        this.renderer.addClass(this.element.nativeElement, 'UP');
      } else if ((<any>$event.currentTarget).scrollTop < this.lastScrollYPosition) {
        this.renderer.removeClass(this.element.nativeElement, 'UP');
        this.renderer.addClass(this.element.nativeElement, 'DOWN');
      }

      this.lastScrollYPosition = (<any>$event.currentTarget).scrollTop;
    });
  }

  ngOnDestroy() {
    if (this.listenerFn)
      this.listenerFn();
  }

}
