// ==========================================================================
// FOODLY — Master Food & Menu Data
// ==========================================================================

export const foodCategories = [
  {
    id: 'all',
    name: 'All Items',
    shortName: 'All',
    icon: '✨',
    image: '/images/hero-food.png',
    itemsCount: 24,
    colorTheme: 'cream',
    description: 'Explore our complete handcrafted menu made fresh daily.'
  },
  {
    id: 'burger',
    name: 'Gourmet Burger',
    shortName: 'Burger',
    icon: '🍔',
    image: '/images/burger.png',
    itemsCount: 8,
    colorTheme: 'coral',
    description: 'Prime Angus smash patties, artisan brioche buns and melted cheddar.'
  },
  {
    id: 'pizza',
    name: 'Artisan Pizza',
    shortName: 'Pizza',
    icon: '🍕',
    image: '/images/pizza.png',
    itemsCount: 10,
    colorTheme: 'yellow',
    description: 'Crispy stone-baked crusts, San Marzano sauce and buffalo mozzarella.'
  },
  {
    id: 'pasta',
    name: 'Handmade Pasta',
    shortName: 'Pasta',
    icon: '🍝',
    image: '/images/pasta.png',
    itemsCount: 12,
    colorTheme: 'green',
    description: 'Daily fresh rolled tagliatelle, silky parmesan cream & wild herbs.'
  },
  {
    id: 'salad',
    name: 'Fresh Salad',
    shortName: 'Salad',
    icon: '🥗',
    image: '/images/salad.png',
    itemsCount: 9,
    colorTheme: 'green',
    description: 'Crisp organic greens, Hass avocado, roasted quinoa & citrus dressing.'
  },
  {
    id: 'seafood',
    name: 'Wild Seafood',
    shortName: 'Seafood',
    icon: '🐟',
    image: '/images/chef-special.png',
    itemsCount: 6,
    colorTheme: 'coral',
    description: 'Pan-roasted Atlantic salmon, sea bass and saffron herb risotto.'
  },
  {
    id: 'dessert',
    name: 'Sweet Dessert',
    shortName: 'Dessert',
    icon: '🍰',
    image: '/images/dessert.png',
    itemsCount: 8,
    colorTheme: 'pink',
    description: 'Vanilla panna cotta, chocolate molten cake & berry compote.'
  },
  {
    id: 'drinks',
    name: 'Craft Drinks',
    shortName: 'Drinks',
    icon: '🍹',
    image: '/images/drink-refresh.png',
    itemsCount: 7,
    colorTheme: 'yellow',
    description: 'Cold-pressed botanical lemonades, iced matcha & fresh juices.'
  }
];

