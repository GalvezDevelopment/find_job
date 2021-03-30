import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isSmallScreen: Observable<boolean>;
  public isLargeScreen: Observable<boolean>;

  constructor(private readonly _layout: BreakpointObserver) {
    this.isSmallScreen = _layout.observe('(max-width: 767px)').pipe(map(state => state.matches));
    this.isLargeScreen = _layout.observe('(min-width: 768px)').pipe(map(state => state.matches));
  }

  ngOnInit(): void {
  }

}
