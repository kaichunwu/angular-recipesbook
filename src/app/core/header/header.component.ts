import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
   templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {}

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response) => console.log(response)
    );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signup']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
