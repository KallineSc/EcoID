import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Denuncia } from 'src/app/api/denuncia';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DenunciaService } from 'src/app/service/denuncia.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
    templateUrl: './denuncia.component.html',
    providers: [MessageService]
})
export class DenunciaComponent implements OnInit {

    @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
    map!: L.Map;
    marker!: L.Marker;
    mapInitialized: boolean = false;

    denunciaDialog: boolean = false;
    deleteDenunciaDialog: boolean = false;
    deleteDenunciasDialog: boolean = false;
    denuncias: Denuncia[] = [];
    denuncia: Denuncia = {};
    selectedDenuncias: Denuncia[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private denunciaService: DenunciaService, private messageService: MessageService, private router: Router) { }

    ngOnInit() {
        const userId = this.getUserIdFromToken();
        this.denunciaService.getDenuncias(userId).then(data => this.denuncias = data);

        this.cols = [
            { field: 'ID', header: 'ID' },
            { field: 'titulo', header: 'titulo' },
            { field: 'descricao', header: 'descricao' },
            { field: 'latitude', header: 'latitude' },
            { field: 'longitude', header: 'longitude' }
        ];
    }

    initializeMap() {
        if (!this.mapContainer || !this.mapContainer.nativeElement) {
            console.error("Elemento mapContainer não encontrado!");
            return;
        }
        this.map = L.map(this.mapContainer.nativeElement).setView([-3.880145, -38.597317], 10);
        L.Marker.prototype.options.icon = L.icon({
            iconUrl: 'assets/leaflet/images/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png', 
                    
            iconSize: [25, 41], 
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.map.on('click', (event: any) => {
            const { lat, lng } = event.latlng;
            this.denuncia.latitude = lat;
            this.denuncia.longitude = lng;

            if (this.marker) {
                this.marker.setLatLng([lat, lng]);
            } else {
                this.marker = L.marker([lat, lng]).addTo(this.map);
            }
        });

        this.map.invalidateSize();
    }
    
    openNew() {
        this.denuncia = {};
        this.submitted = false;
        this.denunciaDialog = true;
        this.marker = null;

        setTimeout(() => {
            this.initializeMap();
        }, 200); 
    }

    deleteSelectedDenuncias() {
        this.deleteDenunciasDialog = true;
    }

    editDenuncia(denuncia: Denuncia) {
        this.denuncia = { ...denuncia };
        this.denunciaDialog = true;
    }

    deleteDenuncia(denuncia: Denuncia) {
        this.deleteDenunciaDialog = true;
        this.denuncia = { ...denuncia };
    }

    confirmDeleteSelected() {
        this.deleteDenunciasDialog = false;
        
        const deletePromises = this.selectedDenuncias.map((denuncia) => {
            return this.denunciaService.deleteDenuncia(denuncia.id).then(
                (response) => {
                    console.log('Denúncia excluída com sucesso:', denuncia.id);
                },
                (error) => {
                    console.error('Erro ao excluir a denúncia:', denuncia.id, error);
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Falha ao excluir a denúncia ${denuncia.id}`, life: 3000 });
                }
            );
        });
    
        Promise.all(deletePromises)
            .then(() => {
                this.denuncias = this.denuncias.filter(val => !this.selectedDenuncias.includes(val));
                console.log('Denúncias restantes:', this.denuncias);
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Denúncias deletadas', life: 3000 });
                setTimeout(() => {
                    window.location.reload();  
                }, 1000);
            })
            .catch((error) => {
                console.error('Erro geral ao excluir as denúncias:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir algumas denúncias', life: 3000 });
            });
    
        this.selectedDenuncias = [];
    }
    

    confirmDelete() {
        this.deleteDenunciaDialog = false; 
    
        if (this.denuncia.id) {
            this.denunciaService.deleteDenuncia(this.denuncia.id).then(
                (response) => {
                    console.log('Denúncia excluída com sucesso:', this.denuncia.id);
                    this.denuncias = this.denuncias.filter(val => val.id !== this.denuncia.id);
                    console.log('Denúncias restantes:', this.denuncias);
    
                    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Denúncia excluída', life: 3000 });

                    this.denuncia = {};
                },
                (error) => {
                    console.error('Erro ao excluir a denúncia:', error);
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir a denúncia', life: 3000 });
                }
            );
        } else {
            console.error('ID da denúncia não encontrado.');
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Denúncia inválida', life: 3000 });
        }
    }
    

    hideDialog() {
        this.denunciaDialog = false;
        this.submitted = false;
    }

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

    saveDenuncia() {
        this.submitted = true;
    
        if (this.denuncia.titulo?.trim() && this.denuncia.descricao?.trim() && this.denuncia.latitude && this.denuncia.longitude) {
            const userId = this.getUserIdFromToken();
            
            if (userId) {
                this.denuncia.usuario_id = userId;
    
                if (this.denuncia.id) {
                    this.denunciaService.updateDenuncia(this.denuncia)
                        .then(response => {
                            console.log('Denúncia atualizada com sucesso:', response);
                            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Denúncia atualizada com sucesso', life: 3000 });
                            setTimeout(() => {
                                this.denunciaDialog = false;
                                this.denuncia = {};  
                                window.location.reload();  
                            }, 1500);
                        })
                        .catch(error => {
                            console.error('Erro ao atualizar a denúncia:', error);
                            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar a denúncia', life: 3000 });
                        });
                } else {
                    this.denunciaService.postDenuncias(this.denuncia)
                        .then(response => {
                            console.log('Denúncia salva com sucesso:', response);
                            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Denúncia criada com sucesso', life: 3000 });
                            setTimeout(() => {
                                this.denunciaDialog = false;
                                this.denuncia = {};  
                                window.location.reload();  
                            }, 1500);
                        })
                        .catch(error => {
                            console.error('Erro ao salvar a denúncia:', error);
                            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a denúncia', life: 3000 });
                        });
                }
            } else {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não autenticado.', life: 3000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos corretamente.', life: 3000 });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        const value = (event.target as HTMLInputElement).value.trim().toLowerCase(); 
        table.filterGlobal(value, 'contains'); 
    }
}
