// Storage is injected so persistence can be verified without a device.
export const STORAGE_KEY = '@learnhub/learning-v1';
export const emptyLearning = () => ({ version: 1, enrolled: [], completed: {}, planId: null });

export function validateLearning(data, courses, plans) {
  if (!data || data.version !== 1 || !Array.isArray(data.enrolled) ||
      !data.completed || typeof data.completed !== 'object' || Array.isArray(data.completed) ||
      !(data.planId === null || plans.some(plan => plan.id === data.planId))) {
    throw new Error('Invalid learning data');
  }
  const unique = values => new Set(values).size === values.length;
  if (!unique(data.enrolled) || data.enrolled.some(id => !courses.some(course => course.id === id))) {
    throw new Error('Invalid enrollment');
  }
  for (const [id, modules] of Object.entries(data.completed)) {
    const course = courses.find(item => String(item.id) === id);
    if (!course || !data.enrolled.includes(course.id) || !Array.isArray(modules) || !unique(modules) ||
        modules.some(index => !Number.isInteger(index) || index < 0 || index >= course.modules.length)) {
      throw new Error('Invalid module completion');
    }
  }
  return data;
}

export function createLearningRepository(storage, courses, plans) {
  return {
    async load() {
      const raw = await storage.getItem(STORAGE_KEY);
      return raw === null ? emptyLearning() : validateLearning(JSON.parse(raw), courses, plans);
    },
    async save(data) {
      validateLearning(data, courses, plans);
      await storage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
  };
}