export const foods = [
  {
    id: 1,
    name: 'Classic Burger',
    category: 'Burger',
    filterCategory: 'Burger',
    price: 12.99,
    rating: 4.9,
    reviewsCount: 384,
    image: '/images/burger.png',
    colorTheme: 'coral',
    badge: 'Popular',
    isPopular: true,
    prepTime: '15-20 min',
    calories: '620 kcal',
    description: 'Juicy beef burger with fresh crisp lettuce, ripe tomatoes, melted cheddar and house sauce on toasted brioche.',
    longDescription: 'Our signature Classic Burger features a 100% grass-fed Angus beef patty seared to juicy perfection. Layered with aged Wisconsin cheddar, crisp farm lettuce, heirloom tomatoes, house dill pickles, and our signature secret umami sauce on a butter-toasted golden brioche bun.',
    dietary: ['Prime Beef', 'Brioche Bun'],
    ingredients: ['Grass-fed Angus Beef', 'Aged Cheddar', 'Fresh Brioche', 'Crisp Romaine', 'Heirloom Tomato', 'House Umami Sauce']
  },
  {
    id: 2,
    name: 'Creamy Pasta',
    category: 'Pasta',
    filterCategory: 'Pasta',
    price: 14.99,
    rating: 4.9,
    reviewsCount: 420,
    image: '/images/pasta.png',
    colorTheme: 'green',
    badge: 'Chef Favorite',
    isPopular: true,
    prepTime: '18-22 min',
    calories: '540 kcal',
    description: 'Fresh handmade tagliatelle tossed in silky parmesan garlic cream with cracked black pepper and wild thyme.',
    longDescription: 'Handmade pasta rolled daily using organic Italian semolina and pasture-raised eggs. Gently simmered in a velvety reduction of 24-month aged Parmigiano Reggiano, French butter, confit garlic, and fresh fragrant mountain thyme.',
    dietary: ['Vegetarian', 'Handmade'],
    ingredients: ['Fresh Tagliatelle', 'Parmigiano Reggiano', 'Confit Garlic', 'Organic Heavy Cream', 'Fresh Thyme', 'Cracked Peppercorn']
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    category: 'Seafood',
    filterCategory: 'Seafood',
    price: 18.99,
    rating: 5.0,
    reviewsCount: 312,
    image: '/images/chef-special.png',
    colorTheme: 'coral',
    badge: "Chef's Special",
    isPopular: true,
    prepTime: '22-25 min',
    calories: '580 kcal',
    description: 'Crispy skin Atlantic salmon fillet served over saffron herb risotto, tender asparagus and lemon dill reduction.',
    longDescription: 'Sustainably wild-caught Atlantic salmon seared with a delicate crispy skin and tender, flaky center. Paired with creamy saffron carnaroli risotto, char-grilled asparagus spears, and a vibrant lemon-dill butter reduction.',
    dietary: ['High Protein', 'Gluten-Free', 'Wild Caught'],
    ingredients: ['Wild Atlantic Salmon', 'Saffron Risotto', 'Grilled Asparagus', 'Lemon Butter', 'Fresh Dill', 'Capers']
  },
  {
    id: 4,
    name: 'Fresh Garden Salad',
    category: 'Salad',
    filterCategory: 'Salad',
    price: 9.99,
    rating: 4.8,
    reviewsCount: 260,
    image: '/images/salad.png',
    colorTheme: 'green',
    badge: 'Healthy Choice',
    isPopular: true,
    prepTime: '10-12 min',
    calories: '320 kcal',
    description: 'Crisp organic garden greens, ripe Hass avocado, shaved cucumber ribbons, roasted seeds and herb vinaigrette.',
    longDescription: 'A vibrant bowl of organic baby greens, buttery Hass avocado chunks, sweet cherry tomatoes, shaved radishes, toasted pumpkin seeds, and a zesty house-whipped citrus herb botanical vinaigrette.',
    dietary: ['Vegan', 'Gluten-Free', 'Organic'],
    ingredients: ['Baby Greens', 'Hass Avocado', 'Cherry Tomatoes', 'Cucumber Ribbons', 'Pumpkin Seeds', 'Citrus Vinaigrette']
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    category: 'Pizza',
    filterCategory: 'Pizza',
    price: 13.99,
    rating: 4.8,
    reviewsCount: 395,
    image: '/images/pizza.png',
    colorTheme: 'yellow',
    badge: 'Classic',
    isPopular: true,
    prepTime: '15-18 min',
    calories: '610 kcal',
    description: 'Wood-fired 48-hour fermented crust topped with sweet San Marzano tomato sauce, fresh buffalo mozzarella and basil.',
    longDescription: 'The purist definition of Italian pizza. Slow fermented dough baked at 800°F with sweet San Marzano tomato pulp, creamy Campania buffalo mozzarella, fresh picked sweet basil leaves, and cold-pressed extra virgin olive oil.',
    dietary: ['Vegetarian', 'Stone Baked'],
    ingredients: ['48h Fermented Crust', 'San Marzano Sauce', 'Buffalo Mozzarella', 'Sweet Basil', 'Cold-Pressed Olive Oil']
  },
  {
    id: 6,
    name: 'Chocolate Dessert',
    category: 'Dessert',
    filterCategory: 'Dessert',
    price: 8.99,
    rating: 4.9,
    reviewsCount: 285,
    image: '/images/dessert.png',
    colorTheme: 'pink',
    badge: 'Sweet Treat',
    isPopular: true,
    prepTime: '8-10 min',
    calories: '390 kcal',
    description: 'Decadent dark chocolate molten delight with silky vanilla cream, berry coulis and crushed candied pistachios.',
    longDescription: 'Rich 70% Valrhona dark chocolate cake with a molten warm center, served alongside a quenelle of Madagascar vanilla bean cream, wild raspberry coulis, and roasted Sicilian pistachio crumble.',
    dietary: ['Vegetarian', 'Gourmet'],
    ingredients: ['70% Dark Chocolate', 'Madagascar Vanilla', 'Wild Berry Coulis', 'Organic Butter', 'Sicilian Pistachios']
  },
  {
    id: 7,
    name: 'Truffle & Forest Mushroom Pizza',
    category: 'Pizza',
    filterCategory: 'Pizza',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 310,
    image: '/images/pizza.png',
    colorTheme: 'yellow',
    badge: 'Gourmet',
    isPopular: false,
    prepTime: '15-20 min',
    calories: '680 kcal',
    description: 'Crispy stone-baked crust with black truffle crema, sautéed king oyster mushrooms, fior di latte and wild thyme.',
    longDescription: 'Our most luxurious pizza creation. Natural stone-oven baked crust layered with fragrant black truffle crema, sautéed forest mushrooms, melted fior di latte cheese, and fresh picked garden thyme.',
    dietary: ['Vegetarian', 'Truffle Infused'],
    ingredients: ['Fermented Crust', 'Black Truffle Crema', 'Forest Mushrooms', 'Fior di Latte', 'Wild Thyme']
  },
  {
    id: 8,
    name: 'Double Smokehouse Burger',
    category: 'Burger',
    filterCategory: 'Burger',
    price: 16.50,
    rating: 4.9,
    reviewsCount: 410,
    image: '/images/burger.png',
    colorTheme: 'coral',
    badge: 'Best Seller',
    isPopular: false,
    prepTime: '15-18 min',
    calories: '740 kcal',
    description: 'Double Angus beef patties, double melted cheddar, caramelized shallots and smoky BBQ glaze on brioche.',
    longDescription: 'Two crispy-edged smash patties of Angus beef topped with double aged cheddar, slow-caramelized balsamic shallots, crispy smoked bacon, and house bourbon BBQ glaze on a toasted brioche bun.',
    dietary: ['Prime Beef', 'Smoked'],
    ingredients: ['Double Angus Patties', 'Aged Cheddar', 'Caramelized Shallots', 'Bourbon BBQ Glaze', 'Brioche Bun']
  },
  {
    id: 9,
    name: 'Citrus Botanical Cooler',
    category: 'Drinks',
    filterCategory: 'Drinks',
    price: 7.50,
    rating: 4.8,
    reviewsCount: 142,
    image: '/images/drink-refresh.png',
    colorTheme: 'yellow',
    badge: 'Refreshing',
    isPopular: false,
    prepTime: '5 min',
    calories: '110 kcal',
    description: 'Sparkling cold-pressed Sicilian blood orange, Japanese yuzu extract, crushed garden basil and raw honey.',
    longDescription: 'Vibrant, thirst-quenching artisan cooler made with freshly pressed blood oranges, fragrant Japanese yuzu citrus, muddled sweet basil leaves, wildflower raw honey, and sparkling spring water.',
    dietary: ['Vegan', 'Cold-Pressed'],
    ingredients: ['Sicilian Blood Orange', 'Japanese Yuzu', 'Fresh Sweet Basil', 'Wildflower Honey', 'Sparkling Spring Water']
  },
  {
    id: 10,
    name: 'Artisan Avocado Tartine',
    category: 'Salad',
    filterCategory: 'Salad',
    price: 13.50,
    rating: 4.9,
    reviewsCount: 220,
    image: '/images/hero-food.png',
    colorTheme: 'cream',
    badge: 'Morning Special',
    isPopular: false,
    prepTime: '10-15 min',
    calories: '410 kcal',
    description: 'Toasted country sourdough with chunky smashed Hass avocado, poached egg, shaved radishes and chili flakes.',
    longDescription: 'Thick-cut leavened sourdough bread toasted golden brown, smothered with chunky Hass avocado, a farm poached egg with golden yolk, watermelon radishes, Aleppo chili flakes, and fleur de sel.',
    dietary: ['Vegetarian', 'Organic Eggs'],
    ingredients: ['Country Sourdough', 'Hass Avocado', 'Pasture-Raised Egg', 'Watermelon Radish', 'Aleppo Chili', 'Fleur de Sel']
  },
  {
    id: 11,
    name: 'Matcha Blossom Refresher',
    category: 'Drinks',
    filterCategory: 'Drinks',
    price: 6.50,
    rating: 4.7,
    reviewsCount: 95,
    image: '/images/drink.png',
    colorTheme: 'green',
    badge: 'Antioxidant',
    isPopular: false,
    prepTime: '5 min',
    calories: '130 kcal',
    description: 'Ceremonial grade Japanese Uji matcha whisked over velvety oat milk and subtle floral lavender syrup.',
    longDescription: 'Authentic stone-ground Uji matcha whisked to a jade froth, layered over cold oat milk, with a delicate hint of botanical lavender syrup over crystal-clear artisan ice.',
    dietary: ['Vegan', 'Dairy-Free'],
    ingredients: ['Ceremonial Uji Matcha', 'Barista Oat Milk', 'Lavender Syrup', 'Filtered Ice']
  },
  {
    id: 12,
    name: 'Berry Glazed Panna Cotta',
    category: 'Dessert',
    filterCategory: 'Dessert',
    price: 11.00,
    rating: 4.9,
    reviewsCount: 168,
    image: '/images/dessert.png',
    colorTheme: 'pink',
    badge: 'Chef Choice',
    isPopular: false,
    prepTime: '8 min',
    calories: '310 kcal',
    description: 'Silky Madagascar vanilla bean cream set to perfection with wild blackberry compote and mint.',
    longDescription: 'Traditional Italian panna cotta infused with genuine Madagascar Bourbon vanilla bean pods, crowned with a tart and sweet wild blackberry and raspberry compote and fresh mint micro-herbs.',
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Madagascar Vanilla', 'Organic Heavy Cream', 'Wild Blackberry Compote', 'Sicilian Pistachios', 'Fresh Mint']
  }
];

