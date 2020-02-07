import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@core/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  user: User

  @Output()
  logoutEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.logoutEvent.emit();
  }

}
