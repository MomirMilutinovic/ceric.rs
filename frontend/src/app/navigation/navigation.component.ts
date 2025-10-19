import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);
  navigationShouldBeShown: boolean = false;

  isSmall$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    // https://stackoverflow.com/a/45737376
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.navigationShouldBeShown = !data.state.root.firstChild?.data["hideNavbar"];
      }
    });
  }

  userHasRole(role: string): boolean {
    return this.authService.getRoles().includes(role);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
