import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Watch } from '../model/watch';

// Generated using ChatGPT
@Component({
  selector: 'app-watch-card',
  templateUrl: './watch-card.component.html',
  styleUrls: ['./watch-card.component.css'],
})
export class WatchCardComponent {
  @Input({ required: true }) watch!: Watch;

  @Input() currencyCode: string = 'USD';

  onImgError(img: HTMLImageElement) {
    img.src = '';
    img.alt = 'image unavailable';
  }

  get waterResistanceMeters(): number | null {
    const bar = this.watch?.waterResistanceBar;
    return typeof bar === 'number' ? bar * 10 : null;
  }
}
