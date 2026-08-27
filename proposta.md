# Proposta e Planejamento da Aplicação Mobile

## 1. Nome da aplicação
LearnHub

## 2. Problema que a aplicação pretende resolver
Cursos online costumam ser consumidos de forma avulsa e desconectada: o aluno se matricula em cursos isolados, sem um caminho estruturado que conecte esse conhecimento a um objetivo maior (ex.: "me tornar desenvolvedor back-end"). Isso gera dispersão, dificulta o acompanhamento do próprio progresso e contribui para a desistência.

## 3. Público-alvo
Estudantes autodidatas, profissionais em transição de carreira e pessoas que buscam organização no processo de aprendizagem, preferindo um caminho estruturado de cursos em vez de conteúdo avulso e desconectado.

## 4. Objetivo principal
Permitir que o usuário descubra cursos organizados em trilhas de aprendizagem, se matricule, acompanhe seu progresso aula a aula, obtenha certificados ao concluir e gerencie seu plano de assinatura, tudo em um único aplicativo mobile.

## 5. Principais funcionalidades
- Catálogo de cursos, organizado por categorias e trilhas de aprendizagem
- Matrícula em cursos e trilhas
- Player de aulas com marcação de progresso por aula assistida
- Dashboard de progresso do aluno (por curso e por trilha)
- Emissão de certificado ao concluir um curso/trilha
- Planos de assinatura e checkout
- Avaliação de cursos pelos alunos

## 6. Telas previstas
1. Tela de Login / Cadastro
2. Tela Inicial / Catálogo (lista de cursos e trilhas, busca e filtro por categoria)
3. Tela de Detalhes do Curso (descrição, módulos, aulas, botão de matrícula)
4. Tela de Player da Aula (conteúdo da aula e marcação de progresso)
5. Tela de Meu Progresso (cursos em andamento, concluídos, certificados)
6. Tela de Planos e Checkout

## 7. Fluxo básico de navegação entre as telas
```
Login / Cadastro
    └── Tela Inicial / Catálogo
          ├── Detalhes do Curso → Matrícula → Player da Aula → Meu Progresso
          ├── Certificado (a partir de Meu Progresso, ao concluir curso/trilha)
          └── Planos e Checkout (caso o curso exija plano pago)
```

## 8. Tecnologia escolhida para o desenvolvimento mobile
React Native (com Expo) — permite reaproveitar a modelagem de domínio (models e services) já validada em um protótipo web anterior, reduzindo retrabalho, além de contar com ampla documentação e suporte multiplataforma (Android/iOS).

## 9. Tecnologia escolhida para o backend
Backend próprio em Node.js + Express, com banco de dados SQLite (via Prisma ORM), pela simplicidade de setup e deploy adequada ao escopo da disciplina. Na fase inicial, o backend será simulado com json-server, permitindo desenvolver a camada de consumo de API antes de o backend definitivo estar pronto.

## 10. Necessidade ou não de comunicação com APIs externas
Não é estritamente necessária para o funcionamento essencial do aplicativo (catálogo, matrícula, progresso), que depende apenas do backend próprio. Está prevista como evolução opcional, conforme pertinência de cada etapa, a integração com gateway de pagamento (ex.: Stripe ou Mercado Pago) no fluxo de checkout dos planos.

## 11. Forma prevista de armazenamento de dados
- **Dados remotos/persistentes:** backend próprio via API REST, fonte de verdade dos dados (cursos, trilhas, matrículas, progresso, certificados, planos).
- **Persistência local no dispositivo:** AsyncStorage, usado para token de sessão do usuário, cache do catálogo para uso offline e progresso de aula pendente de sincronização.

## 12. Repositório Git
https://github.com/Flaelisnanda/LearnHub-TCS-II

## 13. Estrutura inicial de diretórios do projeto
```
LearnHub-TCS-II/
├── android/
├── ios/
├── src/
│   ├── App.jsx
│   ├── screens/
│   │   ├── LoginScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── CourseDetailsScreen.jsx
│   │   ├── LessonPlayerScreen.jsx
│   │   ├── ProgressScreen.jsx
│   │   └── CheckoutScreen.jsx
│   ├── components/
│   ├── models/
│   │   └── (Curso, Trilha, Matricula, Certificado, ... reaproveitados do protótipo web)
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   └── useData.js
│   ├── navigation/
│   │   └── AppNavigator.jsx
│   └── utils/
├── assets/
│   ├── images/
│   └── fonts/
├── test/
├── docs/
│   └── proposta.md
├── app.json
├── package.json
└── README.md
```