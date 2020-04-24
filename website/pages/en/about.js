const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;

function About() {

  const FeatureCallout = () => (
    <div
      className="productShowcaseSection paddingBottom"
      style={{textAlign: 'center'}}>
      <h2>Sobre</h2>
        <MarkdownBlock>
        Olá meu nome é Guilherme e eu sou desenvolvedor há mais de 5 anos. Durante os meus estudos procuro sempre anotar, repassar e escrever tudo o que eu vou aprendendo então enquanto estava estudando a sobre ferramentas de documentação encontrei o [Docusaurus](https://docusaurus.io/en/) que é uma ferramenta escrita em [React](https://pt-br.reactjs.org/) fácil de usar e com suporte a **Markdown**, então uni o útil ao agradável e publiquei essa página no [Github Pages](https://pages.github.com/).
        </MarkdownBlock>
        <MarkdownBlock>
        **Contatos**        
        </MarkdownBlock>
        <MarkdownBlock>
        [*Twitter*](https://twitter.com/guilherme_ga86)
        [*LinkedIn*](https://www.linkedin.com/in/guilherme-garcia-alves-11281aa4/)
        [*Github*](https://github.com/guilhermegarcia86)
        </MarkdownBlock>
    </div>
  );

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
            <FeatureCallout/>
        </div>
      </Container>
    </div>
  );
}

module.exports = About;
