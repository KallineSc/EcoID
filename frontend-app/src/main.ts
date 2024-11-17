import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Modifique o appConfig para incluir provideHttpClient
bootstrapApplication(AppComponent, {
  ...appConfig,  // Mantenha todas as configurações existentes
  providers: [
    ...appConfig.providers || [],  // Garantir que qualquer configuração existente seja mantida
    provideHttpClient(withFetch()) // Adiciona a configuração do fetch para o HttpClient
  ]
})
  .catch((err) => console.error(err));