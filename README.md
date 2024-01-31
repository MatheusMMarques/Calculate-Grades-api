# Calculate-Grades-api

Instalação de Dependências:

Antes de iniciar, certifique-se de ter o Node.js instalado em seu sistema. Você pode baixá-lo em nodejs.org.

No diretório do seu projeto, execute o seguinte comando no terminal para instalar as dependências necessárias:

- npm install

Configuração das Credenciais do Google:

Certifique-se de ter o arquivo chamado auth.js no mesmo diretório do seu código, contendo as credenciais de autenticação para a API do Google Sheets.
Execução do Aplicativo:

Após instalar as dependências, você pode iniciar o servidor executando o seguinte comando no terminal:

- npm start

Isso iniciará o servidor Express, que estará disponível em http://localhost:3000/.

Acesso à Rota 'calculate-grades':

Abra seu navegador ou use uma ferramenta como o Postman para acessar a rota 'calculate-grades' através do seguinte URL:

- http://localhost:3000/calculate-grades
Isso acionará o processamento das notas conforme definido no código.

Verificação no Console:

No terminal onde você iniciou o servidor, você verá mensagens de log, incluindo mensagens como "Request received for calculating grades", "Data read from the spreadsheet", "Calculating grades for each student", etc.
