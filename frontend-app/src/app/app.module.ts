import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DenunciaService } from './service/denuncia.service';
import { UsuarioService } from './service/usuario.service';
import { ClassificacaoService } from './service/classificacao.service';
import { AuthService } from './service/auth.service';
import { IconService } from './service/icon.service';
import { RelatorioService } from './service/relatorio.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        IconService, 
        DenunciaService, 
        UsuarioService, 
        ClassificacaoService,
        AuthService,
        RelatorioService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
