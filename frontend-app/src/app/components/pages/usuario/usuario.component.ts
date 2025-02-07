import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/api/usuario';
import { MessageService } from 'primeng/api';
import { UsuarioService } from 'src/app/service/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
    templateUrl: './usuario.component.html',
    providers: [MessageService]
})

export class UsuarioComponent implements OnInit {

    senhaDialog: boolean = false;
    senhaAtual: string = '';
    novaSenha: string = '';       
    confirmarSenha: string = '';
    // deleteDenunciaDialog: boolean = false;

    // deleteDenunciasDialog: boolean = false;

    // denuncias: Denuncia[] = [];

    usuario: Usuario = {};

    // selectedDenuncias: Denuncia[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    // statuses: any[] = [];

    // rowsPerPageOptions = [5, 10, 20];

    constructor(private usuarioService: UsuarioService, private messageService: MessageService) { }

    ngOnInit() {
        const userId = this.getUserIdFromToken();
        this.usuarioService.getUsuarioById(userId).then(data => this.usuario = data);

        this.cols = [
            { field: 'ID', header: 'ID' },
            { field: 'nome', header: 'nome' },
            { field: 'email', header: 'email' },
            { field: 'senha', header: 'senha' },
            { field: 'senhaAtual', header: 'senhaAtual' },
            { field: 'novaSenha', header: 'novaSenha' },
            { field: 'confirmarSenha', header: 'confirmarSenha' },
            
        ];
    }

    openSenhaDialog() {
        // this.usuario = {};
        this.submitted = false;
        this.senhaDialog = true;
    }


    updateSenha() {
        if (!this.senhaAtual || !this.novaSenha || !this.confirmarSenha) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos.',
                life: 3000
            });
            return;
        }
    
        if (this.novaSenha !== this.confirmarSenha) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'As senhas não coincidem.',
                life: 3000
            });
            return;
        }
    
        this.usuarioService.alterarSenha(this.usuario.id, this.senhaAtual, this.novaSenha, this.confirmarSenha)
        .subscribe({
            next: (response) => {
              const successMessage = response.response?.mensagem || 'Senha alterada com sucesso!!';
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: successMessage});
              setTimeout(() => {
                window.location.reload();  
              }, 1500);
            },
            error: (error) => {
              const errorMessage = error.error?.error || 'Erro desconhecido';
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: errorMessage});
            }
          });
    }

    // hideDialog() {
    //     this.denunciaDialog = false;
    //     this.submitted = false;
    // }

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

    saveUsuario() {
        this.submitted = true;
    
        if (this.usuario.nome?.trim() || this.usuario.email?.trim() || this.usuario.senha?.trim()) {
            if (this.usuario.id) {
                const usuarioAtualizado = { ...this.usuario };

                Object.keys(usuarioAtualizado).forEach(key => {
                    if (!usuarioAtualizado[key]?.trim()) {
                        delete usuarioAtualizado[key];
                    }
                });

                usuarioAtualizado.id = this.usuario.id;
                this.usuarioService.updateUsuario(usuarioAtualizado)
                    .then(response => {
                        console.log('Usuário atualizado com sucesso:', response);
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso', life: 3000 });
                        setTimeout(() => {
                            window.location.reload();  
                        }, 1500);
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar o usuário:', error);
                        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao atualizar o usuário', life: 3000 });
                    });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar o usuário', life: 3000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos corretamente.', life: 3000 });
        }
    }

}
