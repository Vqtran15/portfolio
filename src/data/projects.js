export const projects = [
  {
    title: 'Portfolio Website',
    description: "This is my portfolio website! I had so much fun implementing animations and building this site.",
    tech: ['React', 'Gatsby', 'Google Tag Manager', 'Google Analytics'],
    color: 'orange',
    github: 'https://github.com/Vqtran15/portfolio',
  },
  {
    title: 'To-Do List',
    description: 'Move your to-do list into an app and categorize them!',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    color: 'orange',
    github: 'https://github.com/Vqtran15/todo-list',
    live: 'https://todo-list-vuong-tran.vercel.app',
  },
  {
    title: 'Coffee Log',
    description: 'Log coffee recipes across different brew methods, grind sizes and coffee to water ratios.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    color: 'green',
    github: 'https://github.com/Vqtran15/coffee-log',
    live: 'https://coffee-log-pearl.vercel.app/',
  },
]

// Map each technology to a skill category for the About section.
// Add new entries here whenever a new tech is introduced in a project.
export const techCategoryMap = {
  'React':               'Frontend',
  'Gatsby':              'Frontend',
  'Vite':                'Tools',
  'Google Tag Manager':  'Tools',
  'Google Analytics':    'Tools',
  'Tailwind CSS':        'Frontend',
  'Supabase PostgreSQL': 'Backend',
  'Vercel':              'Tools',
}
