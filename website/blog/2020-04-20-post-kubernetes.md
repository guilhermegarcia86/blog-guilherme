---
title: Kubernetes
author: Guilherme Alves
authorTwitter: guilherme_ga86
authorURL: https://twitter.com/guilherme_ga86
authorFBID: 1426803577
---

# Kubernetes

**Docker**

Uma das vantagens do **Docker** é a questão da portabilidade, os diferentes ambientes, desenvolvimento, homologação, produção podem ter sido configurados de diferentes maneiras o que pode fazer com que a aplicação funcione em um ambiente em não em outro. Através do **Docker**, é possível guardar em um container nossa aplicação com as dependências necessárias para que ela funcione, independentemente de estarmos no ambiente de desenvolvimento, homologação ou produção.

**Kubernetes**

O **Kubernetes** é uma plataforma open-source desenvolvida pela **Google**, lançada em 2015, com o objetivo de gerenciar containers que formam uma aplicação, automatizando assim processos de implementação, monitoramento e escalonamento.

O nome "**Kubernetes**" que vem da língua grega e significa *timoneiro* (o tripulante que navega o barco). Como o nome e a pronuncia é um pouco diferente, se popularizou a abreviação: **K8s**

**Kubernetes** é uma plataforma de gerenciamento de aplicações baseadas em containers, com o objetivo de que esses containers sigam um determinado estado de configuração.

-   o **Kubernetes** é utilizado para criar um *cluster*
-   um *cluster* é um ou mais container para disponibilizar que forma uma aplicação
-   dentro do *cluster* as maquinas se conhecem mas existe um "gerente"
-   o gerente se chama *master* (mestre em português)
-   no *cluster* também tem um ou mais *node* para rodar a aplicação
-   o Kubernetes tem o seu foco em aplicações que rodam usando containers
-   o Kubernetes é uma plataforma open-source desenvolvida pela **Google**

Os maiores provedores são;

-   Amazon EKS
-   Azure Kubernetes Service
-   IBM Kubernetes Service
-   Red Hat OpenShift Container Platform

**VirtualBox VM**

Para podermos usar o Kubernetes localmente devemos antes de mais nada ter um ambiente virtualizado para rodar o Minikube. Para isso precisamos instalar o VirtualBox.

**Kubectl**

Éa ferramenta de configuração da linha de comando do Kubernetes.

**Instalação**

