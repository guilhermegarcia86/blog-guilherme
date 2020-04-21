---
title: Docker
author: Guilherme Alves
authorTwitter: guilherme_ga86
authorURL: https://twitter.com/guilherme_ga86
authorFBID: 1426803577
---

# Docker

**O que é?**

Tecnologia utilizada para baratear o custo de hospedar várias aplicações em uma mesma máquina.

**Diferença entre entre Dokcer e VM.**

Virtualização é a tecnologia que virtualiza os drivers do pc o que se torna várias máquinas rodando em uma unica máquina.

Melhor aproveitamento dos recursos do servidor.

Problemas da virtualização, cada aplicação com um sistema operacional por VM e isso é custoso tanto na configuração quanto no consumo de hardwares.

Containers são lugares onde a aplicação ira ser executada e eles rodarão sobre o sistema operacional do servidor. É mais leve pois só tem o SO do servidor e eles compartilham os recursos do SO.

Um ***container*** funcionará junto do nosso sistema operacional base, e conterá a nossa aplicação, ou seja, a aplicação será executada dentro dele. Criamos um *container* para cada aplicação, e esses *containers* vão **dividir** as funcionalidades do sistema operacional.

Com os *containers*, conseguimos limitar o consumo de CPU das aplicações, melhorando o controle sobre o uso de cada recurso do nosso sistema (CPU, rede, etc). Também temos uma facilidade maior em trabalhar com versões específicas de linguagens/bibliotecas, além de ter uma agilidade maior na hora de criar e subir *containers*, já que eles são mais leves que as máquinas virtuais.

**Instalação**

