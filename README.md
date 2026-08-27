# LearnHub

> Aplicativo mobile de plataforma de cursos online, organizados em **trilhas de aprendizagem**.

**Status atual:** Etapa 1 — Proposta e Planejamento
**Disciplina:** Tecnologia de Construção de Software II
**Tecnologia mobile:** React Native (Expo)

---

## Sobre o projeto

O **LearnHub** é um aplicativo mobile onde o usuário descobre cursos organizados por categorias e por **trilhas de aprendizagem** sequências de cursos conectadas a um objetivo específico (ex.: "me tornar desenvolvedor back-end"). O usuário se matricula, acompanha seu progresso aula a aula, avalia os cursos concluídos, emite certificados e gerencia seu plano de assinatura, tudo em um único app.

### Problema que resolve

Cursos online costumam ser consumidos de forma avulsa e desconectada, sem um caminho estruturado até um objetivo de aprendizado maior. Isso dificulta o acompanhamento de progresso e contribui para a desistência. O LearnHub organiza o aprendizado em trilhas, com progresso e certificação centralizados em um só lugar.

## Funcionalidades previstas

| Funcionalidade | Status |
|---|---|
| Catálogo de cursos por categoria/trilha | Planejado |
| Matrícula em cursos e trilhas | Planejado |
| Player de aula com marcação de progresso | Planejado |
| Dashboard de progresso do aluno | Planejado |
| Emissão de certificado | Planejado |
| Planos de assinatura e checkout | Planejado |
| Avaliação de cursos | Planejado |

> Nenhuma funcionalidade de código foi implementada ainda esta etapa entrega a **proposta e o planejamento** completo da aplicação. A implementação começa na Etapa 2 e evolui de forma incremental, conforme regras da disciplina.

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Mobile | React Native (Expo) |
| Navegação | React Navigation (Stack + Bottom Tabs) |
| Backend (planejado) | Node.js + Express + SQLite (Prisma) |
| Mock de API (fase inicial) | json-server |
| Persistência local | AsyncStorage |

## Instruções para execução

> Ambiente ainda em configuração inicial (Etapa 1). Comandos abaixo são a previsão de uso a partir da Etapa 2, quando o projeto Expo for inicializado.

```bash
# instalar dependências
npm install

# subir o mock de API (dados de cursos, trilhas, matrículas etc.)
npm run server

# rodar o app (Expo)
npm start
```

## Limitações conhecidas

- Backend definitivo ainda não implementado; a etapa inicial usará mock de dados via json-server.
- Integração com gateway de pagamento ainda não definida/implementada.
- Estrutura de telas e navegação descritas na proposta, mas ainda não codificadas.

## Documentação

| Arquivo | Descrição |
|---|---|
| [`docs/proposta.md`](docs/proposta.md) | Proposta completa da aplicação (Etapa 1) |
| `docs/arquitetura.md` | A ser criado nas próximas etapas |
| `docs/evidencias.md` | A ser criado nas próximas etapas |

## Entregas

| Etapa | Tag | Conteúdo |
|---|---|---|
| Etapa 1 | `etapa-01` | Proposta e planejamento da aplicação |