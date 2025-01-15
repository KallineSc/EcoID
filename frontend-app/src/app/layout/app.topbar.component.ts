import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [MessageService] 
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router, private messageService: MessageService) { }

    handleLogout(): void {
        const token = localStorage.getItem('accessToken');
    
        if (token) {
          this.authService.logout(token).subscribe(
            () => {
              localStorage.removeItem('accessToken');
              this.messageService.add({severity:'success', summary:'Logout', detail:'Você foi desconectado com sucesso!'});
              this.router.navigate(['/auth/login']);
            },
            (error) => {
              this.messageService.add({severity:'error', summary:'Erro', detail: `Erro ao realizar logout: ${error.message || error}`});
            }
          );
        } else {
          this.messageService.add({severity:'error', summary:'Erro', detail: 'Usuário não está autenticado.'});
          this.router.navigate(['/auth/login']);
        }
    }
}
