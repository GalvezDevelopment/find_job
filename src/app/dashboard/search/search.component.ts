import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { filter, map, tap } from "rxjs/operators";
import { merge } from "rxjs";
import { JobsService } from "./jobs.service";
import { FormControl } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Job } from "../../shared/models/job.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [JobsService]
})
export class SearchComponent implements OnInit {
  public jobs: Job[] = [];
  public screen: { searchForm: { cols: string, gutter: string }, resultSection: { cols: string, gutter: string, colspan: string } } = {
    searchForm: {
      cols: '3',
      gutter: '10px'
    },
    resultSection: {
      cols: '6',
      gutter: '0',
      colspan: '5'
    }
  };
  public description = new FormControl();
  public location = new FormControl();
  public type = new FormControl();

  constructor(private readonly _layout: BreakpointObserver, private readonly _jobs: JobsService) {
    const isSmallScreen = _layout.observe('(max-width: 767px)').pipe(
      filter(state => state.matches),
      map(state => ({
        searchForm: { cols: '1', gutter: '0' },
        resultSection: {
          cols: '4',
          gutter: '0',
          colspan: '3'
        }
      }))
    );
    const isLargeScreen = _layout.observe('(min-width: 768px)').pipe(
      filter(state => state.matches),
      map(state => ({
        searchForm: { cols: '3', gutter: '10px' },
        resultSection: {
          cols: '6',
          gutter: '0',
          colspan: '5'
        }
      }))
    );
    merge(isSmallScreen, isLargeScreen).pipe(tap(screen => this.screen = screen)).subscribe();
  }

  ngOnInit(): void {
  }

  search(): void {
    this._jobs.get(this.description.value, this.location.value, this.type.value)
      .subscribe((jobs: Job[]) => this.jobs = jobs);
  }

  setType(state: MatCheckboxChange): void {
    this.type.setValue(state.source.value);
  }

}
