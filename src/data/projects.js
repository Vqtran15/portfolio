export const projects = [
  {
    title: 'Portfolio Website',
    description: "This is my portfolio website! I had so much fun implementing animations and building this site. I also implemented Google Tag Manager and sending custom events to Google Analytics.",
    tech: ['React', 'Gatsby', 'Google Tag Manager', 'Google Analytics'],
    github: 'https://github.com/Vqtran15/portfolio',
  },
  {
    title: 'To-Do List',
    description: "Move your to-do list into an app and categorize them! This is my first application using a log in and saving tasks/categories at the user level. It's also very mobile friendly! Save it as a bookmark on your homescreen.",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/todo-list',
    live: 'https://todo-list-vuong-tran.vercel.app',
  },
  {
    title: 'Coffee Log',
    description: 'Log coffee recipes across different brew methods, grind sizes and coffee to water ratios. I use this daily ;)',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/coffee-log',
    live: 'https://coffee-log-public.vercel.app/',
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
