<div align="center">
	<h1>API CRUD na AWS com Lambda e DynamoDB</h1>
	</br><p>Projeto desenvolvido no desafio final do <a href="https://www.hiringcoders.com.br/">Hiring Coders 2021</a> pelo grupo 16.</br>
	<p> <strong> API serveless que cria, lê, atualiza e exclui itens de uma tabela do DynamoDB </strong></p>
    	<img src="./api-framework.png "API framework"" width="70%">
</div>

### :computer: Tecnologias utilizadas

- **Amazon DynamoDB**: é um serviço de banco de dados NoSQL totalmente gerenciado que oferece desempenho rápido e previsível com escalabilidade contínua.

- **AWS Lambda**: é um serviço de computação que permite executar código sem provisionar ou gerenciar servidores praticamente qualquer tipo de aplicativo ou serviço de back-end.
  
- **Amazon API Gateway**: é um serviço da AWS para criar, publicar, manter, monitorar e proteger APIs REST, HTTP e WebSocket em qualquer escala.

- **Javascript**

### 📝 Passos do desenvolvimento do Projeto

1. Criar uma tabela no DynamoDB pelo https://console.aws.amazon.com/dynamodb/ ;

2. Criar uma função do Lambda (index.js) pelo https://console.aws.amazon.com/lambda/ para o backend da API. Essa função do Lambda cria, lê, atualiza e exclui itens do DynamoDB. A função usa eventos do API Gateway para definir como interagir com o DynamoDB;

3. Criar uma API HTTP pelo https://console.aws.amazon.com/apigateway/ que fornece endpoints de HTTP para a função do Lambda;
  
4. Configurar rotas e integrações para conectar a API e a função do Lambda;

5. Anexar a integração a todas as rotas da API, a função do Lambda é invocada quando um cliente chama qualquer uma de suas rotas.

### 📌 Endpoints, rotas e métodos da API

- Busca todos os leads - GET - {{url AWS}}/leads
- Busca lead por email - GET - {{url AWS}}/leads/{email}
- Cria lead - POST - {{url AWS}}/leads
  
  ```json
  Body
   {
    "nome": "nome do cliente",
    "id": "id do cliente",
    "email": "email do cliente",
    "telefone": "telefone do cliente",
    "cliente": false || true
    }
  ```
- Apaga lead por email - DELETE - {{url AWS}}/leads/{email}
- Atualiza lead por email - PUT - {{url AWS}}/leads/{email}
  ```json
  Body
  {
	"cliente": false
  }
  ```
### 🖥️ Links de Referência
- [AWS Documentation](https://docs.aws.amazon.com/index.html "AWS Documentation")
  - [Amazon DynamoDB](https://docs.aws.amazon.com/dynamodb/index.html)
  - [AWS Lambda](https://docs.aws.amazon.com/lambda/index.html)
  - [Amazon API Gateway](https://docs.aws.amazon.com/apigateway/index.html)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)

## 📂 Repositórios do Projeto
- <a href="https://github.com/HiringCodersVTEX-16/desafiofinal-frontend">Front-end</a>
- <a href="https://github.com/HiringCodersVTEX-16/desafiofinal-checkout">Checkout</a>
- <a href="https://github.com/HiringCodersVTEX-16/APIAdmin">API Admin</a>
- <a href="https://github.com/HiringCodersVTEX-16/react-app-template">Componente React para cadastro de leads</a>

<br>

Desenvolvido com ❤︎ pelo Grupo 16 ACCT.
