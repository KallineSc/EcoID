import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DenunciaService } from 'src/app/service/denuncia.service';
import { jwtDecode } from 'jwt-decode';
import { from } from 'rxjs';
import * as L from 'leaflet';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    map!: L.Map;

    getUserIdFromToken(): string | null {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);  
                return decoded.sub; 
            } catch (error) {
                console.error('Erro ao decodificar o token', error);
                return null;
            }
        }
        return null; 
    }

    constructor(public layoutService: LayoutService, private denunciaService: DenunciaService ) {
    }

    ngOnInit() {
        this.map = L.map('map').setView([-3.880145, -38.597317], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.loadDenuncias();
    }


    private loadDenuncias() {
        const userId = this.getUserIdFromToken();

        L.Marker.prototype.options.icon = L.icon({
            iconUrl: 'assets/leaflet/images/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png', // Ícone em alta resolução
            shadowUrl: 'assets/leaflet/images/marker-shadow.png', // Se você quiser usar sombra também
          
            // Define o tamanho do ícone
            iconSize: [25, 41], // Largura e altura do ícone, em pixels
          
            // Define o ponto de ancoragem (onde o ícone será "preso")
            iconAnchor: [12, 41], // Posição no ícone, de modo que a base do ícone fique no marcador
          
            // Define o ponto de ancoragem do popup
            popupAnchor: [1, -34], // Se você usar popups, é possível ajustar a posição do texto
          });

        from(this.denunciaService.getDenuncias(userId)).subscribe(denuncias => {
            denuncias.forEach(denuncia => {
                L.marker([denuncia.latitude, denuncia.longitude])
                    .addTo(this.map)
                    .bindPopup(`<b>Denúncia:</b> ${denuncia.descricao}`);
            });
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