export const featuredChefDish = {
  id: 101,
  tag: "CHEF'S SPECIAL",
  name: 'Creamy Mushroom Pasta',
  subtitle: 'Handcrafted With Passion',
  description: 'Fresh handmade pasta tossed with sautéed forest mushrooms, wild herbs, white wine reduction and our signature parmesan sauce.',
  rating: 4.9,
  reviewsCount: 1420,
  price: 16.99,
  originalPrice: 22.00,
  prepTime: '20 min',
  calories: '540 kcal',
  image: '/images/pasta.png',
  highlights: [
    'Daily handmade semolina pasta',
    'Wild chanterelle & oyster mushrooms',
    '24-Month aged Parmigiano Reggiano',
    'Confit garlic & aromatic mountain thyme'
  ]
};

export const featuredChefSpecial = featuredChefDish;

export const specialOfferData = {
  tag: 'LIMITED TIME DEAL',
  discount: '20% OFF',
  title: 'Fresh Meals.',
  subtitle: 'Better Mood.',
  description: 'Order your favorite handcrafted artisan meals today and get an instant 20% discount on all orders over $25 with code FOODLY20.',
  code: 'FOODLY20',
  image: '/images/hero-food.png',
  validUntil: 'Valid this week only'
};

export const servicesData = [
  {
    id: 1,
    title: 'Fast Delivery',
    icon: 'Truck',
    iconEmoji: '🚚',
    description: 'Fresh food delivered quickly to your door in under 30 minutes in temperature-locked bags.',
    colorTheme: 'coral'
  },
  {
    id: 2,
    title: 'Fresh Ingredients',
    icon: 'Leaf',
    iconEmoji: '🌿',
    description: '100% organic, locally sourced produce direct from certified family farms every single morning.',
    colorTheme: 'green'
  },
  {
    id: 3,
    title: 'Expert Chefs',
    icon: 'ChefHat',
    iconEmoji: '👨‍🍳',
    description: 'Master chefs preparing every recipe with precision, passion, and culinary artistry.',
    colorTheme: 'yellow'
  },
  {
    id: 4,
    title: 'Made With Love',
    icon: 'Heart',
    iconEmoji: '❤️',
    description: 'Nutritious, delicious food crafted to make you smile and brighten up your entire day.',
    colorTheme: 'pink'
  }
];

