# LearnHub

Aplicativo de cursos e trilhas de aprendizagem desenvolvido em React Native com Expo para Tecnologia de Construção de Software II.

**Status: Etapa 4 — Persistência local de dados.**

## Funcionalidades

- Catálogo com busca, filtros por categoria e acesso por trilhas.
- Detalhes do curso, matrícula de demonstração e conclusão manual de módulos.
- Matrículas, conclusões de módulos e plano selecionado persistidos com AsyncStorage.
- Progresso recuperado ao reabrir o aplicativo e remoção de matrícula com suas conclusões.
- Seleção de planos de demonstração com feedback explícito.
- Barra inferior, botão Voltar, histórico do navegador e retorno físico do Android.
- Controles com alvos mínimos de 48 unidades, foco visível, rótulos acessíveis e mensagens para leitores de tela.

## Executar

Requer Node.js e npm compatíveis com Expo SDK 57.

```bash
npm install
npm run web
```

Para desenvolvimento mobile, use `npm start` com cliente Expo compatível com SDK 57 ou emulador configurado. Para gerar a versão web:

```bash
npx expo export --platform web --output-dir dist
```

Edite `App.js` e `src/mockData.js`. A pasta `dist` contém arquivos gerados pelo export; não é o código-fonte principal.

## Documentação e testes

Consulte [a documentação da Etapa 3](docs/etapa-03.md) para estrutura de navegação, decisões de UX, acessibilidade e roteiro de teste. A [proposta](proposta.md) apresenta o planejamento inicial.

O projeto utiliza React Native, Expo, React Native Web e lucide-react-native. Os dados são locais, sem backend ou autenticação. Matrículas, conclusões e plano selecionado permanecem após fechar e reabrir, no mesmo dispositivo ou origem do navegador. Não há cobrança ou aulas reais. Busca e filtros continuam temporários.

Consulte [a documentação da Etapa 4](docs/etapa-04.md) para mecanismo escolhido, estrutura dos dados, operações e roteiro de teste após reabrir. Execute `npm test` para os testes automatizados de persistência. O armazenamento usa AsyncStorage, conforme a [documentação do Expo](https://docs.expo.dev/develop/user-interface/store-data/).

## Entregas

| Etapa | Identificação prevista | Conteúdo |
| --- | --- | --- |
| 1 | `etapa-01` | Proposta e planejamento |
| 2 | `etapa-02` | Protótipo de interface |
| 3 | `etapa-03` | Navegação, UX e acessibilidade |
| 4 | `etapa-04` | Persistência local, recuperação e remoção de dados |

Repositório: https://github.com/Flaelisnanda/LearnHub-TCS-II

Os comandos para registrar e publicar a entrega estão na documentação da Etapa 4.

## Testar no iPhone com Expo Go

Esta versão usa Expo SDK 57. A tag `etapa-03` preserva a entrega original com SDK 51.

1. Instale o Expo Go da App Store no iPhone.
2. Conecte o computador e o iPhone à mesma rede Wi-Fi.
3. No terminal, entre na pasta que contém `package.json` e execute:

```powershell
cd C:\Users\flael\OneDrive\Documents\TCS2\LearnHub-TCS-II
npm start -- --go --lan
```

4. Leia o QR Code do terminal com a câmera do iPhone e abra no Expo Go.
5. Se o iOS solicitar acesso à rede local, permita para o Expo Go. Mantenha o servidor aberto durante o teste.

Se o Expo Go solicitar uma conta Expo, entre com a mesma conta usada pelo Expo CLI (`npx expo login`). Não compartilhe sua senha no chat.

Redes de empresas ou faculdades podem impedir comunicação entre aparelhos. Nesse caso, use uma rede doméstica ou configure um túnel com `npx expo start --go --tunnel` (pode solicitar a instalação do suporte ao túnel).

O teste abre o LearnHub dentro do Expo Go. Não é uma publicação na App Store nem uma instalação independente. O comando `npm run ios` usa simulador e não é o caminho de teste neste computador Windows.
