# INSOMNIA - PASSO A PASSO DO ZERO

## PASSO 1: BAIXAR E INSTALAR
1. Abre o navegador
2. Vai em: https://insomnia.rest/download
3. Clica no botão azul "Download for Windows"
4. Depois que baixar, clica no arquivo e instala normalmente

## PASSO 2: LIGAR SEU SERVIDOR
1. No VS Code, aperta **Ctrl + `** (abre o terminal)
2. Digita: `node src/index.js`
3. Aperta Enter
4. Deve aparecer: "Servidor rodando na porta 3000"
5. **NÃO FECHA O TERMINAL!** Deixa rodando

## PASSO 3: ABRIR INSOMNIA
1. Abre o Insomnia (ícone roxo)
2. Se pedir para criar conta, clica em "Skip" ou "Pular"
3. Vai aparecer uma tela vazia

## PASSO 4: CRIAR SEU PRIMEIRO TESTE
1. Clica no **botão "+"** (grande, no meio da tela)
2. Escolhe **"HTTP Request"**
3. Vai aparecer uma nova aba

## PASSO 5: CONFIGURAR O PRIMEIRO TESTE
1. **URL:** Muda de GET para **POST** (dropdown ao lado)
2. **URL:** Digita `http://localhost:3000/usuarios`
3. **Body:** Clica na aba "Body" (embaixo da URL)
4. **Tipo:** Escolhe "JSON" no dropdown
5. **Conteúdo:** Cola isso:
```json
{
  "nome": "João",
  "email": "joao@teste.com"
}
```
6. Clica no botão **"Send"** (roxo, grande)

## RESULTADO:
Se der certo, vai aparecer algo assim:
```json
{
  "id": 1,
  "nome": "João",
  "email": "joao@teste.com"
}
```

**PRONTO!** Se chegou até aqui, tá funcionando! 

**Me avisa quando conseguir fazer esse primeiro teste!**