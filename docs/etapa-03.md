# Etapa 3 — Navegação, UX e acessibilidade

## Estrutura e acesso às telas

O LearnHub é um protótipo React Native/Expo com quatro telas controladas por uma pilha de histórico em `App.js`. A barra inferior oferece Início, Curso, Progresso e Planos. A aba Curso abre o último curso selecionado (o primeiro curso na sessão inicial).

| Tela | Acesso | Ações e saída |
| --- | --- | --- |
| Início | Barra inferior e Explorar cursos | Busca, filtros de categoria, trilhas que filtram os cursos disponíveis, destaque e cards que abrem os detalhes |
| Curso | Destaque, card, aba Curso ou Abrir módulos | Matrícula de demonstração, conclusão de módulos e acesso ao progresso |
| Progresso | Barra inferior ou matrícula | Cursos matriculados, porcentagem por curso, média e retorno aos módulos |
| Planos | Barra inferior | Seleção de plano de demonstração com confirmação visual |

O botão Voltar retorna à tela anterior e restaura o curso associado. O botão físico do Android e Voltar/Avançar do navegador usam o histórico. Busca e categoria são preservadas ao sair do catálogo. A mudança de tela retorna a rolagem ao início e direciona o foco ao título. Não há URLs individuais ou links profundos para cursos.

## Fluxo completo

Início → abrir curso → Matricular-se (demo) → Progresso → Abrir módulos → Concluir → Progresso. A conclusão atualiza a porcentagem e a média; módulos concluídos ficam desabilitados para evitar duplicação. Uma matrícula repetida não duplica o curso. O estado inicial de progresso é vazio, sem números fictícios de cursos matriculados.

## Feedback e UX

- Aba e filtro selecionados têm destaque; plano escolhido e módulos concluídos também têm texto explícito de confirmação.
- Busca sem resultados apresenta uma mensagem e a ação Limpar filtros; progresso vazio oferece Explorar cursos.
- Matrícula, conclusão e plano geram mensagens compreensíveis. As ações comerciais são identificadas como demonstração e não geram cobrança.
- A Lei de Fitts orientou alvos interativos de pelo menos 48 × 48 unidades, cards clicáveis inteiros, espaçamento entre filtros e navegação inferior permanente.
- Conteúdo limitado a 800 unidades em telas largas, filtros com quebra de linha e textos secundários de pelo menos 14 unidades. Textos cinza escuro e roxo sobre fundos claros favorecem a leitura.

## Acessibilidade

O componente `Action` centraliza semântica de botão, área mínima, opacidade ao pressionar e borda de foco. Controles possuem rótulos textuais ou `accessibilityLabel`, estados selecionado/desabilitado e suporte à ativação por teclado oferecido pelo React Native Web. A busca tem nome acessível e mantém o foco durante a digitação.

Títulos usam `accessibilityRole="header"`; barras de progresso expõem mínimo, máximo e valor atual. Mensagens usam região viva na web e anúncios via `AccessibilityInfo` em plataformas nativas. Mudanças de tela focam o título (web) ou solicitam foco de acessibilidade (nativo). Imagens de capa são decorativas e o nome do curso permanece em texto. Tamanhos de fonte respeitam a escala padrão do React Native.

## Execução e roteiro de teste

```bash
npm install
npm run web
# ou npm start para abrir em ambiente Expo compatível com SDK 51
npx expo export --platform web --output-dir dist
```

1. No Início, busque por `react`, selecione Backend e confira o estado sem resultados. Limpe filtros e teste as três trilhas.
2. Abra cada curso e confira título, módulos e o retorno por Voltar. Verifique a preservação da busca e do filtro.
3. Matricule-se em dois cursos. Confira que Progresso exibe ambos e começa em 0%.
4. Abra os módulos, conclua um e confira 25% para esse curso. Conclua os quatro e confira 100%. O botão concluído não deve aceitar nova conclusão.
5. Escolha um plano e confira confirmação, nome acessível e estado selecionado. Não há pagamento real.
6. Navegue usando Tab, Shift+Tab, Enter e Espaço. Confira foco visível, ordem de leitura e retorno por Voltar/Avançar do navegador. No Android, teste o botão físico Voltar.
7. Com NVDA (web), TalkBack ou VoiceOver, confira títulos, nomes dos controles, estados, porcentagens e anúncios. Teste ampliação de texto e largura de 320 px para identificar eventuais ajustes necessários.
8. Recarregue a página: os dados da demonstração devem reiniciar.

## Limitações e validação

Sem backend, autenticação, cobrança, conteúdo de aulas ou persistência entre sessões. Concluir módulo é uma simulação manual. O catálogo tem três cursos de demonstração; cada trilha filtra a categoria correspondente. O build verifica a compilação, mas não substitui os testes manuais de teclado, dispositivo e leitor de tela acima. Não se declara certificação de conformidade WCAG.

## Entrega

Repositório: https://github.com/Flaelisnanda/LearnHub-TCS-II

Após revisar e testar, registre a entrega e publique a tag:

```bash
git add App.js README.md docs/etapa-03.md
git commit -m "Implementa etapa 3: navegação, UX e acessibilidade"
git tag etapa-03
git push origin HEAD
git push origin etapa-03
```
