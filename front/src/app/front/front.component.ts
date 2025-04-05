import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrl: './front.component.css'
})
export class FrontComponent {
    constructor(private keycloakService: KeycloakService ) {}
  
  logout()
  {
    this.keycloakService.logout();
  }
}