export const whyChooseUsData = [
  {
    id: 1,
    title: 'Fresh Ingredients',
    description: 'Only pesticide-free, organic produce and sustainably sourced meats.',
    icon: 'Sparkles',
    iconEmoji: '✨',
    colorTheme: 'green'
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Guaranteed 25–30 min fast doorstep delivery with live GPS tracking.',
    icon: 'Clock',
    iconEmoji: '⚡',
    colorTheme: 'coral'
  },
  {
    id: 3,
    title: 'Affordable Prices',
    description: 'Gourmet restaurant quality meals at honest, transparent and accessible pricing.',
    icon: 'DollarSign',
    iconEmoji: '🏷️',
    colorTheme: 'yellow'
  },
  {
    id: 4,
    title: 'Easy Ordering',
    description: 'Seamless 1-click cart, dietary filters, and instant secure payment methods.',
    icon: 'Smartphone',
    iconEmoji: '📱',
    colorTheme: 'pink'
  }
];

export const testimonialsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger & Regular Customer',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    quote: 'The food was amazing and delivery was incredibly fast. The pasta arrived piping hot and tasted like a 5-star restaurant dish.'
  },
  {
    id: 2,
    name: 'Michael Lee',
    role: 'Software Engineer',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    quote: 'FOODLY has become my favorite place to order lunch. Every single dish is fresh, packed with flavor, and so well-presented.'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    role: 'Creative Director',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    quote: 'Beautiful food, great service, and excellent prices. The artisan pizza and botanical drinks are second to none in quality!'
  }
];