[Kubectl install and setup](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

**Minikube**

O **Minikube**é uma ferramenta que facilita executar o Kubernetes localmente, executando um cluster de **Kubernetes** com um único nó, o **minikube**nada mais é do que uma implementação de simples uso do **Kubernetes**.

**Instalação**

[Install minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

**Comandos minikube**

```
minikube start // inicia o minikube

minikube dashboard // acessar dashboard

minikube status // status do minikube

minikube stop // parar o cluster

minikube ssh // acessar via ssh o cluster

minikube delete // deletar o cluster
```

**POD**

Os pods são os menores objetos que podem ser criados e gerenciados pelo Kubernetes, tais objetos são utilizados para abstrair os containers que formam uma aplicação.

Um pod possui um tamanho maior do que um container, podendo assim abstrair um ou mais containers.

Exemplo de arquivo para criar pod:

```
apiVersion: v1
kind: Pod
metadata:
  name: application
spec:
  containers:
    - name: container-application
      image: rafanercessian/aplicacao-loja:v1
      ports:
        - containerPort: 80
```

Rodar POD

```
##pode ser qualquer nome o arquivo
kubectl create -f pod.yml
```

**DEPLOYMENT**

O objeto Pod seria o mais básico existente no Kubernetes e não adiciona uma camada do estado desejado de nossa aplicação para o Kubernetes gerenciar, dessa forma, quando trabalhamos com o Kubernetes, nós abstraimos o objeto Pod dentro de um objeto que oferece tais recursos, como por exemplo o objeto Deployment.

Exemplo de arquivo para criar deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: appication-deployment
spec:
  selector:
    matchLabels:
      name: application-pod
  template:
    metadata:
      labels:
        name: application-pod
    spec:
      containers:
        - name: container-application
          image: rafanercessian/aplicacao-loja:v1
          ports:
            - containerPort: 80
```

**Rodar Deployment**
```
##O nome do arquivo pode ser qualquer um
kubectl create -f deployment.yml
```
**Escalar PODs**

No dashboard podemos adicionar a quantidade de PODs.

Se tentarmos acessar o um diretamente pelo seu IP não será possível pois como são objetos voláteis precisamos de outra forma de acessá-los.

Objeto Service é que fará o acesso aos PODs

**SERVICE**

Objeto que faz a comunicação entre os PODs, esse aqui fará o LoadBalance entre aplicações.

Exemplo:

```
apiVersion: v1
kind: Service
metadata:
  name: service-application
spec:
  type: LoadBalancer
  ports:
    - port: 80
      name: http
      nodePort: 31822
  selector:
    name: application-pod
```

Rodar Service:

```
kubectl create -f service.yml
```
Pegar IP do Service:
```
minikube service service-application --url
```
**STAFULSET**

Objeto para guardar volumes.

Exemplo de um MySQL com um volume mapeado:

```
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: statefulset-mysql
spec:
  serviceName: db
  template:
    metadata:
      labels:
        name: mysql
    spec:
      containers:
        - name: container-mysql
          image: mysql:5.7.19
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_DATABASE
              value: "loja"
            - name: MYSQL_USER
              value: "root"
            - name: MYSQL_ALLOW_EMPTY_PASSWORD
              value: "1"
          volumeMounts:
            - name: volume-mysql
              mountPath: /var/lib/mysql
      volumes:
        - name: volume-mysql
          persistentVolumeClaim:
            claimName: configuration-mysql
```

**PersistentVolumeClaim**

O objeto **PersistentVolumeClaim** irá conter as configurações de requisição de consumo de recursos de um volume persistente criado pelo administrador do cluster. O **PersistentVolumeClaim** apenas define as permissões e o tamanho do storage.

Objeto que contem as permissões de recursos dos **PODs**

Exemplo:

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: configuration-mysql
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

**SERVICE DB**

Objeto que fará a comunicação entre os serviços web e o banco de dados.

Para o objeto **StatefulSet** funcionar, ele será um tanto diferente do que foi feito com o objeto Deployment, já que o primeiro exige a referência bidirecional. É preciso indicar a ele o serviço responsável pela abstração do objeto Pod.

Para isso, no arquivo do **StatefulSet**, logo abaixo de **spec**, acresentaremos **serviceName**, que será o nome do serviço colocado no arquivo do **SERVICE DB**, ou seja, db:

```
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: aplicacao-sistema-statefulset
spec:
  serviceName: aplicacao-sistema-statefulset
  selector:
    matchLabels:
      name: aplicacao-sistema-pod-statefulset
  template:
    metadata:
      labels:
        name: aplicacao-sistema-pod-statefulset
    spec:
      containers:
        - name: container-aplicacao-sistema-statefulset-v4
          image: jnlucas/noticia-alura:v4
          ports:
            - containerPort: 80
          lifecycle:
            postStart:
              exec:
                command: ["sh","enviarMensagens.sh"]

          volumeMounts:
            - name: imagens
              mountPath: /var/www/html/uploads
            - name: sessoes
              mountPath: /tmp
      volumes:
        - name: imagens
          persistentVolumeClaim:
            claimName: permissao-imagens
        - name: sessoes
          persistentVolumeClaim:
            claimName: permissao-sessao
```

Exemplo do arquivo .sh

```
#!/bin/bash

curl -X POST

-H 'Content-type: alication/json'

--data '{

"text": "Olá, um novo pod acabou de ser criado!"

}'

https://hooks.slack.com/services/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
```

**Automatizando Autoscaler**

Primeiramente devemos configurar o arquivo que contém o **Deployment** para que ele contenha métricas, no caso de exemplo uma métrica de CPU para cada POD:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: application-deployment
spec:
  selector:
    matchLabels:
      name: application-pod
  template:
    metadata:
      labels:
        name: application-pod
    spec:
      containers:
        - name: container-application-cpu
          image: jnlucas/noticia-alura:v3
          ports:
            - containerPort: 80
          #Aqui é feita a definição de métricas
          resources:
            requests:
              cpu: 200m
```

Agora é necessário adicionar essa métrica ao ambiente do Kubernetes
```
kubectl autoscale deployment application-deployment --cpu-percent=50 --min=1 --max=10
```

Aqui definimos o autoscale para o application-deployment que se a porcentagem da CPU passar 50% iremos inicializar um novo POD com um limite de até 10. E com isso também definimos que se a porcentagem abaixar ele também irá matar esses PODs com o mínimo de 1 POD.

**Parametrização de CPU e memória de cada Pod**

-   a configuração para tal é feita no container através de um elemento *resources* onde podemos especificar *requests* e *limits*
-   *requests* é o valor o container está garantido de ter
-   *limits* é o máximo permitido o que o container terá disponível

```
resources:
requests:
  memory: "16Mi"
  cpu: "100m"
limits:
  memory: "32Mi"
  cpu: "200m"
```

**Comandos**

```
#para listar os addons

minikube addons list

#para habilitar

minikube addons enable metrics-server

#Para desabilitar

minikube addons disable metrics-server

##detalhes sobre todos os pods

kubectl describe pods | grep IP

##detalhes de um pod especifico

kubectl describe pod <nome-do-pod>

## mais informações

kubectl get pods -o wide

kubectl get nodes

kubectl explain pod

kubectl explain node

kubectl get pod <nome-do-pod>

kubectl get deployment <nome-do-deployment>

kubectl get service <nome-do-service>

kubectl scale deployment application-deployment --replicas=3

kubectl create -f service-application.yaml

kubectl get pods

kubectl logs <nome-pod-name>

kubectl exec -it [nome do Pod com o banco] sh

kubectl get service

kubectl create -f statefulset.yaml

kubectl create -f service-database.yaml

kubectl create -f permitions.yaml

kubectl create -f deployment.yaml

kubectl create -f service-application.yaml

##Editando um Deployment via VIM e command line

kubectl edit deployment aplicacao-noticia-deployment

##para listar os pods

kubectl get pods

##tbm funcionar para deployments e services, por exemplo:

kubectl get services

##para detalhes de um pod

kubectl describe pod <nome-pod>

##o comando describe tbm funciona para deployment e service, por exemplo:

kubectl describe service <nome>

##para criar pod, deployment ou service a partir de um arquivo yml

kubectl create -f <nome-arquivo-yml>

##para remover pod, deployment ou service a partir de um arquivo yml

kubectl delete -f <nome-arquivo-yml>

##para remover um pod

kubectl delete pod <nome-pod>

##para remover um deployment

kubectl delete deployment <nome-deployment>

##para remover um service

kubectl delete service <nome-service>
```