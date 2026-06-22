export const projects = [
  {
    title: 'Portfolio Website',
    description: "A mid-century modern portfolio built with Gatsby and React that features fun animations, scroll-driven effects, and full click tracking via Google Tag Manager and GA4. Thank you for visiting this project!",
    tech: ['React', 'Gatsby', 'HTML', 'CSS', 'GSAP', 'Google Tag Manager', 'Google Analytics'],
    github: 'https://github.com/Vqtran15/portfolio',
    screenshot: '/images/portfolio.png',
    video: '/videos/Portfolio_Demo.mp4',
  },
  {
    title: 'Daily Task Categorizer',
    description: "My Apple Notes to-do list had grown into an unmanageable wall of text with no structure. This app solves that with categorized lists, starred priorities, and user-level task saving — all in a mobile-friendly PWA you can bookmark on your homescreen. If you're currently using a Notes app to manage your to-do list, then this app is for you!",
    tech: ['React', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/todo-list',
    live: 'https://todo-list-vuong-tran.vercel.app',
    screenshot: '/images/to-do-list.png',
    video: '/videos/to-do-demo.mp4',
  },
  {
    title: 'Community Group App',
    description: "Managing our community group meant juggling a separate group chat on GroupMe, multiple Google Sheets for meal and service sign-ups, losing prayer requests in the chat, and forgetting about that we have a birthday tab. This app brings it together — automated meal sign-ups, service night scheduling, group chat, prayer request logging, and birthday reminders all in one place. Scalable for multiple community groups to use with security features. My biggest project yet!",
    tech: ['React', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
    github: 'https://github.com/Vqtran15/community-group',
    live: 'https://bridgetown-community-group.vercel.app',
    screenshot: '/images/community-group.png',
    video: '/videos/community-group-demo.mp4',
  },
  {
    title: 'Coffee Logger',
    description: "Tracking brew recipes in Apple Notes got unwieldy fast — long, unstructured, and impossible to compare. This app solves it with a clean UI for logging brew method, grind size, ratio, and tasting notes, with ratings so you can always replicate your best cup. If you love trying different roasters and brew methods, this one is for you. I use this daily!",
    tech: ['React', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'Supabase PostgreSQL', 'Vercel'],
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
  'HTML':                'Frontend',
  'CSS':                 'Frontend',
  'GSAP':                'Frontend',
  'Vite':                'Tools',
  'Google Tag Manager':  'Tools',
  'Google Analytics':    'Tools',
  'Tailwind CSS':        'Frontend',
  'Supabase PostgreSQL': 'Backend',
  'Vercel':              'Tools',
}
