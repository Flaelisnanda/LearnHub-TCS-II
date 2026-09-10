import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  CreditCard,
  Palette,
  PlayCircle,
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

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) || courses[0],
    [selectedCourseId]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <DetailsScreen course={selectedCourse} onEnroll={() => setActiveTab('progress')} />;
      case 'progress':
        return <ProgressScreen />;
      case 'plans':
        return <PlansScreen />;
      default:
        return <HomeScreen onSelectCourse={setSelectedCourseId} onOpenCourse={() => setActiveTab('details')} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {renderTabContent()}
        </ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, activeTab === tab.key && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Icon size={18} color={activeTab === tab.key ? '#5b4ef5' : '#6b7280'} />
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>Plataforma</Text>
        <Text style={styles.title}>LearnHub</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={18} color="#111827" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.avatarButton}>
          <Text style={styles.avatarText}>L</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen({ onSelectCourse, onOpenCourse }) {
  return (
    <View>
      <View style={styles.heroCard}>
        <View style={styles.heroIconWrap}>
          <Sparkles size={18} color="#5b4ef5" />
        </View>
        <Text style={styles.heroLabel}>Seu caminho de aprendizado</Text>
        <Text style={styles.heroTitle}>Aprenda com trilhas estruturadas</Text>
        <Text style={styles.heroSubtitle}>Descubra cursos pensados para te levar da base ao próximo nível com clareza e progressão real.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => { onSelectCourse(courses[0].id); onOpenCourse(); }}>
          <Text style={styles.primaryButtonText}>Ver curso em destaque</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Search size={16} color="#9ca3af" />
        <Text style={styles.searchPlaceholder}>Buscar cursos ou trilhas</Text>
      </View>

      <View style={styles.chipRow}>
        {['Todos', 'Mobile', 'Backend', 'UX'].map((item) => (
          <View key={item} style={[styles.chip, item === 'Todos' && styles.chipActive]}>
            <Text style={[styles.chipText, item === 'Todos' && styles.chipTextActive]}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Trilhas populares</Text>
      {tracks.map((track) => {
        const Icon = trackIcons[track.id] || Compass;
        return (
          <TouchableOpacity key={track.id} style={styles.trackCard}>
            <View style={styles.trackHeader}>
              <View style={[styles.trackBadge, { backgroundColor: track.color }]}>
                <Icon size={16} color="#fff" />
              </View>
              <Text style={styles.trackMeta}>{track.courses} cursos</Text>
            </View>
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.trackDescription}>{track.description}</Text>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.sectionTitle}>Cursos em alta</Text>
      {courses.map((course) => (
        <TouchableOpacity
          key={course.id}
          style={styles.courseCard}
          onPress={() => {
            onSelectCourse(course.id);
            onOpenCourse();
          }}
        >
          <Image source={{ uri: course.image }} style={styles.courseImage} />
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
        </TouchableOpacity>
      ))}
    </View>
  );
}

function DetailsScreen({ course, onEnroll }) {
  return (
    <View>
      <Image source={{ uri: course.image }} style={styles.detailsImage} />
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

      <Text style={styles.sectionTitle}>Sobre o curso</Text>
      <Text style={styles.description}>{course.description}</Text>

      <Text style={styles.sectionTitle}>Módulos</Text>
      {course.modules.map((module, index) => (
        <View key={module} style={styles.moduleItem}>
          <View style={styles.moduleNumberWrap}>
            <Text style={styles.moduleNumber}>{index + 1}</Text>
          </View>
          <Text style={styles.moduleText}>{module}</Text>
        </View>
      ))}

      <View style={styles.priceCard}>
        <View>
          <Text style={styles.priceLabel}>Preço</Text>
          <Text style={styles.priceText}>{course.price}</Text>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={onEnroll}>
          <Text style={styles.primaryButtonText}>Matricular-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProgressScreen() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Meu progresso</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <BookOpen size={16} color="#5b4ef5" />
          <Text style={styles.summaryValue}>7</Text>
          <Text style={styles.summaryLabel}>cursos</Text>
        </View>
        <View style={styles.summaryCard}>
          <TrendingUp size={16} color="#5b4ef5" />
          <Text style={styles.summaryValue}>64%</Text>
          <Text style={styles.summaryLabel}>média</Text>
        </View>
      </View>

      {courses.map((course) => (
        <View key={course.id} style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>{course.title}</Text>
            <Text style={styles.progressPercent}>{course.progress}%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${course.progress}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

function PlansScreen() {
  return (
    <View>
      <Text style={styles.sectionTitle}>Planos do LearnHub</Text>
      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{plan.name}</Text>
            <BadgeCheck size={18} color="#5b4ef5" />
          </View>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planDescription}>{plan.description}</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Escolher plano</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  container: {
    flex: 1,
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
    fontSize: 12,
    color: '#6b7280',
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 13,
    lineHeight: 18,
  },
  trackMeta: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 12,
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
    fontSize: 12,
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
    color: '#6b7280',
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
  },
  moduleText: {
    color: '#111827',
    fontSize: 14,
    flex: 1,
  },
  priceCard: {
    backgroundColor: '#f4f5ff',
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#6b7280',
    fontSize: 12,
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
    color: '#6b7280',
    fontSize: 12,
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
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 11,
  },
  tabTextActive: {
    color: '#5b4ef5',
  },
});

export default App;
