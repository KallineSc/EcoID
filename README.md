## 1. Subir o Backend

### Pré-requisitos

- **Docker**

- **Docker Compose**

### Passos para subir o Backend

1. **Navegue até a pasta do backend** do projeto:

    No terminal, entre no diretório onde está localizado o arquivo `docker-compose.yml`.

2. **Suba o backend com o comando abaixo**:

    Execute o seguinte comando para construir e rodar os containers Docker em segundo plano:

    ```bash
    docker compose up --build -d
    ```

## 2. Subir o Frontend com Angular

Agora, vamos configurar e rodar o **frontend** com **Angular**.

### Passos para subir o Frontend

1. **Instalar as dependências do projeto**:

    No terminal, dentro da pasta do frontend, execute o comando abaixo para instalar as dependências definidas no arquivo `package.json`:

    ```bash
    npm install
    ```

2. **Suba o servidor de desenvolvimento Angular**:

    Após instalar as dependências, execute o comando abaixo para iniciar o servidor de desenvolvimento do Angular:

    ```bash
    ng serve
    ```

    O Angular CLI irá compilar o projeto e iniciar o servidor local. Por padrão, o frontend estará acessível em:

    ```
    http://localhost:4200
    ```

    Acesse essa URL no seu navegador para visualizar a aplicação frontend.

    A rota de login do sistema pode ser acessada através da URL:
    ```
    http://localhost:4200/login
    ```
