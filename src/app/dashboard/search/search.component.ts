import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { filter, map, tap } from "rxjs/operators";
import { JobsService } from "./jobs.service";
import { FormControl } from "@angular/forms";
import { Job } from "../../shared/models/job.interface";
import { merge } from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [JobsService]
})
export class SearchComponent implements OnInit {
  public jobs: Job[] = [];
  public screen: { searchForm: { cols: string, gutter: string }, resultSection: { cols: string, gutter: string, colspan: string, rowHeight: string } } = {
    searchForm: {
      cols: '3',
      gutter: '10px'
    },
    resultSection: {
      cols: '6',
      gutter: '0',
      colspan: '5',
      rowHeight: '6:6'
    }
  };
  public description = new FormControl();
  public location = new FormControl();
  public type = new FormControl();

  constructor(private readonly _layout: BreakpointObserver, private readonly _jobs: JobsService) {
    const isSmallScreen = _layout.observe('(max-width: 767px)').pipe(
      filter(state => state.breakpoints['(max-width: 767px)']),
      map(state => ({
        searchForm: { cols: '1', gutter: '0' },
        resultSection: {
          cols: '4',
          gutter: '0',
          colspan: '3',
          rowHeight: '2:3'
        }
      }))
    );
    const isDesktopScreen = _layout.observe(['(min-width: 768px)', '(max-width: 1023px)']).pipe(
      filter(state => state.breakpoints['(min-width: 768px)'] && state.breakpoints['(max-width: 1023px)']),
      map(state => ({
        searchForm: { cols: '3', gutter: '10px' },
        resultSection: {
          cols: '6',
          gutter: '0',
          colspan: '5',
          rowHeight: '6:6'
        }
      }))
    );
    const isXLDesktop = _layout.observe('(min-width: 1024px)').pipe(
      filter(state => state.breakpoints['(min-width: 1024px)']),
      map(state => ({
        searchForm: { cols: '4', gutter: '15px' },
        resultSection: {
          cols: '6',
          gutter: '0',
          colspan: '5',
          rowHeight: '3:2'
        }
      }))
    );
    merge(isSmallScreen, isDesktopScreen, isXLDesktop).pipe(tap(screen => this.screen = screen)).subscribe();
  }

  ngOnInit(): void {
  }

  search(): void {
    this._jobs.get(this.description.value, this.location.value, this.type.value)
      .subscribe((jobs: Job[]) => this.jobs = jobs);
  }
}
