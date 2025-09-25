# TESTE RÁPIDO - INSOMNIA (AV2)

## PASSO 1: BAIXAR INSOMNIA
- Vai em: https://insomnia.rest/download
- Baixa e instala

## PASSO 2: ABRIR SEU SERVIDOR
```cmd
cd c:\Users\gabriel_luccas\projeto-3bimestre
node src/index.js
```
Deve aparecer: "Servidor rodando na porta 3000"

## PASSO 3: CRIAR TESTES NO INSOMNIA

### TESTE 1: Criar Usuário
- **Método**: POST
- **URL**: http://localhost:3000/usuarios
- **Body** (JSON):
```json
{
  "nome": "João",
  "email": "joao@teste.com"
}
```

### TESTE 2: Criar Loja para o Usuário
- **Método**: POST  
- **URL**: http://localhost:3000/lojas
- **Body** (JSON):
```json
{
  "nome": "Loja do João",
  "usuarioId": 1
}
```

### TESTE 3: Criar Produto na Loja
- **Método**: POST
- **URL**: http://localhost:3000/produtos  
- **Body** (JSON):
```json
{
  "nome": "Notebook",
  "preco": 2500.99,
  "lojaId": 1
}
```

### TESTE 4: Listar Tudo com Relacionamentos
- **Método**: GET
- **URL**: http://localhost:3000/usuarios/1/completo

## RESULTADO ESPERADO:
```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@teste.com",
  "loja": {
    "id": 1,
    "nome": "Loja do João",
    "produtos": [
      {
        "id": 1,
        "nome": "Notebook",
        "preco": 2500.99
      }
    ]
  }
}
```

**PRONTO! Isso comprova:**
- ✅ Relacionamento 1:1 (Usuário ↔ Loja)  
- ✅ Relacionamento 1:N (Loja ↔ Produtos)
- ✅ CRUD funcionando
- ✅ Include queries