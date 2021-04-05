import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  get allowPadding(): boolean {
    return this._layout.isMatched('(min-width: 1023px');
  }

  constructor(private readonly _layout: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

}
