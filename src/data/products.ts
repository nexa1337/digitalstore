export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  priceUSD: number;
  category: string;
  coverImage: string;
  images: string[];
  gumroadLink: string;
  type: string;
  features: string[];
  downloads: number;
  rating: number;
  reviews: number;
  size: string;
  pages: number;
  livePreviewUrl?: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Ultimate UI Kit',
    shortDescription: 'A comprehensive UI kit for modern web applications.',
    fullDescription: `The Ultimate UI Kit is designed to help you build beautiful, accessible, and fast web applications. It includes over 500+ components, 100+ page templates, and a fully customizable design system. Whether you are building a dashboard, a landing page, or an e-commerce site, this kit has everything you need to get started quickly.

### See it in action
![UI Kit Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TksjIsEXEQhpzEU/giphy.gif)

This kit is built with performance and accessibility in mind.`,
    priceUSD: 49.0,
    category: 'Design',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TksjIsEXEQhpzEU/giphy.gif'
    ],
    gumroadLink: 'https://gumroad.com',
    type: 'Figma File',
    features: ['500+ Components', '100+ Page Templates', 'Auto Layout V5', 'Global Style Guide', 'Free Updates'],
    downloads: 1245,
    rating: 4.9,
    reviews: 128,
    size: '1.2 GB',
    pages: 120
  },
  {
    id: '2',
    title: 'React Dashboard Template',
    shortDescription: 'Admin dashboard template built with React and Tailwind CSS.',
    fullDescription: `Accelerate your development with our React Dashboard Template. Built with the latest versions of React and Tailwind CSS, this template offers a clean, modern design with a focus on usability and performance. It includes charts, tables, forms, and authentication pages out of the box.

![Dashboard Animation](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l41lFw057lAJQMwg0/giphy.gif)

Perfect for SaaS applications, CRM systems, and admin panels.`,
    priceUSD: 29.0,
    category: 'Code',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l41lFw057lAJQMwg0/giphy.gif'
    ],
    gumroadLink: 'https://gumroad.com',
    type: 'React Source Code',
    features: ['React 18 & Vite', 'Tailwind CSS v4', 'Dark Mode Support', 'Fully Responsive', 'Authentication Ready'],
    downloads: 892,
    rating: 4.8,
    reviews: 95,
    size: '45 MB',
    pages: 25,
    livePreviewUrl: 'https://nexa1337.com'
  },
  {
    id: '3',
    title: 'Minimalist Notion Planner',
    shortDescription: 'Organize your life with this aesthetic Notion template.',
    fullDescription: 'Take control of your daily tasks, goals, and habits with the Minimalist Notion Planner. Designed with aesthetics and functionality in mind, this template helps you declutter your mind and focus on what truly matters. Features include a habit tracker, weekly planner, and goal-setting frameworks.',
    priceUSD: 15.0,
    category: 'Templates',
    coverImage: 'https://images.unsplash.com/photo-1507925922837-326f12d9348e?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1507925922837-326f12d9348e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200'
    ],
    gumroadLink: 'https://gumroad.com',
    type: 'Notion Template',
    features: ['Habit Tracker', 'Weekly & Monthly Views', 'Goal Setting Framework', 'Finance Tracker', 'Reading List'],
    downloads: 3421,
    rating: 5.0,
    reviews: 412,
    size: '2 MB',
    pages: 15
  },
  {
    id: '4',
    title: 'Procreate Brushes Pack',
    shortDescription: '50+ custom brushes for digital artists.',
    fullDescription: 'Elevate your digital art with our exclusive Procreate Brushes Pack. Carefully crafted by professional illustrators, this pack includes 50+ unique brushes ranging from realistic pencils and watercolors to dynamic ink pens and texture brushes. Perfect for sketching, painting, and lettering.',
    priceUSD: 24.0,
    category: 'Design',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&q=80&w=1200'
    ],
    gumroadLink: 'https://gumroad.com',
    type: '.brushset File',
    features: ['50+ Custom Brushes', 'Realistic Textures', 'Pressure Sensitive', 'Installation Guide', 'Commercial License'],
    downloads: 2105,
    rating: 4.9,
    reviews: 256,
    size: '150 MB',
    pages: 1
  },
  {
    id: '5',
    title: 'Freelance Contract Template',
    shortDescription: 'Legally binding contract template for freelancers.',
    fullDescription: 'Protect your freelance business with our comprehensive Contract Template. Drafted by legal professionals, this template covers all essential clauses including payment terms, intellectual property rights, confidentiality, and dispute resolution. Easy to customize for any client project.',
    priceUSD: 19.0,
    category: 'Business',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200'
    ],
    gumroadLink: 'https://gumroad.com',
    type: 'PDF & Word Doc',
    features: ['Legally Binding', 'Easy to Edit', 'Covers IP Rights', 'Payment Terms Included', 'International Support'],
    downloads: 543,
    rating: 4.7,
    reviews: 64,
    size: '5 MB',
    pages: 12
  },
  {
    id: '6',
    title: 'SaaS Landing Page',
    shortDescription: 'High-converting landing page template for SaaS products.',
    fullDescription: `Launch your SaaS product faster with our high-converting Landing Page Template. Featuring a modern, conversion-optimized design, this template includes sections for features, testimonials, pricing, and FAQs. Fully responsive and easy to integrate with your existing tech stack.

![Landing Page Scroll](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TksjIsEXEQhpzEU/giphy.gif)
`,
    priceUSD: 39.0,
    category: 'Code',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200',
      'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2QzM2VlM2I4ZjM2YjA0ZjYxYjM4YjM4YjM4YjM4YjM4YjM4YjM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TksjIsEXEQhpzEU/giphy.gif'
    ],
    gumroadLink: 'https://gumroad.com',
    type: 'HTML/CSS/JS',
    features: ['High Conversion Design', 'SEO Optimized', 'Fast Loading', 'Responsive Layout', 'Easy Customization'],
    downloads: 1567,
    rating: 4.9,
    reviews: 189,
    size: '12 MB',
    pages: 5,
    livePreviewUrl: 'https://nexa1337.com'
  },
];
