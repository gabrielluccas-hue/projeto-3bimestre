# 🧪 CHECKLIST COMPLETO - TESTAR ESPECIFICAÇÕES AV2

## 🚀 SERVIDOR RODANDO EM: http://localhost:3000

---

## ✅ **TESTE 1: Schema atualizado e aplicado no AlwaysData via db push**

**Status**: ✅ FEITO (já aplicamos com `prisma db push`)

**Como verificar**: Servidor conectou ao banco sem erros

---

## ✅ **TESTE 2: Criar Store vinculada a um User (1-1 funcionando)**

### 🔹 **PASSO 1**: Criar usuários no Insomnia
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "joao@teste.com",
  "name": "João Silva"
}
```
**✅ RESULTADO ESPERADO**: Status 201, usuário com ID 1

### 🔹 **PASSO 2**: Criar outro usuário
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "email": "maria@teste.com",
  "name": "Maria Santos"
}
```
**✅ RESULTADO ESPERADO**: Status 201, usuário com ID 2

### 🔹 **PASSO 3**: Criar loja para usuário 1 (relacionamento 1-1)
```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "TechStore do João",
  "userId": 1
}
```
**✅ RESULTADO ESPERADO**: Status 201, loja criada e vinculada ao usuário 1

### 🔹 **PASSO 4**: TESTAR RESTRIÇÃO 1-1 (tentar criar 2ª loja para mesmo usuário)
```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Segunda Loja do João",
  "userId": 1
}
```
**✅ RESULTADO ESPERADO**: Status 400 - ERRO (relacionamento 1-1 impedindo)

---

## ✅ **TESTE 3: Criar Products vinculados a uma Store (1-N funcionando)**

### 🔹 **PASSO 5**: Criar loja para usuário 2
```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Loja da Maria",
  "userId": 2
}
```
**✅ RESULTADO ESPERADO**: Status 201, loja com ID 2

### 🔹 **PASSO 6**: Criar primeiro produto (relacionamento 1-N)
```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Smartphone Samsung",
  "price": 1299.99,
  "storeId": 1
}
```
**✅ RESULTADO ESPERADO**: Status 201, produto vinculado à loja 1

### 🔹 **PASSO 7**: Criar segundo produto para MESMA loja (testando 1-N)
```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Notebook Dell",
  "price": 2499.99,
  "storeId": 1
}
```
**✅ RESULTADO ESPERADO**: Status 201, segundo produto na mesma loja (1-N funcionando)

### 🔹 **PASSO 8**: Criar produto para loja 2
```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Vestido Fashion",
  "price": 89.99,
  "storeId": 2
}
```
**✅ RESULTADO ESPERADO**: Status 201, produto vinculado à loja 2

---

## ✅ **TESTE 4: CRUD completo - POST e GET**

### 🔹 **PASSO 9**: Listar todos os usuários
```
GET http://localhost:3000/users
```
**✅ RESULTADO ESPERADO**: Array com 2 usuários + suas lojas

### 🔹 **PASSO 10**: Listar todas as lojas
```
GET http://localhost:3000/stores
```
**✅ RESULTADO ESPERADO**: Array com 2 lojas + usuários + produtos

---

## ✅ **TESTE 5: CRUD completo - PUT (obrigatório)**

### 🔹 **PASSO 11**: Atualizar loja
```
PUT http://localhost:3000/stores/1
Content-Type: application/json

{
  "name": "TechStore Premium"
}
```
**✅ RESULTADO ESPERADO**: Status 200, loja com nome atualizado

### 🔹 **PASSO 12**: Atualizar produto
```
PUT http://localhost:3000/products/1
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "price": 5999.99
}
```
**✅ RESULTADO ESPERADO**: Status 200, produto com nome e preço atualizados

---

## ✅ **TESTE 6: CRUD completo - DELETE (obrigatório)**

### 🔹 **PASSO 13**: Deletar um produto
```
DELETE http://localhost:3000/products/3
```
**✅ RESULTADO ESPERADO**: Status 204 (sem conteúdo)

### 🔹 **PASSO 14**: Verificar se produto foi deletado
```
GET http://localhost:3000/products/3
```
**✅ RESULTADO ESPERADO**: Status 404 - produto não encontrado

---

## ✅ **TESTE 7: GET /stores/:id retorna dono (User) e produtos da loja**

### 🔹 **PASSO 15**: Buscar loja específica com include
```
GET http://localhost:3000/stores/1
```
**✅ RESULTADO ESPERADO**:
```json
{
  "id": 1,
  "name": "TechStore Premium",
  "userId": 1,
  "user": {
    "id": 1,
    "email": "joao@teste.com",
    "name": "João Silva"
  },
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "price": "5999.99"
    },
    {
      "id": 2,
      "name": "Notebook Dell",
      "price": "2499.99"
    }
  ]
}
```

---

## ✅ **TESTE 8: GET /products retorna loja e dono da loja**

### 🔹 **PASSO 16**: Listar produtos com include
```
GET http://localhost:3000/products
```
**✅ RESULTADO ESPERADO**:
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": "5999.99",
    "storeId": 1,
    "store": {
      "id": 1,
      "name": "TechStore Premium",
      "userId": 1,
      "user": {
        "id": 1,
        "email": "joao@teste.com",
        "name": "João Silva"
      }
    }
  }
]
```

---

## ✅ **TESTE 9: Código organizado, com tratamento básico de erros**

### 🔹 **PASSO 17**: Testar erro 404
```
GET http://localhost:3000/stores/999
```
**✅ RESULTADO ESPERADO**: Status 404 + mensagem "Loja não encontrada"

### 🔹 **PASSO 18**: Testar erro 400 (dados inválidos)
```
POST http://localhost:3000/stores
Content-Type: application/json

{
  "name": "Loja sem userId"
}
```
**✅ RESULTADO ESPERADO**: Status 400 + mensagem de erro

### 🔹 **PASSO 19**: Testar produto para loja inexistente
```
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Produto órfão",
  "price": 99.99,
  "storeId": 999
}
```
**✅ RESULTADO ESPERADO**: Status 400 + erro de referência

---

## 🎯 **RESUMO FINAL - CHECKLIST COMPLETO**

- [ ] ✅ Schema aplicado (db push)
- [ ] ✅ Relacionamento 1-1 (User → Store) funcionando
- [ ] ✅ Relacionamento 1-N (Store → Products) funcionando
- [ ] ✅ POST funcionando (users, stores, products)
- [ ] ✅ GET funcionando (listagem e busca por ID)
- [ ] ✅ PUT funcionando (stores e products)
- [ ] ✅ DELETE funcionando (stores e products)
- [ ] ✅ GET /stores/:id retorna user + products
- [ ] ✅ GET /products retorna store + user
- [ ] ✅ Tratamento de erros (404, 400)

## 🏆 **SE TODOS OS TESTES PASSARAM = AV2 100% APROVADA!**