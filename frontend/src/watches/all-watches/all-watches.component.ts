import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { WatchService } from '../watch.service';
import { Watch } from '../model/watch';

@Component({
  selector: 'app-all-watches',
  templateUrl: './all-watches.component.html',
  styleUrl: './all-watches.component.css'
})
export class AllWatchesComponent implements OnInit {
  loading = true;
  watches: Watch[] = []

  constructor(private watchService: WatchService) {}

  ngOnInit(): void {
      this.watchService.getWatches().subscribe(
        (watches) => {
          this.watches = watches; 
          this.loading = false;
        }
      )
  }
}
