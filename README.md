# AI Chat Agent API

Uma API RESTful para gerenciamento de catálogo de veículos, integrada com inteligência artificial para buscas inteligentes em português.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Fastify** como framework web
- **Drizzle ORM** para interação com banco de dados PostgreSQL
- **Zod** para validação de esquemas
- **OpenAI** para processamento de linguagem natural nas buscas
- **Docker** para containerização do banco de dados

## Funcionalidades

- **CRUD de Carros**: Criar e listar veículos no catálogo
- **Busca Inteligente**: Utiliza IA para interpretar consultas em linguagem natural e filtrar carros
- **Validação Robusta**: Schemas Zod garantem integridade dos dados
- **CORS Habilitado**: Suporte a requisições cross-origin

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Conta OpenAI com API Key

### Passos de Instalação

1. **Clone o repositório:**

   ```bash
   git clone <url-do-repositorio>
   cd aichatagent
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=3333
   DATABASE_URL=postgresql://docker:docker@localhost:5432/apiagent
   NODE_ENV=development
   OPENAI_API_KEY=sua-chave-openai-aqui
   MODEL_NAME=gpt-4o-mini
   ```

4. **Inicie o banco de dados:**

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco:**
   ```bash
   npx drizzle-kit push
   ```

## Como Rodar

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start
```

A API estará disponível em `http://localhost:3333`

## Estrutura do Projeto

```
src/
├── app.ts                 # Configuração principal da aplicação Fastify
├── server.ts              # Ponto de entrada do servidor
├── config/
│   └── env.ts             # Validação e carregamento de variáveis de ambiente
├── infra/
│   └── database/
│       ├── client.ts      # Conexão com o banco de dados
│       └── schemas/
│           ├── cars.ts    # Schema da tabela de carros
│           └── index.ts   # Exportação dos schemas
└── modules/
    └── cars/
        ├── cars.controllers.ts    # Controladores da API
        ├── cars.routes.ts         # Definição das rotas
        ├── cars.schema.ts         # Schemas Zod para validação
        ├── repository/
        │   ├── cars.repository.ts # Implementação do repositório
        │   └── schema.ts          # Interface do repositório
        ├── search/
        │   ├── search-query-builder.ts  # Construtor de queries
        │   └── agent/
        │       ├── ai-search-agent.ts   # Agente de busca com IA
        │       ├── tools/
        │       │   └── search-cars-tool.ts  # Ferramenta para busca
        │       └── utils/
        │           └── json-to-search.ts    # Utilitário de conversão
        └── useCases/
            ├── create-car-usecase.ts   # Caso de uso para criar carro
            ├── getall-car-usecase.ts   # Caso de uso para listar carros
            └── search-cars-usecase.ts  # Caso de uso para busca
```

## API Endpoints

### Base URL

```
http://localhost:3333
```

### 1. Listar Todos os Carros

**GET** `/cars`

Retorna uma lista de todos os carros cadastrados.

**Resposta de Sucesso (200):**

```json
[
  {
    "id": "uuid",
    "brand": "Toyota",
    "model": "Corolla",
    "version": "XLi 1.8",
    "year": 2020,
    "price": "85000.00",
    "fuel": "Gasolina",
    "transmission": "Manual",
    "mileage": 45000,
    "imageUrl": "https://example.com/car.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Criar um Novo Carro

**POST** `/cars`

Cria um novo veículo no catálogo.

**Corpo da Requisição:**

```json
{
  "brand": "Honda",
  "model": "Civic",
  "version": "EX 2.0",
  "year": 2022,
  "price": "95000.00",
  "fuel": "Gasolina",
  "transmission": "Automática",
  "mileage": 15000,
  "imageUrl": "https://example.com/civic.jpg"
}
```

**Campos obrigatórios:** `brand`, `model`, `version`, `year`, `price`, `fuel`, `transmission`, `mileage`, `imageUrl`

**Resposta de Sucesso (201):**

```json
[
  {
    "id": "uuid-gerado",
    "brand": "Honda",
    "model": "Civic",
    "version": "EX 2.0",
    "year": 2022,
    "price": "95000.00",
    "fuel": "Gasolina",
    "transmission": "Automática",
    "mileage": 15000,
    "imageUrl": "https://example.com/civic.jpg",
    "createdAt": "2024-04-08T12:00:00.000Z",
    "updatedAt": "2024-04-08T12:00:00.000Z"
  }
]
```

### 3. Buscar Carros com IA

**POST** `/cars/search`

Realiza uma busca inteligente utilizando processamento de linguagem natural. A IA interpreta a consulta em português e filtra os carros com base nos critérios mencionados.

**Corpo da Requisição:**

```json
{
  "search": "quero um carro honda civic usado com menos de 20 mil km"
}
```

**Resposta de Sucesso (201):**

```json
{
  "items": [
    {
      "id": "uuid",
      "brand": "Honda",
      "model": "Civic",
      "version": "EX 2.0",
      "year": 2022,
      "price": "95000.00",
      "fuel": "Gasolina",
      "transmission": "Automática",
      "mileage": 15000,
      "imageUrl": "https://example.com/civic.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Encontramos um Honda Civic EX 2.0 de 2022 com apenas 15 mil quilômetros rodados. É uma excelente opção com transmissão automática e preço competitivo."
}
```

**Exemplos de Consultas de Busca:**

- "carros toyota corolla ano 2020"
- "veículos com menos de 50 mil km"
- "honda civic gasolina automática"
- "carros entre 80 e 100 mil reais"

## Modelos de Dados

### Carro (CarDTO)

```typescript
{
  id: string; // UUID gerado automaticamente
  brand: string; // Marca do veículo (ex: Toyota, Honda)
  model: string; // Modelo (ex: Corolla, Civic)
  version: string; // Versão/Trim (ex: XLi 1.8, EX 2.0)
  year: number; // Ano de fabricação
  price: string; // Preço em formato string (ex: "85000.00")
  fuel: string | null; // Tipo de combustível
  transmission: string | null; // Tipo de transmissão
  mileage: number | null; // Quilometragem
  imageUrl: string | null; // URL da imagem
  createdAt: string; // Data de criação (ISO 8601)
  updatedAt: string; // Data de atualização (ISO 8601)
}
```

## Tratamento de Erros

A API retorna erros no formato padrão HTTP:

- **400 Bad Request**: Dados inválidos na requisição
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

**Exemplo de Resposta de Erro:**

```json
{
  "error": "Bad Request",
  "message": "Validation error",
  "statusCode": 400
}
```

## Desenvolvimento

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento com hot reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa a versão compilada em produção

### Migrações do Banco

Para atualizar o schema do banco de dados:

```bash
npx drizzle-kit push
```

Para gerar novas migrações:

```bash
npx drizzle-kit generate
```

## Licença

Este projeto está sob a licença ISC.

## Autor

Luis Barbosa (LuisBarbosaGit)
