import { Component } from '@angular/core';
import { Watch } from '../../watches/model/watch';
import { WatchService } from '../../watches/watch.service';

// Generated using ChatGPT
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  watches: Watch[] = [];
  loading = true;

  constructor(private watchService: WatchService) {}

  ngOnInit(): void {
    this.watchService.getTrendingWatches().subscribe({
      next: (data) => {
        console.log("Watches");
        console.log(data);
        this.watches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load trending watches', err);
        this.loading = false;
      }
    });
  }

}
