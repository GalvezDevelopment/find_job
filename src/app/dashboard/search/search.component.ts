import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { filter, map, tap } from "rxjs/operators";
import { merge } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public screen: { cols: string, gutter: string } = {
    cols: '3',
    gutter: '10px'
  };

  constructor(private readonly _layout: BreakpointObserver) {
    const isSmallScreen = _layout.observe('(max-width: 767px)').pipe(
      filter(state => state.matches),
      map(state => ({ cols: '1', gutter: '0' }))
    );
    const isLargeScreen = _layout.observe('(min-width: 768px)').pipe(
      filter(state => state.matches),
      map(state => ({ cols: '4', gutter: '10px' }))
    );
    merge(isSmallScreen, isLargeScreen).pipe(tap(screen => this.screen = screen)).subscribe();
  }

  ngOnInit(): void {
  }

}
