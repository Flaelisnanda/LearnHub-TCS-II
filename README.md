# LearnHub

> Aplicativo mobile de plataforma de cursos online, organizado em **trilhas de aprendizagem**.

**Status atual:** Etapa 2 — Protótipo funcional de interface
**Disciplina:** Tecnologia de Construção de Software II
**Tecnologia mobile:** React Native (Expo)

---

## Sobre o projeto

O **LearnHub** é um aplicativo mobile para descoberta e acompanhamento de cursos em trilhas estruturadas. A versão atual apresenta um protótipo funcional com catálogo, cursos em destaque, detalhes do curso, progresso do aluno e planos de assinatura, tudo em uma interface inspirada em plataformas de educação digital.

### Problema que resolve

Cursos online costumam ser consumidos de forma fragmentada e sem acompanhamento claro de progresso. O LearnHub organiza o aprendizado em trilhas, com foco em progresso, clareza visual e experiência de uso mais profissional.

## Funcionalidades implementadas na etapa 2

| Funcionalidade | Status |
|---|---|
| Catálogo de cursos e trilhas | Implementado |
| Tela inicial com destaque de cursos | Implementado |
| Detalhes do curso e módulos | Implementado |
| Visualização de progresso do aluno | Implementado |
| Planos de assinatura | Implementado |
| Dados mockados para simulação de fluxo | Implementado |

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Mobile | React Native (Expo) |
| Interface | React Native + componentes customizados |
| Ícones | lucide-react-native |
| Dados | Mock local em `src/mockData.js` |

## Instruções para execução

```bash
# instalar dependências
npm install

# iniciar o app
npm start
```

## Validação executada

Foi validado com export do projeto para web:

```bash
npx expo export --platform web --output-dir dist
```

Resultado esperado: o projeto compilou com sucesso e gerou a pasta `dist`.

## Limitações conhecidas

- Ainda não há backend real integrado.
- A autenticação e persistência real não foram implementadas nesta etapa.
- Os dados continuam sendo simulados localmente com dados mockados.

## Documentação

| Arquivo | Descrição |
|---|---|
| `proposta.md` | Proposta completa da aplicação |
| `README.md` | Visão geral do projeto e execução |

## Entregas

| Etapa | Tag | Conteúdo |
|---|---|---|
| Etapa 1 | `etapa-01` | Proposta e planejamento da aplicação |
| Etapa 2 | `etapa-02` | Protótipo funcional com interface e dados mockados |