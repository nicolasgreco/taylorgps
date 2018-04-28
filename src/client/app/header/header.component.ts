import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';

@Component({
  selector: 'tg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  title: string;

  @Input('back-url')
  backUrl: string;

  @Input()
  fixed: boolean;

  @Input('background')
  background: boolean;

  @Input()
  elevation: boolean;

  color = 'primary';

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
