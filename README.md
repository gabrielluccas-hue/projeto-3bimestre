# API Marketplace Enxuto - AV2 - 3º Bimestre

## 📋 Descrição
API REST desenvolvida com Node.js, Express, Prisma e MySQL simulando um marketplace simples conforme especificação da AV2.

## 🎯 Objetivo
Implementar uma API com dois relacionamentos principais:
- **1-1**: User → Store (cada usuário tem uma única loja)
- **1-N**: Store → Product (cada loja tem vários produtos)

## �️ Modelos de Dados

### User
```javascript
{
  id: Int (PK)
  email: String (unique)
  name: String?
  store: Store? // Relacionamento 1-1
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Store  
```javascript
{
  id: Int (PK)
  name: String
  userId: Int (unique, FK)
  user: User // Relacionamento 1-1
  products: Product[] // Relacionamento 1-N
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Product
```javascript
{
  id: Int (PK)
  name: String
  price: Decimal(10,2)
  storeId: Int (FK)
  store: Store // Relacionamento N-1
  createdAt: DateTime
  updatedAt: DateTime
}
```

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco (AlwaysData)
Arquivo `.env`:
```
DATABASE_URL="mysql://USUARIO:SENHA@mysql-USUARIO.alwaysdata.net/NOME_DO_BANCO"
```

### 3. Aplicar Schema
```bash
npx prisma generate
npx prisma db push
```

### 4. Executar Servidor
```bash
npm start
# ou
node src/index.js
```

Servidor rodará em: `http://localhost:3000`

## � Endpoints da API

### Users
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário

### Stores (1-1 com User)
- `GET /stores` - Listar lojas
- `GET /stores/:id` - Buscar loja (inclui user + products)
- `POST /stores` - Criar loja
- `PUT /stores/:id` - Atualizar loja
- `DELETE /stores/:id` - Deletar loja

### Products (1-N com Store)
- `GET /products` - Listar produtos (inclui store + user)
- `GET /products/:id` - Buscar produto (inclui store + user)
- `POST /products` - Criar produto
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

## 🧪 Exemplos de Uso

### Criar Usuário
```http
POST /users
Content-Type: application/json

{
  "email": "joao@email.com",
  "name": "João Silva"
}
```

### Criar Loja
```http
POST /stores
Content-Type: application/json

{
  "name": "TechStore",
  "userId": 1
}
```

### Criar Produto
```http
POST /products
Content-Type: application/json

{
  "name": "Smartphone Samsung",
  "price": 1299.99,
  "storeId": 1
}
```

### Buscar Loja com Relacionamentos
```http
GET /stores/1
```
**Retorna**: Loja + Dono (User) + Produtos

### Buscar Produtos com Relacionamentos
```http
GET /products
```
**Retorna**: Produtos + Loja + Dono da Loja

## ✅ Checklist AV2

- [x] **Modelagem & Schema (2,0)**: Store (1-1 com User) e Product (1-N com Store) funcionando; db push aplicado
- [x] **CRUD (4,0)**: Criação, listagem, atualização (PUT) e exclusão (DELETE) de lojas e produtos
- [x] **Consultas com include (1,5)**: Retorno de dados relacionados (store + user, products + store + user)
- [x] **Organização & Boas práticas (1,5)**: Código limpo, nomes claros, erros tratados
- [x] **Apresentação Individual (1,0)**: Explicação rápida do código

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM
- **MySQL** - Banco de dados
- **AlwaysData** - Hospedagem do banco

## � Estrutura do Projeto

```
projeto-3bimestre/
├── src/
│   ├── index.js        # Servidor principal com todas as rotas
│   └── db.js          # Conexão Prisma
├── prisma/
│   └── schema.prisma  # Modelos e relacionamentos
├── package.json
├── README.md
└── GUIA_TESTES_AV2.md # Guia detalhado para testes
```

## 🎯 Para a Apresentação

1. **Demonstrar healthcheck**: `GET /`
2. **Criar dados em sequência**: usuário → loja → produto
3. **Mostrar relacionamentos**: consultas com include
4. **Testar CRUD completo**: CREATE, READ, UPDATE, DELETE
5. **Explicar código e relacionamentos**

---

**Desenvolvido para AV2 - DSW - 3º Bimestre**