export const aboutStats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '50+', label: 'Dishes' },
  { value: '4.9', label: 'Average Rating' },
  { value: '15+', label: 'Expert Chefs' }
];

export const chefsTeam = [
  {
    name: 'Chef Marcus Vance',
    title: 'Executive Head Chef',
    image: '/images/avatar-2.jpg',
    specialty: 'Italian & Mediterranean Gastronomy',
    bio: '15 years mastering handmade pastas and wood-fired artisan baking in Florence and New York.'
  },
  {
    name: 'Chef Sofia Laurent',
    title: 'Culinary Director & Pastry',
    image: '/images/avatar-1.jpg',
    specialty: 'Modern French & Artisan Desserts',
    bio: 'Pioneering organic, low-sugar fine desserts and vibrant nutrient-dense botanicals.'
  },
  {
    name: 'Chef Jin Tanaka',
    title: 'Master of Flavors & Fusion',
    image: '/images/avatar-3.jpg',
    specialty: 'Farm-to-Table Bowls & Grills',
    bio: 'Passionate about balancing seasonal crisp ingredients with deep umami profiles.'
  }
];

export const faqItems = [
  {
    q: 'How fast is Foodly delivery?',
    a: 'Our average delivery time is 25–30 minutes. All meals are freshly prepared to order and transported in heat-locked, eco-friendly insulated bags.'
  },
  {
    q: 'Do you cater to dietary restrictions?',
    a: 'Yes! We clearly tag all items with Vegetarian, Vegan, Gluten-Free, and Dairy-Free icons. You can also add custom chef notes during checkout.'
  },
  {
    q: 'Can I book a table for large groups?',
    a: 'Absolutely. You can use our instant "Book a Table" tool for parties up to 12 guests, or contact our catering team for private hall reservations.'
  },
  {
    q: 'Where do you source your ingredients?',
    a: 'We partner with over 20 certified local organic farms and sustainable fisheries to ensure 100% freshness every single morning.'
  }
];

