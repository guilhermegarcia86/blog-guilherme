---
title: Arquitetura e Arquitetura limpa
author: Guilherme Alves
authorTwitter: guilherme_ga86
authorURL: https://twitter.com/guilherme_ga86
authorFBID: 1426803577
---

# Arquitetura e Arquitetura limpa

## O que é Arquitetura?

Resumindo arquitetura de software pode ser descrito da seguinte forma: _"... a arquitetura envolve: decisões sobre as estruturas que formarão o sistema, controle, protocolos de comunicação, sincronização e acesso a dados, atribuição de funcionalidade a elementos do sistema, distribuição física dos elementos escalabilidade e desempenho e outros atributos de qualidade."_

Quebrando um pouco mais essa explicação e tentando deixá-la mais suscinta eu diria que a arquitetura de software é a ideia que trata da relação entre o mapeamento de componentes de um software e os detalhes que são levados em conta na hora de implementar esses elementos na forma de código.

Resumindo ainda mai a arquitetura consiste em um modelo de alto nível que possibilita um entendimento e uma análise mais fácil do software a ser desenvolvido.  

Como o nome diz e levando pro mundo real é como ver um arquiteto de uma casa onde ele desenha a planta e todas as partes da construção se encaixam e como elas devem interagir uma com a outra.

## Por que existe?

A ideia de arquitetura de software surgiu nos anos 60 e se tornou popular nos anos 90.

A ideia era enfatizar a importância de estruturar um sistema antes de seu desenvolvimento.

## O que resolve?

A ideia é que uma boa arquitetura resolva parafrasenado Robert Martin (Uncle Bob):

_"O objetivo da arquitetura de software é minimizar os recursos humanos necessários para construir e manter um determinado sistema."_

A ideia é que com uma boa arquitetura o custo para mudanças não alto, que uma simples mudança não entrave a aplicação.

## Arquitetura limpa

Com esses conceitos em mente por volta de 2012 Robert C. Martin (Uncle Bob) criou a Arquitetura Limpa, um estilo com similaridades com a Onion Architecture e Arquitetura Hexagonal.

### O que resolve?

- Independência entre componentes, quer dizer cada módulo não conhece o outro, então mudanças em cada módulo não quebram ou necessitam de ajustes nos demais.

- Independência de framework, os frameworks que tanto gostamos aqui são tratados como meros detalhes, as aplicações não são mais amarradas ao framework, podendo assim haver substituição rápida de um framework por outro sem nenhum impacto na aplicação.

- Independência de banco de dados, assim como os frameworks o banco de dados é tratado como um detalhe.
  
- Testabilidade aqui vale um ponto importante, quanto mais fácil for pro seu sistema ser testado menos acoplamento ele terá isso significa que mudanças serão faceis de ocorrer e de serem testadas.
  
- Independência de interface de usuário, seja um GUI, API ou que quer que seja deve haver independência e não deve interferir no funcionamento do sistema.
  
- Independência de agentes externos, a nossa regra de negócio não deve depender de nada externo.