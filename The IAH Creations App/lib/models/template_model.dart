class Template {
  final String id;
  final String name;
  final String category;
  final String subcategory;
  final String tech;
  final Map<String, dynamic> price;
  final List<String> features;
  final String imageUrl;
  final String demoUrl;
  final double rating;
  final int downloads;

  Template({
    required this.id,
    required this.name,
    required this.category,
    required this.subcategory,
    required this.tech,
    required this.price,
    required this.features,
    required this.imageUrl,
    this.demoUrl = '',
    this.rating = 0.0,
    this.downloads = 0,
  });

  // Mock Data
  static List<Template> get mockTemplates => [
    Template(
      id: 'm1',
      name: 'E-Commerce Mobile Pro',
      category: 'Mobile App',
      subcategory: 'E-Commerce',
      tech: 'React Native',
      price: {'INR': 24999, 'USD': 299},
      features: ['Payment Gateway', 'Push Notifications', 'AR Product View', 'Order Tracking'],
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800',
      rating: 4.8,
      downloads: 1247,
    ),
    Template(
      id: 'w1',
      name: 'SaaS Dashboard Pro',
      category: 'Web App',
      subcategory: 'SaaS',
      tech: 'React + TypeScript',
      price: {'INR': 34999, 'USD': 399},
      features: ['Analytics Dashboard', 'Multi-tenant', 'Billing Integration', 'AI Insights'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ),
    Template(
      id: 's1',
      name: 'Business Corporate',
      category: 'Website',
      subcategory: 'Business',
      tech: 'HTML5 + Tailwind',
      price: {'INR': 4999, 'USD': 59},
      features: ['Responsive Design', 'SEO Optimized', 'Contact Forms', 'Blog Integration'],
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    ),
    // Add more from original JS if needed
  ];
}
