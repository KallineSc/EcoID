import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/api/denuncia';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DenunciaService } from 'src/app/service/denuncia.service';

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

    constructor(private denunciaService: DenunciaService, private messageService: MessageService) { }

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

    // openNew() {
    //     this.denuncia = {};
    //     this.submitted = false;
    //     this.denunciaDialog = true;
    // }

    // deleteSelectedDenuncias() {
    //     this.deleteDenunciasDialog = true;
    // }

    // editDenuncia(denuncia: Denuncia) {
    //     this.denuncia = { ...denuncia };
    //     this.denunciaDialog = true;
    // }

    // deleteDenuncia(denuncia: Denuncia) {
    //     this.deleteDenunciaDialog = true;
    //     this.denuncia = { ...denuncia };
    // }

    // confirmDeleteSelected() {
    //     this.deleteDenunciasDialog = false;
    //     this.denuncias = this.denuncias.filter(val => !this.selectedDenuncias.includes(val));
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Denúncias deletadas', life: 3000 });
    //     this.selectedDenuncias = [];
    // }

    // confirmDelete() {
    //     this.deleteProductDialog = false;
    //     this.products = this.products.filter(val => val.id !== this.product.id);
    //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //     this.product = {};
    // }

    // hideDialog() {
    //     this.denunciaDialog = false;
    //     this.submitted = false;
    // }

    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.code = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             // @ts-ignore
    //             this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
    //             this.products.push(this.product);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }

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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
