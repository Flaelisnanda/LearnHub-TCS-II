import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  BackHandler,
  AccessibilityInfo,
  findNodeHandle,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  BadgeCheck,
  BookOpen,
  Clock3,
  Code2,
  Compass,
  CreditCard,
  Palette,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import { courses, tracks, plans } from './src/mockData';

const tabs = [
  { key: 'home', label: 'Início', icon: Compass },
  { key: 'details', label: 'Curso', icon: BookOpen },
  { key: 'progress', label: 'Progresso', icon: TrendingUp },
  { key: 'plans', label: 'Planos', icon: CreditCard },
];

const trackIcons = {
  1: Code2,
  2: Target,
  3: Palette,
};

// Shared control: keyboard focus, touch target and accessible button semantics.
function Action({ style, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return <TouchableOpacity accessibilityRole="button" activeOpacity={0.65}
    {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    style={[style, { minHeight: 48, minWidth: 48, justifyContent: 'center' },
      focused && { borderWidth: 2, borderColor: '#111827' }, props.disabled && { opacity: 0.6 }]}>
    {children}
  </TouchableOpacity>;
}

function App() {
  const initial = { tab: 'home', courseId: courses[0].id };
  const [history, setHistory] = useState([initial]);
  const route = history[history.length - 1];
  const activeTab = route.tab;
  const selectedCourse = courses.find(course => course.id === route.courseId) || courses[0];
  const [message, setMessage] = useState('');
  const [enrolled, setEnrolled] = useState([]);
  const [completed, setCompleted] = useState({});
  const [planId, setPlanId] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const heading = useRef(null);
  const scroll = useRef(null);
  const title = activeTab === 'details' ? selectedCourse.title : tabs.find(tab => tab.key === activeTab).label;

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    window.history.replaceState({ learnhub: [initial] }, '');
    const restore = event => { setHistory(event.state?.learnhub || [initial]); setMessage(''); };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  const navigate = (tab, courseId = route.courseId) => {
    if (tab === route.tab && courseId === route.courseId) return;
    const next = [...history, { tab, courseId }];
    if (Platform.OS === 'web') window.history.pushState({ learnhub: next }, '');
    setHistory(next);
    setMessage('');
  };
  const back = () => {
    if (history.length <= 1) return false;
    if (Platform.OS === 'web') window.history.back();
    else setHistory(previous => previous.slice(0, -1));
    setMessage('');
    return true;
  };
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', back);
    return () => subscription.remove();
  }, [history]);
  useEffect(() => {
    scroll.current?.scrollTo({ y: 0, animated: false });
    const timer = setTimeout(() => {
      if (Platform.OS === 'web') {
        document.title = `${title} | LearnHub`;
        heading.current?.focus();
      } else {
        const node = findNodeHandle(heading.current);
        if (node) AccessibilityInfo.setAccessibilityFocus(node);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, route.courseId]);
  const notify = text => {
    setMessage(text);
    if (Platform.OS !== 'web') AccessibilityInfo.announceForAccessibility(text);
  };
  const enroll = () => {
    setEnrolled(previous => previous.includes(selectedCourse.id) ? previous : [...previous, selectedCourse.id]);
    navigate('progress');
    notify(`Matrícula de demonstração em ${selectedCourse.title} confirmada. Nenhuma cobrança realizada.`);
  };
  const finishModule = index => {
    const done = completed[selectedCourse.id] || [];
    if (done.includes(index)) return;
    setCompleted(previous => ({ ...previous, [selectedCourse.id]: [...done, index] }));
    notify(`Módulo ${index + 1} concluído. Seu progresso foi atualizado.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View><Text style={styles.eyebrow}>Plataforma de cursos</Text><Text style={styles.title}>LearnHub</Text></View>
          {history.length > 1 && <Action style={styles.chip} onPress={back} accessibilityLabel="Voltar para a tela anterior"><Text>← Voltar</Text></Action>}
        </View>
        <Text ref={heading} accessible accessibilityRole="header" tabIndex={-1} style={styles.screenHeading}>{title}</Text>
        <Text accessibilityLiveRegion="polite" style={message ? styles.feedback : { height: 0 }}>{message}</Text>
        <ScrollView ref={scroll} style={styles.content} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
          {activeTab === 'home' && <HomeScreen query={query} setQuery={setQuery} category={category} setCategory={setCategory} onOpenCourse={id => navigate('details', id)} />}
          {activeTab === 'details' && <DetailsScreen course={selectedCourse} onEnroll={enroll} enrolled={enrolled.includes(selectedCourse.id)} completed={completed[selectedCourse.id] || []} onComplete={finishModule} />}
          {activeTab === 'progress' && <ProgressScreen enrolled={enrolled} completed={completed} onOpenCourse={id => navigate('details', id)} onExplore={() => navigate('home')} />}
          {activeTab === 'plans' && <PlansScreen selectedId={planId} onSelect={plan => { setPlanId(plan.id); notify(`Plano ${plan.name} selecionado para demonstração. Nenhuma assinatura ou cobrança realizada.`); }} />}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return <Action key={tab.key} accessibilityLabel={tab.label} accessibilityState={{ selected: activeTab === tab.key }}
              style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]} onPress={() => navigate(tab.key)}>
              <Icon accessible={false} aria-hidden={true} size={18} color={activeTab === tab.key ? '#5b4ef5' : '#4b5563'} />
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
            </Action>;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ onOpenCourse, query, setQuery, category, setCategory }) {
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visibleCourses = courses.filter(course =>
    (category === 'Todos' || course.category === category) &&
    normalize(`${course.title} ${course.category} ${course.description}`).includes(normalize(query.trim()))
  );
  return (
    <View>
      <View style={styles.heroCard}>
        <View style={styles.heroIconWrap}>
          <Sparkles size={18} color="#5b4ef5" />
        </View>
        <Text style={styles.heroLabel}>Seu caminho de aprendizado</Text>
        <Text style={styles.heroTitle}>Aprenda com trilhas estruturadas</Text>
        <Text style={styles.heroSubtitle}>Descubra cursos pensados para te levar da base ao próximo nível com clareza e progressão real.</Text>
        <Action style={styles.primaryButton} onPress={() => onOpenCourse(courses[0].id)}>
          <Text style={styles.primaryButtonText}>Ver curso em destaque</Text>
        </Action>
      </View>

      <View style={styles.searchBar}>
        <Search size={16} color="#9ca3af" />
        <TextInput accessibilityLabel="Buscar cursos" placeholder="Buscar cursos" placeholderTextColor="#4b5563" value={query} onChangeText={setQuery} style={styles.searchInput} />
      </View>

      <View style={styles.chipRow}>
        {['Todos', 'Mobile', 'Backend', 'UI/UX'].map((item) => (
          <Action key={item} accessibilityLabel={`Filtrar: ${item}`} accessibilityState={{ selected: item === category }} onPress={() => setCategory(item)} style={[styles.chip, item === category && styles.chipActive]}>
            <Text style={[styles.chipText, item === category && styles.chipTextActive]}>{item}</Text>
          </Action>
        ))}
      </View>

      <Text accessibilityRole="header" style={styles.sectionTitle}>Trilhas populares</Text>
      {tracks.map((track) => {
        const Icon = trackIcons[track.id] || Compass;
        return (
          <Action key={track.id} style={styles.trackCard} accessibilityLabel={`Explorar trilha ${track.name}`} onPress={() => { setQuery(''); setCategory(track.id === 1 ? 'Mobile' : track.id === 2 ? 'Backend' : 'UI/UX'); }}>
            <View style={styles.trackHeader}>
              <View style={[styles.trackBadge, { backgroundColor: track.color }]}>
                <Icon size={16} color="#fff" />
              </View>
              <Text style={styles.trackMeta}>1 curso disponível</Text>
            </View>
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.trackDescription}>{track.description}</Text>
          </Action>
        );
      })}

      <Text accessibilityRole="header" style={styles.sectionTitle}>Cursos disponíveis</Text>
      <Text accessibilityLiveRegion="polite" style={styles.description}>{visibleCourses.length} curso(s) encontrado(s) — {category}</Text>
      {visibleCourses.length === 0 && <View style={styles.progressCard}><Text style={styles.description}>Nenhum curso encontrado. Tente outro termo ou limpe os filtros.</Text><Action style={styles.secondaryButton} onPress={() => { setQuery(''); setCategory('Todos'); }}><Text style={styles.secondaryButtonText}>Limpar filtros</Text></Action></View>}
      {visibleCourses.map((course) => (
        <Action
          key={course.id}
          style={styles.courseCard}
          accessibilityLabel={`Ver curso: ${course.title}`}
          onPress={() => onOpenCourse(course.id)}
        >
          <Image accessible={false} accessibilityIgnoresInvertColors source={{ uri: course.image }} style={styles.courseImage} />
          <View style={styles.courseContent}>
            <View style={styles.courseTopRow}>
              <Text style={styles.courseCategory}>{course.category}</Text>
              <View style={styles.ratingPill}>
                <Star size={10} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.metaText}>{course.rating}</Text>
              </View>
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseAuthor}>por {course.author}</Text>
            <View style={styles.courseMetaRow}>
              <View style={styles.metaInfo}>
                <Clock3 size={12} color="#6b7280" />
                <Text style={styles.metaText}>{course.duration}</Text>
              </View>
              <Text style={styles.coursePrice}>{course.price}</Text>
            </View>
          </View>
        </Action>
      ))}
    </View>
  );
}

function DetailsScreen({ course, onEnroll, enrolled, completed, onComplete }) {
  return (
    <View>
      <Image accessible={false} accessibilityIgnoresInvertColors source={{ uri: course.image }} style={styles.detailsImage} />
      <Text style={styles.detailsCategory}>{course.category}</Text>
      <Text style={styles.detailsTitle}>{course.title}</Text>
      <Text style={styles.detailsAuthor}>Instrutor: {course.author}</Text>

      <View style={styles.ratingRow}>
        <View style={styles.metaInfo}>
          <Star size={12} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.metaText}>{course.rating}</Text>
        </View>
        <View style={styles.metaInfo}>
          <Users size={12} color="#6b7280" />
          <Text style={styles.metaText}>{course.students} alunos</Text>
        </View>
        <View style={styles.metaInfo}>
          <Clock3 size={12} color="#6b7280" />
          <Text style={styles.metaText}>{course.duration}</Text>
        </View>
      </View>

      <Text accessibilityRole="header" style={styles.sectionTitle}>Sobre o curso</Text>
      <Text style={styles.description}>{course.description}</Text>

      <Text accessibilityRole="header" style={styles.sectionTitle}>Módulos</Text>
      {course.modules.map((module, index) => (
        <View key={module} style={styles.moduleItem}>
          <View style={styles.moduleNumberWrap}>
            <Text style={styles.moduleNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.moduleText}>{module}</Text>
          {enrolled && <Action accessibilityLabel={`${completed.includes(index) ? 'Concluído' : 'Concluir módulo'}: ${module}`} accessibilityState={{ disabled: completed.includes(index) }} disabled={completed.includes(index)} style={styles.chip} onPress={() => onComplete(index)}><Text>{completed.includes(index) ? '✓ Concluído' : 'Concluir'}</Text></Action>}
        </View>
      ))}

      <View style={styles.priceCard}>
        <View>
          <Text style={styles.priceLabel}>Preço</Text>
          <Text style={styles.priceText}>{course.price}</Text>
        </View>
        <Action style={styles.primaryButton} onPress={onEnroll}>
          <Text style={styles.primaryButtonText}>{enrolled ? 'Ver meu progresso' : 'Matricular-se (demo)'}</Text>
        </Action>
      </View>
    </View>
  );
}

function ProgressScreen({ enrolled, completed, onOpenCourse, onExplore }) {
  const learning = courses.filter(course => enrolled.includes(course.id));
  const percentage = course => Math.round(((completed[course.id] || []).length / course.modules.length) * 100);
  const average = learning.length ? Math.round(learning.reduce((total, course) => total + percentage(course), 0) / learning.length) : 0;
  return <View>
    <Text accessibilityRole="header" style={styles.sectionTitle}>Meu progresso</Text>
    <Text style={styles.description}>Demonstração: matrículas e conclusões ficam disponíveis durante esta sessão.</Text>
    <View style={styles.summaryRow}>
      <View style={styles.summaryCard}><Text style={styles.summaryValue}>{learning.length}</Text><Text style={styles.summaryLabel}>cursos matriculados</Text></View>
      <View style={styles.summaryCard}><Text style={styles.summaryValue}>{average}%</Text><Text style={styles.summaryLabel}>progresso médio</Text></View>
    </View>
    {!learning.length && <View style={styles.progressCard}><Text style={styles.description}>Você ainda não se matriculou. Escolha um curso para começar.</Text><Action style={styles.primaryButton} onPress={onExplore}><Text style={styles.primaryButtonText}>Explorar cursos</Text></Action></View>}
    {learning.map(course => <View key={course.id} style={styles.progressCard}>
      <Text style={styles.progressTitle}>{course.title}</Text>
      <Text style={styles.description}>{percentage(course)}% concluído</Text>
      <View accessibilityRole="progressbar" accessibilityLabel={`Progresso em ${course.title}`} accessibilityValue={{ min: 0, max: 100, now: percentage(course) }} style={styles.progressBarBackground}><View style={[styles.progressBarFill, { width: `${percentage(course)}%` }]} /></View>
      <Action style={[styles.secondaryButton, { marginTop: 16 }]} onPress={() => onOpenCourse(course.id)} accessibilityLabel={`Abrir módulos de ${course.title}`}><Text style={styles.secondaryButtonText}>Abrir módulos</Text></Action>
    </View>)}
  </View>;
}

function PlansScreen({ selectedId, onSelect }) {
  return (
    <View>
      <Text accessibilityRole="header" style={styles.sectionTitle}>Planos do LearnHub</Text>
      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{plan.name}</Text>
            <BadgeCheck size={18} color="#5b4ef5" />
          </View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <Action style={styles.secondaryButton} accessibilityLabel={`Selecionar plano ${plan.name} (demonstração)`} accessibilityState={{ selected: selectedId === plan.id }} onPress={() => onSelect(plan)}>
            <Text style={styles.secondaryButtonText}>{selectedId === plan.id ? '✓ Plano selecionado' : 'Escolher plano (demo)'}</Text>
          </Action>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeading: { fontSize: 22, fontWeight: '700', color: '#111827', paddingHorizontal: 20, marginBottom: 12 },
  feedback: { backgroundColor: '#dcfce7', color: '#14532d', padding: 16, marginHorizontal: 20, marginBottom: 12, borderRadius: 12, fontSize: 16 },
  searchInput: { flex: 1, minHeight: 48, color: '#111827', fontSize: 16 },
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
    backgroundColor: '#f6f7fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#edf2f7',
  },
  eyebrow: {
    fontSize: 14,
    color: '#4b5563',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  avatarButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#5b4ef5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: '#eef1ff',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
  },
  heroIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#ffffffcc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroLabel: {
    color: '#5b4ef5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  primaryButton: {
    paddingHorizontal: 16,
    backgroundColor: '#5b4ef5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchPlaceholder: {
    color: '#9ca3af',
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipActive: {
    backgroundColor: '#5b4ef5',
    borderColor: '#5b4ef5',
  },
  chipText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 12,
  },
  trackCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eef2f7',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackBadge: {
    alignSelf: 'flex-start',
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackName: {
    fontWeight: '700',
    fontSize: 18,
    color: '#111827',
    marginBottom: 6,
  },
  trackDescription: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 18,
  },
  trackMeta: {
    color: '#4b5563',
    fontWeight: '600',
    fontSize: 14,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  courseImage: {
    width: '100%',
    height: 170,
  },
  courseContent: {
    padding: 14,
  },
  courseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseCategory: {
    color: '#5b4ef5',
    fontWeight: '700',
    fontSize: 14,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fff7ed',
    borderRadius: 999,
  },
  courseTitle: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 4,
  },
  courseAuthor: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 12,
  },
  courseMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  coursePrice: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
  },
  detailsImage: {
    width: '100%',
    height: 230,
    borderRadius: 18,
    marginBottom: 16,
  },
  detailsCategory: {
    color: '#5b4ef5',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  detailsTitle: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  detailsAuthor: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  description: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  moduleItem: {
    flexWrap: 'wrap',
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  moduleNumberWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e9e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleNumber: {
    color: '#5b4ef5',
    fontWeight: '700',
    fontSize: 14,
  },
  moduleText: {
    color: '#111827',
    fontSize: 14,
    flex: 1,
  },
  priceCard: {
    flexWrap: 'wrap',
    gap: 16,
    backgroundColor: '#f4f5ff',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#4b5563',
    fontSize: 14,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    alignItems: 'flex-start',
  },
  summaryValue: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    color: '#4b5563',
    fontSize: 14,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressTitle: {
    flex: 1,
    color: '#111827',
    fontWeight: '700',
  },
  progressPercent: {
    color: '#5b4ef5',
    fontWeight: '700',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5b4ef5',
    borderRadius: 999,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  planName: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  planPrice: {
    color: '#5b4ef5',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  planDescription: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    gap: 4,
  },
  tabButtonActive: {
    backgroundColor: '#f3f1ff',
  },
  tabText: {
    color: '#4b5563',
    fontWeight: '600',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#5b4ef5',
  },
});

export default App;
