# Task Manager API

## Descrição

Esta é uma API de gerenciamento de tarefas desenvolvida usando Node.js, TypeScript, Prisma, NestJS, e PostgreSQL. A API permite criar, listar e atualizar tarefas com diferentes status. A arquitetura segue os princípios da arquitetura hexagonal.

## Requisitos

- Node.js (versão 18.x ou superior)
- PostgreSQL (versão 14.x ou superior)

## Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/task-manager.git
   cd task-manager
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o banco de dados**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskmanager"
   ```

   Substitua `usuario` e `senha` pelas credenciais do seu banco de dados PostgreSQL.

4. **Execute as migrações do Prisma**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor**

   ```bash
   npm run start
   ```

   O servidor será iniciado na porta 3000 por padrão.

## Endpoints da API

### Criar uma tarefa

- **Endpoint:** `POST /tasks`
- **Descrição:** Cria uma nova tarefa.
- **Entrada:**

  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```

- **Saída:**

  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "PENDING",
    "createdAt": "timestamp"
  }
  ```

### Listar todas as tarefas

- **Endpoint:** `GET /tasks`
- **Descrição:** Lista todas as tarefas.
- **Saída:**

  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "PENDING | IN_PROGRESS | DONE"
    }
  ]
  ```

### Atualizar o status de uma tarefa

- **Endpoint:** `PATCH /tasks/:id/status`
- **Descrição:** Atualiza o status de uma tarefa existente.
- **Entrada:**

  ```json
  {
    "status": "PENDING | IN_PROGRESS | DONE"
  }
  ```

- **Saída:**

  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "PENDING | IN_PROGRESS | DONE",
    "createdAt": "timestamp"
  }
  ```

## Swagger

A documentação interativa da API está disponível em [http://localhost:3000/api](http://localhost:3000/api).

## Testes

Para executar os testes, use o comando:

```bash
npm run test
```
