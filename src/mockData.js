export const tracks = [
  {
    id: 1,
    name: 'Desenvolvimento Front-end',
    level: 'Iniciante',
    courses: 4,
    color: '#5B4EF5',
    description: 'Domine a criação de interfaces modernas, interativas e com foco em experiência de usuário.',
  },
  {
    id: 2,
    name: 'Back-end com Node.js',
    level: 'Intermediário',
    courses: 5,
    color: '#0EA5E9',
    description: 'Aprenda a construir APIs, autenticação e integrações com foco em desempenho e segurança.',
  },
  {
    id: 3,
    name: 'UX Research e Design',
    level: 'Iniciante',
    courses: 3,
    color: '#F59E0B',
    description: 'Entenda melhor usuários, protótipos e decisões de produto com base em pesquisa e testes.',
  },
];

export const courses = [
  {
    id: 1,
    title: 'React Native do Zero',
    category: 'Mobile',
    author: 'Ana Paula',
    duration: '6h 20m',
    rating: 4.9,
    students: 1860,
    price: 'R$ 79,90',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    progress: 72,
    modules: ['Fundamentos do Expo', 'Navegação', 'Cards e Listas', 'Persistência local'],
    description: 'Aprenda a construir apps mobile com React Native, navegação, componentes reutilizáveis e boas práticas de UX.',
  },
  {
    id: 2,
    title: 'API REST com Node.js',
    category: 'Backend',
    author: 'Lucas Mendes',
    duration: '8h 05m',
    rating: 4.8,
    students: 2140,
    price: 'R$ 89,90',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    progress: 48,
    modules: ['Express e rotas', 'Autenticação JWT', 'SQLite e Prisma', 'Deploy local'],
    description: 'Crie serviços web seguros, escaláveis e organizados com Node.js, Express e estrutura profissional de backend.',
  },
  {
    id: 3,
    title: 'Design de Interfaces para Web',
    category: 'UI/UX',
    author: 'Beatriz Lima',
    duration: '4h 50m',
    rating: 4.7,
    students: 980,
    price: 'R$ 59,90',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    progress: 89,
    modules: ['Layout funcional', 'Tipografia', 'Cores e contrastes', 'Prototipação'],
    description: 'Descubra como criar interfaces mais claras, bonitas e eficientes para pessoas e negócios.',
  },
];

export const plans = [
  { id: 1, name: 'Mensal', price: 'R$ 29,90', description: 'Acesso a todos os cursos e trilhas.' },
  { id: 2, name: 'Anual', price: 'R$ 239,90', description: 'Economize 30% com acesso anual completo.' },
  { id: 3, name: 'Premium', price: 'R$ 99,90', description: 'Tudo do plano anual + certificados e mentorias.' },
];

export default {
  tracks,
  courses,
  plans,
};
