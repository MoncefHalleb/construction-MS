import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrl: './back.component.css'
})
export class BackComponent {
    constructor(private keycloakService: KeycloakService ) {}
  
  logout()
  {
    this.keycloakService.logout();
  }

}
