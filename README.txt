Etapas para montar o ambiente do moodle com o protótipo de autenticação contínua 

Parte 1: configurações básicas do servidor e do moodle
	1. Instalar um servidor local
	2. Instalar um banco de dados
		a. Criar banco
		b. Importar os scripts do moodle que estão no drive¹
	3. Colocar os arquivos do moodle no servidor local, normalmente na pasta www
	4. Configurar o banco de dados no moodle
		a. O arquivo de configuração está na pasta raíz e se chama config.php 

Parte 2: instalar e configurar python
	1. A versão do python utilizada foi a 3.5
	2. Existem alguns pré requisitos que precisam ser instalados para o funcionamento correto
		a. Scikit-learn: biblioteca que possui algoritmos de de machine learning. A versão utilizada foi a que está em desenvolvimento 0.18²
		b. Flask: micro framework para fazer os serviços web
		c. Mysql Connector: driver para quem for utilizar banco MySql. Para outros poderá ser diferente.
		d. Openpyxl: para montar excel

Parte 3: configurações do serviço web e do módulo de captura
	1. Para montar os serviços web, no windows, é preciso primeiramente “setar” uma variável de ambiente que informa ao flask em qual arquivo estão os serviços
		a. o comando que será gerado no terminal é o seguinte: “set FLASK_APP=”caminho/keystrokeService.py”
		b. OBS: o caminho completo vai depender do ambiente de cada um, contudo, dentro do servidor o keystrokeService.py se encontra em “\www\moodle\webservice\rest”
	2. Depois basta executar o flask com o comando “python -m flask run”, no windows
	3. OBS: o módulo de captura aponta para localhost:5000, se os serviços flask estão em outro local, então deverão ser feitas alterações no endereço do servidor. Isso pode ser mudado no módulo de captura que está em “www\moodle\mod\forum\yui\capture_keystroke”
	NOTE FOR MAC USERS:
	PARTE 3, ITEM 2: export FLASK_APP="caminho.keystroke.py" not must be use " ".
	after this, use the bash command: flask run.
	
¹ Link do drive: https://drive.google.com/drive/folders/0B5hbH38Q0EmuUjN0ZmhTVnVCUjQ?usp=sharing
² A em desenvolvimento foi utilizada para poder usar algoritmos de Redes Neurais - MPL

