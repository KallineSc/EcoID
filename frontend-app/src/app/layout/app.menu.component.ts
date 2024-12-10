import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Páginas',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
                    { label: 'Denúncias', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/pages/denuncia'] }
                    // pi pi-fw pi-pencil
                ]
            }
        ];
    }
}
