import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  OnDestroy,
  NgZone,
  ChangeDetectionStrategy
} from '@angular/core';

import { Grid, HighlightPlugin } from '../../../public/grid/src/index.js';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-fast-grid',
  imports: [CommonModule],
  templateUrl: './fast-grid.html',
  styleUrl: './fast-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FastGrid implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  private grid!: Grid;

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.grid = new Grid(this.host.nativeElement, {
        data: this.data,
        columns: this.columns,
        rowHeight: 32,
        defaultColWidth: 120
      });
    });
  }

  ngOnDestroy() {
    this.grid?.destroy();
  }
}