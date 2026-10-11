/** Demonstration data only. Replace with database queries before launch. */
export type Course = {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate';
  description: string;
  lessons: number;
  duration: string;
  symbol: string;
};
export const categories = ['All', 'Programming', 'Mathematics', 'Languages', 'Science'] as const;
export const courses: Course[] = [
  { id: 'python', title: 'Python Fundamentals', category: 'Programming', level: 'Beginner', description: 'Build confidence with variables, loops, and your first programs.', lessons: 12, duration: '6 hours', symbol: '⌘' },
  { id: 'algebra', title: 'Algebra Made Clear', category: 'Mathematics', level: 'Beginner', description: 'Understand equations, functions, and problem-solving basics.', lessons: 10, duration: '5 hours', symbol: '∑' },
  { id: 'english', title: 'Everyday English', category: 'Languages', level: 'Beginner', description: 'Improve practical vocabulary, reading, and communication.', lessons: 14, duration: '7 hours', symbol: 'Aa' },
  { id: 'biology', title: 'Explore Biology', category: 'Science', level: 'Intermediate', description: 'Discover cells, living systems, and the world around you.', lessons: 9, duration: '4 hours', symbol: '✳' },
  { id: 'web', title: 'Web Design Essentials', category: 'Programming', level: 'Beginner', description: 'Learn how accessible, responsive websites come together.', lessons: 11, duration: '6 hours', symbol: '</>' },
  { id: 'calculus', title: 'Introduction to Calculus', category: 'Mathematics', level: 'Intermediate', description: 'Meet limits, derivatives, and their real-world applications.', lessons: 13, duration: '8 hours', symbol: '∫' }
];