[Linux](https://www.digitalocean.com/community/tutorials/como-instalar-e-usar-o-docker-no-ubuntu-18-04-pt)

**Layered File System**

Imagens com várias camadas. Camadas podem ser compartilhadas e são somente read only. Podem ser aproveitadas por vários containers

**Volumes**

O volume fica no *Docker Host*. Ou seja, fica salvo no computador onde a *Docker Engine* está rodando.

Persistir dados com containers, pois os containers são voláteis.

Exemplo:
```
docker run -v "C:\Users\develop:/var/www" ubuntu
```

O parâmetro *-v* (volume) primeira parte é o caminho na sua máquina e o segundo é o caminho no container

Mesmo após o container ser removido os dados desse path não serão destruídos juntos.

Exemplo executando um código salvo em uma pasta em um container:

```
docker run -p 8080:3000 -v "C:\Users\develop\repo\volume-exemplo:/var/www" -w "/var/www" node npm start
```

_-w_ working directory aponta onde, qual pasta ou path, o container deve iniciar

**Criando imagens personalizadas usando Dockerfile**

**FROM** comando pra aproveitar imagem base

**MAINTAINER** pessoa responsavel

**ENV** variaveis de ambiente

**COPY** copia pra dentro da imagem

**WORKDIR** assim que o container carregar no caminho especificado

**RUN** comando que roda enquanto está construindo a imagem

**ENTRYPOINT** comando que será executado assim que terminar de construir o container

**EXPOSE** porta que será aberta

Exemplo:

```
FROM node:latest

MAINTANER Guilherme Alves

ENV PORT=3000

COPY . /var/www

WORKDIR /var/www

RUN npm install

ENTRYPOINT npm start

EXPOSE $PORT
```

```
docker build -f <nome do arquivo> -t <tag> . <contexto>

docker run -d -p 8080:3000 <tag>
```

**Subir para dockerhub**

docker login

docker push <tag>

**Network**

Comunicando vários containers.

Na rede default eles se comunicam apenas por IP

Comando para criar sua própria rede:

```
docker network create --driver bridge <nome-da-rede>
```

Existem outros drivers mas o mais comum é o ***bridge***

Atrelar o contêiner na rede criada:

```
docker run --name <nome-do-container> --netowrk <nome-da-rede> <imagem>
```

Com isso conseguimos nos comunicar entre os contêiner pelo nome.

**Docker Compose**

Ferramenta para facilitar, automatizar e prever falhas para comunicação entre containers.

Todo o processo é escrito em um arquivo chamado **docker-compose.yml**

**Instalação**

[Docker Compose Install Documentation](https://docs.docker.com/compose/install/)

Exemplo de uma aplicação com um banco de dados **MySQL**, uma aplicação **NodeJS** e um Load Balance com **NGINX**

```
version: '3' //versão do docker compose
services: //nome dos serviços que vão ser rodados
  nginx: // aqui é feita a condfiguração do NGINX que é um container que possui um Dokcerfile
    build:
      dockerfile: ./docker/nginx.dockerfile //dizemos onde está o arquivos Dockerfile que deve ser buildado
      context: . //a partir de onde ele tem que buscar
    image: <nome-da-imagem> //nome da imagem
    container_name: nginx //nome pro container
    ports: //mapear as portas que serão expostas
      - "80:80" //porta de fora:porta de dentro
    networks:
      - production-network //nome da network criada abaixo
    depends_on:
      - "node" //o nginx só sobe depois que o node subir
  mongodb:
    image: mongo //imagem padrão
    networks:
      - production-network
  node:
    build:
      dockerfile: //path de onde está o Dockerfile
      context: . //a partir de onde procurar o Dockerfile
    image: //nome da imagem
    container_name: //nome dado ao container
    ports:
      - "3000"
    networks:
      - production-network
    depends_on:
      - "mongo" //indica que o node só vai subir depois que o mongo subir
networks: //criando a rede pra comunicação dos containers
  production-network: //nome que você quiser
    driver: bridge

```

Executando:

```
docker-compose build //buildar imagens

docker-compose up -d //subir containers a partir do compose

docker-compose ps //lista todos

docker-compose down //terminar todos os containers

docker-compose restart //restarta os containers
```

**Instalando Docker Compose**

sudo curl -L https://github.com/docker/compose/releases/download/1.15.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

```
sudo chmod +x /usr/local/bin/docker-compose
```

**Comandos Básicos**

-   Comandos relacionados às informações

-   docker version **-** exibe a versão do docker que está instalada.
-   docker inspect ID_CONTAINER **-** retorna diversas informações sobre o container.
-   docker ps **-** exibe todos os containers em execução no momento.
-   docker ps -a **-** exibe todos os containers, independentemente de estarem em execução ou não.

-   Comandos relacionados à execução

-   docker run NOME_DA_IMAGEM **-** cria um container com a respectiva imagem passada como parâmetro.
-   docker run -it NOME_DA_IMAGEM **-** conecta o terminal que estamos utilizando com o do container.
-   docker run -d -P --name NOME dockersamples/static-site **-** ao executar, dá um nome ao container.
-   docker run -d -p 12345:80 dockersamples/static-site **-** define uma porta específica para ser atribuída à porta 80 do container, neste caso 12345.
-   docker run -v "CAMINHO_VOLUME" NOME_DA_IMAGEM **-** cria um volume no respectivo caminho do container.
-   docker run -it --name NOME_CONTAINER --network NOME_DA_REDE NOME_IMAGEM **-** cria um container especificando seu nome e qual rede deverá ser usada.

-   Comandos relacionados à inicialização/interrupção

-   docker start ID_CONTAINER **-** inicia o container com id em questão.
-   docker start -a -i ID_CONTAINER **-** inicia o container com id em questão e integra os terminais, além de permitir interação entre ambos.
-   docker stop ID_CONTAINER **-** interrompe o container com id em questão.

-   Comandos relacionados à remoção

-   docker rm ID_CONTAINER **-** remove o container com id em questão.
-   docker container prune **-** remove todos os containers que estão parados.
-   docker rmi NOME_DA_IMAGEM **-** remove a imagem passada como parâmetro.

-   Comandos relacionados à construção de Dockerfile

-   docker build -f Dockerfile **-** cria uma imagem a partir de um Dockerfile.
-   docker build -f Dockerfile -t NOME_USUARIO/NOME_IMAGEM **-** constrói e nomeia uma imagem não-oficial.
-   docker build -f Dockerfile -t NOME_USUARIO/NOME_IMAGEM CAMINHO_DOCKERFILE **-** constrói e nomeia uma imagem não-oficial informando o caminho para o Dockerfile.

-   Comandos relacionados ao Docker Hub

-   docker login **-** inicia o processo de login no Docker Hub.
-   docker push NOME_USUARIO/NOME_IMAGEM **-** envia a imagem criada para o Docker Hub.
-   docker pull NOME_USUARIO/NOME_IMAGEM **-** baixa a imagem desejada do Docker Hub.

-   Comandos relacionados à rede

-   hostname -i **-** mostra o ip atribuído ao container pelo docker (funciona apenas dentro do container).
-   docker network create --driver bridge NOME_DA_REDE **-** cria uma rede especificando o driver desejado.

-   Comandos relacionados ao docker-compose

-   docker-compose build **-** Realiza o build dos serviços relacionados ao arquivo docker-compose.yml, assim como verifica a sua sintaxe.
-   docker-compose up **-** Sobe todos os containers relacionados ao docker-compose, desde que o build já tenha sido executado.
-   docker-compose down **-** Para todos os serviços em execução que estejam relacionados ao arquivo docker-compose.yml.