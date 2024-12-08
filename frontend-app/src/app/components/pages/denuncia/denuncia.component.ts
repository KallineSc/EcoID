import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/api/denuncia';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DenunciaService } from 'src/app/service/denuncia.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
    templateUrl: './denuncia.component.html',
    providers: [MessageService]
})
export class DenunciaComponent implements OnInit {

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
        this.denunciaService.getDenuncias().then(data => this.denuncias = data);

        this.cols = [
            { field: 'ID', header: 'ID' },
            { field: 'titulo', header: 'titulo' },
            { field: 'descricao', header: 'descricao' },
            { field: 'latitude', header: 'latitude' },
            { field: 'longitude', header: 'longitude' }
        ];
    }

    openNew() {
        this.denuncia = {};
        this.submitted = false;
        this.denunciaDialog = true;
    }

    deleteSelectedDenuncias() {
        this.deleteDenunciasDialog = true;
    }

    // editDenuncia(denuncia: Denuncia) {
    //     this.denuncia = { ...denuncia };
    //     this.denunciaDialog = true;
    // }

    deleteDenuncia(denuncia: Denuncia) {
        this.deleteDenunciaDialog = true;
        this.denuncia = { ...denuncia };
    }

    confirmDeleteSelected() {
        this.deleteDenunciasDialog = false;
        
        // Processa cada denúncia selecionada
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
            })
            .catch((error) => {
                console.error('Erro geral ao excluir as denúncias:', error);
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao excluir algumas denúncias', life: 3000 });
            });
    
        this.selectedDenuncias = [];
    }
    

    confirmDelete() {
        this.deleteDenunciaDialog = false;
        this.denuncias = this.denuncias.filter(val => val.id !== this.denuncia.id);
        console.log(this.denuncias);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'denuncia Deleted', life: 3000 });
        this.denuncia = {};
    }

    hideDialog() {
        this.denunciaDialog = false;
        this.submitted = false;
    }

    getUserIdFromToken(): string | null {
        const token = localStorage.getItem('accessToken');
        console.error(token);
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
                console.log(this.denuncia);
                this.denunciaService.postDenuncias(this.denuncia)
                    .then(response => {
                        console.log('Denúncia salva com sucesso', response);
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Denúncia criada com sucesso', life: 3000 });
                        setTimeout(() => {
                            this.denunciaDialog = false;
                            this.denuncia = {};  
                            window.location.reload();  
                        }, 1500); 
                    })
                    .catch(error => {
                        console.error('Erro ao salvar a denúncia', error);
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar a denúncia', life: 3000 });
                    });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Usuário não autenticado.', life: 3000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos corretamente.', life: 3000 });
        }
    }    

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    // onGlobalFilter(table: Table, event: Event) {
    //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    // }
}
