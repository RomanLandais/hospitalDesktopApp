import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ComServerService } from '../shared/services/com-server.service';
import { TokenService } from '../shared/services/token.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private comServerService: ComServerService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Connexion
  onSignInSubmit() {
    this.comServerService
      .sendDataLogin(this.signInForm.value, 'signInDesktop')
      .subscribe({
        next: (response) => {
          // Extraire le token CSRF de la réponse et le stocker dans le service
          const token = response.token;
          this.tokenService.setCsrfToken(token);

          // Récupérer l'identifiant de l'utilisateur depuis la réponse et le stocker dans le service
          const userId = response.userId;
          this.tokenService.setUserId(userId);

          // Rediriger vers le composant ConsultationComponent après une connexion réussie
          this.router.navigate(['/entry']);
        },

        error: (error) => {
          console.error('Error:', error);
          if (error.status === 401) {
            if (
              error.error &&
              error.error.error ===
                'Accès refusé. Seuls les secrétaires peuvent se connecter.'
            ) {
              alert(
                'Accès refusé. Seuls les secrétaires peuvent se connecter.'
              );
            } else {
              alert(
                'Utilisateur non trouvé ou mot de passe incorrect. Veuillez réessayer.'
              );
            }
          } else {
            if (error.error) {
              console.error('Error details:', error.error);
            }
          }
        },
        complete: () => alert('Connecté avec succès'),
      });
  }
}
