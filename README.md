# LearnHub

Aplicativo de cursos e trilhas de aprendizagem desenvolvido em React Native com Expo para Tecnologia de Construção de Software II.

**Status: Etapa 3 — Navegação, UX e acessibilidade.**

## Funcionalidades

- Catálogo com busca, filtros por categoria e acesso por trilhas.
- Detalhes do curso, matrícula de demonstração e conclusão manual de módulos.
- Progresso calculado a partir das conclusões da sessão.
- Seleção de planos de demonstração com feedback explícito.
- Barra inferior, botão Voltar, histórico do navegador e retorno físico do Android.
- Controles com alvos mínimos de 48 unidades, foco visível, rótulos acessíveis e mensagens para leitores de tela.

## Executar

Requer Node.js e npm compatíveis com Expo SDK 51.

```bash
npm install
npm run web
```

Para desenvolvimento mobile, use `npm start` com cliente Expo compatível com SDK 51 ou emulador configurado. Para gerar a versão web:

```bash
npx expo export --platform web --output-dir dist
```

Edite `App.js` e `src/mockData.js`. A pasta `dist` contém arquivos gerados pelo export; não é o código-fonte principal.

## Documentação e testes

Consulte [a documentação da Etapa 3](docs/etapa-03.md) para estrutura de navegação, decisões de UX, acessibilidade e roteiro de teste. A [proposta](proposta.md) apresenta o planejamento inicial.

O projeto utiliza React Native, Expo, React Native Web e lucide-react-native. Os dados são locais, sem backend ou autenticação. Matrículas, conclusões e plano selecionado existem apenas durante a sessão; não há cobrança, aulas reais ou persistência após recarregar.

## Entregas

| Etapa | Identificação prevista | Conteúdo |
| --- | --- | --- |
| 1 | `etapa-01` | Proposta e planejamento |
| 2 | `etapa-02` | Protótipo de interface |
| 3 | `etapa-03` | Navegação, UX e acessibilidade |

Repositório: https://github.com/Flaelisnanda/LearnHub-TCS-II

Os comandos para registrar e publicar a entrega estão na documentação da Etapa 3.
