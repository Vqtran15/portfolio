export const projects = [
  {
    title: 'Portfolio Website',
    description: "A mid-century modern portfolio built with Gatsby and React — featuring hand-crafted animations, scroll-driven effects, and full click tracking via Google Tag Manager and GA4.",
    tech: ['React', 'Gatsby', 'GSAP', 'Google Tag Manager', 'Google Analytics'],
    github: 'https://github.com/Vqtran15/portfolio',
    screenshot: '/images/portfolio.png',
    video: '/videos/Portfolio_Demo.mp4',
  },
  {
    title: 'Daily Task Categorizer',
    description: "My Apple Notes to-do list had grown into an unmanageable wall of text with no structure. This app solves that with categorized lists, starred priorities, and user-level task saving — all in a mobile-friendly PWA you can bookmark on your homescreen.",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/todo-list',
    live: 'https://todo-list-vuong-tran.vercel.app',
    screenshot: '/images/to-do-list.png',
    video: '/videos/to-do-demo.mp4',
  },
  {
    title: 'Community Group App',
    description: "Managing our community group meant juggling a separate group chat, multiple Google Sheets for sign-ups, and still forgetting birthdays. This app brings it all together — automated meal sign-ups, service night scheduling, group chat, and birthday reminders in one place.",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/community-group',
    live: 'https://bridgetown-community-group.vercel.app',
    screenshot: '/images/community-group.png',
    video: '/videos/community-group-demo.mp4',
  },
  {
    title: 'Coffee Logger',
    description: "Tracking brews in Apple Notes got unwieldy fast — long, unstructured, and impossible to compare. This app solves it with a clean UI for logging brew method, grind size, ratio, and tasting notes, with ratings so you can always replicate your best cup. Used daily ☕",
    tech: ['React', 'Vite', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/coffee-log',
    live: 'https://coffee-log-pro.vercel.app/',
    screenshot: '/images/coffee-log.png',
    video: '/videos/coffee-log.mp4',
  },
]

// Map each technology to a skill category for the About section.
// Add new entries here whenever a new tech is introduced in a project.
export const techCategoryMap = {
  'React':               'Frontend',
  'Gatsby':              'Frontend',
  'GSAP':               'Frontend',
  'Vite':                'Tools',
  'Google Tag Manager':  'Tools',
  'Google Analytics':    'Tools',
  'Tailwind CSS':        'Frontend',
  'Supabase PostgreSQL': 'Backend',
  'Vercel':              'Tools',
}
