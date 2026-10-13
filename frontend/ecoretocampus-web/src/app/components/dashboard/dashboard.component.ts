import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;
  
  retos = [
    {
      id: 1,
      title: 'Prueba de puntos',
      creator: 'EL ADMIN',
      difficulty: 'FÁCIL',
      category: 'RECICLAJE',
      description: 'Esta es una prueba de puntos',
      icon: '♻️'
    },
    {
      id: 2,
      title: 'Limpia el campus en equipo',
      creator: 'EL ADMIN',
      difficulty: 'DIFÍCIL',
      category: 'COMUNIDAD Y VOLUNTARIADO',
      description: 'Organiza durante el semestre jornadas de limpieza...',
      icon: '🌳'
    },
    {
      id: 3,
      title: 'Ahorra 20 litros de agua',
      creator: 'Pepe',
      difficulty: 'MEDIO',
      category: 'AHORRO DE AGUA',
      description: 'Registra durante dos meses el consumo de agua...',
      icon: '💧'
    },
    {
      id: 4,
      title: 'Recoge 5 botellas de plastico',
      creator: 'Ana',
      difficulty: 'FÁCIL',
      category: 'RECICLAJE',
      description: 'Recolecta 5 botellas PET en los contenedores...',
      icon: '🧴'
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    } else {

      this.user = { name: 'UserP1', points: 5, level: 0 };
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}