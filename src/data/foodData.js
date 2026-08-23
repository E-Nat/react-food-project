export const foodCategories = [
  {
    id: 'pizza',
    name: 'Artisan Pizza',
    shortName: 'Pizza',
    image: '/images/pizza.png',
    itemsCount: 12,
    description: 'Crispy stone-baked crusts with imported buffalo mozzarella and slow-fermented dough.'
  },
  {
    id: 'pasta',
    name: 'Handmade Pasta',
    shortName: 'Pasta',
    image: '/images/pasta.png',
    itemsCount: 16,
    description: 'Daily fresh rolled tagliatelle, gnocchi and creamy parmesan-infused ravioli.'
  },
  {
    id: 'burgers',
    name: 'Gourmet Burgers',
    shortName: 'Burgers',
    image: '/images/burger.png',
    itemsCount: 9,
    description: 'Prime smash patties, golden brioche buns, and artisanal melted aged cheddar.'
  },
  {
    id: 'salads',
    name: 'Fresh Bowls & Salads',
    shortName: 'Salads',
    image: '/images/salad.png',
    itemsCount: 14,
    description: 'Organic greens, roasted quinoa, creamy avocado and house botanical dressings.'
  },
  {
    id: 'desserts',
    name: 'Sweet Desserts',
    shortName: 'Desserts',
    image: '/images/dessert.png',
    itemsCount: 8,
    description: 'Silky Madagascar vanilla panna cotta, tiramisu, and berry glazed delights.'
  },
  {
    id: 'drinks',
    name: 'Craft Drinks',
    shortName: 'Drinks',
    image: '/images/drink-refresh.png',
    itemsCount: 10,
    description: 'Freshly cold-pressed juices, sparkling botanical lemonades and crafted mocktails.'
  }
];

export const foods = [
  {
    id: 1,
    name: 'Creamy Tagliatelle',
    category: 'Pasta',
    filterCategory: 'Dinner',
    price: 18.00,
    rating: 4.9,
    reviewsCount: 342,
    image: '/images/pasta.png',
    description: 'Fresh handmade pasta tossed in a silky parmesan cream emulsion with roasted garlic, cracked pepper, and fresh garden herbs.',
    longDescription: 'Our signature pasta is made from scratch every morning using organic semolina flour and farm-fresh eggs. Tossed in a slow-simmered emulsion of 24-month aged Parmigiano Reggiano, confit garlic, French butter, and fragrant thyme.',
    prepTime: '20-25 min',
    calories: '540 kcal',
    badge: 'Popular',
    isPopular: true,
    dietary: ['Vegetarian', 'Handmade'],
    ingredients: ['Fresh Tagliatelle', 'Parmigiano Reggiano', 'Roasted Garlic', 'Organic Cream', 'Wild Thyme', 'Cracked Black Pepper']
  },
  {
    id: 2,
    name: 'Truffle & Forest Mushroom Pizza',
    category: 'Pizza',
    filterCategory: 'Lunch',
    price: 21.50,
    rating: 4.8,
    reviewsCount: 295,
    image: '/images/pizza.png',
    description: 'Wood-fired 48-hour fermented crust topped with wild forest mushrooms, black truffle crema, fresh thyme, and fior di latte.',
    longDescription: 'Crafted with naturally fermented dough baked at 800°F in our stone oven. Features a delicate base of black truffle crema, sautéed king oyster and chanterelle mushrooms, creamy fior di latte mozzarella, and cold-pressed olive oil.',
    prepTime: '15-20 min',
    calories: '680 kcal',
    badge: 'Chef Favorite',
    isPopular: true,
    dietary: ['Vegetarian', 'Stone Baked'],
    ingredients: ['Fermented Dough', 'Black Truffle Crema', 'Wild Mushrooms', 'Fior di Latte', 'Fresh Thyme', 'Extra Virgin Olive Oil']
  },
  {
    id: 3,
    name: 'Double Smokehouse Burger',
    category: 'Burgers',
    filterCategory: 'Dinner',
    price: 16.50,
    rating: 4.9,
    reviewsCount: 420,
    image: '/images/burger.png',
    description: 'Prime Angus beef smash patties, double aged sharp cheddar, caramelised shallots, and house smoky umami glaze on toasted brioche.',
    longDescription: 'Two 100% grass-fed Angus beef patties seared on a screaming hot flat-top to create a crispy caramelized crust. Layered with double Wisconsin aged cheddar, slow-caramelized shallots, house dill pickles, and our signature secret umami glaze.',
    prepTime: '15-18 min',
    calories: '720 kcal',
    badge: 'Best Seller',
    isPopular: true,
    dietary: ['Prime Beef', 'Brioche Bun'],
    ingredients: ['Double Angus Beef', 'Aged Cheddar', 'Caramelized Shallots', 'Toasted Brioche', 'House Umami Sauce', 'Artisan Pickles']
  },
  {
    id: 4,
    name: 'Green Goddess Power Bowl',
    category: 'Salads',
    filterCategory: 'Breakfast',
    price: 14.00,
    rating: 4.7,
    reviewsCount: 188,
    image: '/images/salad.png',
    description: 'Crisp organic kale, ripe Hass avocado, steamed edamame, roasted quinoa, cherry heirloom tomatoes, and herb green tahini dressing.',
    longDescription: 'A nutrient-dense superfood bowl combining baby kale, tri-color quinoa, Hass avocado slices, sweet edamame, cucumber ribbons, and heirloom tomatoes. Drizzled with our house-blended green goddess tahini sauce.',
    prepTime: '10-15 min',
    calories: '380 kcal',
    badge: 'Healthy Choice',
    isPopular: true,
    dietary: ['Vegan', 'Gluten-Free', 'Organic'],
    ingredients: ['Baby Kale', 'Hass Avocado', 'Roasted Quinoa', 'Edamame', 'Heirloom Tomatoes', 'Green Goddess Tahini']
  },
  {
    id: 5,
    name: 'Berry Glazed Panna Cotta',
    category: 'Desserts',
    filterCategory: 'Desserts',
    price: 11.00,
    rating: 4.9,
    reviewsCount: 164,
    image: '/images/dessert.png',
    description: 'Silky Madagascar vanilla bean cream paired with wild forest berry compote, micro-mint, and candied pistachio crumble.',
    longDescription: 'Authentic Italian panna cotta infused with real Madagascar Bourbon vanilla beans, gently set to achieve the perfect silky wobble. Garnished with a tart-sweet glaze of wild blackberries, raspberries, and crushed Sicilian pistachios.',
    prepTime: '10 min',
    calories: '310 kcal',
    badge: 'Sweet Treat',
    isPopular: false,
    dietary: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Madagascar Vanilla', 'Organic Heavy Cream', 'Wild Berry Compote', 'Sicilian Pistachios', 'Fresh Mint Leaves']
  },
  {
    id: 6,
    name: 'Citrus Botanical Cooler',
    category: 'Drinks',
    filterCategory: 'Drinks',
    price: 7.50,
    rating: 4.8,
    reviewsCount: 102,
    image: '/images/drink-refresh.png',
    description: 'Sparkling cold-pressed blood orange, Japanese yuzu extract, crushed garden basil leaves, and wild wildflower honey.',
    longDescription: 'Bright, zesty, and deeply refreshing. We blend freshly pressed Sicilian blood orange juice with aromatic Japanese yuzu, hand-crushed sweet basil, raw wildflower honey, and micro-carbonated mineral water.',
    prepTime: '5 min',
    calories: '120 kcal',
    badge: 'Refreshing',
    isPopular: false,
    dietary: ['Vegan', 'Cold Pressed'],
    ingredients: ['Blood Orange Juice', 'Yuzu Extract', 'Sparkling Mineral Water', 'Crushed Basil', 'Wildflower Honey']
  },
  {
    id: 7,
    name: 'Artisan Avocado Tartine',
    category: 'Salads',
    filterCategory: 'Breakfast',
    price: 13.50,
    rating: 4.9,
    reviewsCount: 228,
    image: '/images/hero-food.png',
    description: 'Toasted country sourdough with chunky smashed Hass avocado, free-range poached egg, shaved radishes, and Aleppo chili flakes.',
    longDescription: 'A classic breakfast favorite perfected. Thick-cut naturally leavened sourdough bread toasted golden brown, layered with creamy smashed avocado, baby radishes, extra virgin olive oil, sea salt flakes, and a pasture-raised poached egg with a golden yolk.',
    prepTime: '12-15 min',
    calories: '420 kcal',
    badge: 'Morning Special',
    isPopular: true,
    dietary: ['Vegetarian', 'Organic Eggs'],
    ingredients: ['Artisan Sourdough', 'Hass Avocado', 'Pasture-Raised Egg', 'Shaved Radish', 'Aleppo Chili', 'Fleur de Sel']
  },
  {
    id: 8,
    name: 'Pan-Roasted Atlantic Salmon',
    category: 'Pasta',
    filterCategory: 'Dinner',
    price: 24.00,
    rating: 5.0,
    reviewsCount: 318,
    image: '/images/chef-special.png',
    description: 'Crispy skin Atlantic salmon fillet served over saffron herb risotto, tender grilled garden asparagus, and lemon dill emulsion.',
    longDescription: 'Sustainably wild-caught Atlantic salmon, pan-seared to crispy skin perfection with a moist, tender flake. Served atop a bed of creamy carnaroli saffron risotto and tender grilled asparagus spears, finished with fresh lemon-dill butter.',
    prepTime: '25 min',
    calories: '590 kcal',
    badge: "Chef's Special",
    isPopular: true,
    dietary: ['High Protein', 'Gluten-Free', 'Wild Caught'],
    ingredients: ['Atlantic Salmon', 'Saffron Risotto', 'Grilled Asparagus', 'Lemon Butter', 'Fresh Dill', 'Capers']
  },
  {
    id: 9,
    name: 'Classic Margherita Napoletana',
    category: 'Pizza',
    filterCategory: 'Lunch',
    price: 17.00,
    rating: 4.8,
    reviewsCount: 240,
    image: '/images/pizza.png',
    description: 'San Marzano D.O.P. tomato sauce, fresh buffalo mozzarella, fragrant sweet basil, and a swirl of extra virgin olive oil.',
    longDescription: 'The purist definition of Italian pizza. Slow fermented dough baked at searing heat with sweet San Marzano tomato pulp, fresh buffalo mozzarella from Campania, fresh garden basil, and fine Sicilian olive oil.',
    prepTime: '15 min',
    calories: '620 kcal',
    badge: 'Classic',
    isPopular: false,
    dietary: ['Vegetarian', 'Traditional'],
    ingredients: ['San Marzano Tomatoes', 'Buffalo Mozzarella', 'Fresh Sweet Basil', 'Sea Salt', 'Extra Virgin Olive Oil']
  },
  {
    id: 10,
    name: 'Crispy Truffle Smash Burger',
    category: 'Burgers',
    filterCategory: 'Dinner',
    price: 17.50,
    rating: 4.9,
    reviewsCount: 310,
    image: '/images/burger.png',
    description: 'Crispy edged beef patties, Swiss gruyère cheese, black truffle aioli, and crispy shallots on a toasted brioche bun.',
    longDescription: 'Rich and decadent smash burger with crispy lace edges, smothered in melted Swiss Gruyère, crispy fried shallots, baby arugula, and creamy black truffle mayonnaise on a butter-brushed brioche bun.',
    prepTime: '15 min',
    calories: '760 kcal',
    badge: 'Gourmet',
    isPopular: false,
    dietary: ['Angus Beef', 'Truffle Infused'],
    ingredients: ['Angus Smash Patties', 'Swiss Gruyère', 'Black Truffle Mayo', 'Crispy Fried Shallots', 'Brioche Bun']
  },
  {
    id: 11,
    name: 'Matcha Blossom Refresher',
    category: 'Drinks',
    filterCategory: 'Drinks',
    price: 6.50,
    rating: 4.7,
    reviewsCount: 89,
    image: '/images/drink.png',
    description: 'Ceremonial grade Japanese Uji matcha whisked over oat milk, subtle lavender syrup, and crushed ice.',
    longDescription: 'Authentic stone-ground Uji ceremonial matcha layered gently over velvety barista oat milk, lightly sweetened with pure botanical lavender syrup and poured over crystal-clear artisan ice.',
    prepTime: '5 min',
    calories: '140 kcal',
    badge: 'Antioxidant',
    isPopular: false,
    dietary: ['Vegan', 'Dairy-Free'],
    ingredients: ['Ceremonial Matcha', 'Organic Oat Milk', 'Lavender Essence', 'Filtered Ice']
  },
  {
    id: 12,
    name: 'Mediterranean Mezze Bowl',
    category: 'Salads',
    filterCategory: 'Lunch',
    price: 15.50,
    rating: 4.8,
    reviewsCount: 176,
    image: '/images/salad.png',
    description: 'Creamy roasted garlic hummus, crispy spiced chickpeas, marinated kalamata olives, diced cucumbers, and warm pita.',
    longDescription: 'A vibrant Mediterranean salad packed with flavor and texture. Silky homemade hummus, crunchy spiced roasted chickpeas, marinated feta, cucumber ribbons, and sun-dried tomatoes with za’atar dressing.',
    prepTime: '12 min',
    calories: '460 kcal',
    badge: 'Vegetarian',
    isPopular: false,
    dietary: ['Vegetarian', 'High Fiber'],
    ingredients: ['Roasted Garlic Hummus', 'Spiced Chickpeas', 'Kalamata Olives', 'Persian Cucumbers', 'Feta Cheese', 'Zaatar Herbs']
  }
];

export const featuredChefSpecial = {
  id: 101,
  tag: "CHEF'S SPECIAL",
  name: 'A New Dish Made With Love',
  dishName: 'Pan-Roasted Atlantic Salmon',
  description: 'Fresh ingredients, carefully selected flavors, and a recipe handcrafted by our executive chefs. Served with grilled garden asparagus and citrus herb emulsion.',
  price: 15.00,
  originalPrice: 22.00,
  rating: 4.9,
  reviewsCount: 1240,
  prepTime: '20 min',
  calories: '590 kcal',
  image: '/images/chef-special.png',
  highlights: [
    '100% Sustainably Sourced Fish',
    'Organic Micro-Herbs & Citrus',
    'Handmade Herb Butter Reduction'
  ],
  flavorProfile: {
    primary: 'Crispy & Tender Salmon',
    secondary: 'Saffron Risotto & Asparagus',
    accent: 'Lemon Dill Butter Reduction'
  }
};

export const serviceFeatures = [
  {
    id: 1,
    title: 'Online Ordering',
    description: 'Order your favorite meals quickly with real-time dish customization and seamless checkout.',
    iconName: 'ShoppingBag'
  },
  {
    id: 2,
    title: 'Catering',
    description: 'Perfect food for your special events, corporate lunches, birthdays, and private parties.',
    iconName: 'Utensils'
  },
  {
    id: 3,
    title: 'Fast Delivery',
    description: 'Fresh food delivered right to your door in eco-friendly temperature-locked containers.',
    iconName: 'Truck'
  },
  {
    id: 4,
    title: 'Membership',
    description: 'Exclusive rewards, zero-fee delivery, secret seasonal menus, and VIP table reservations.',
    iconName: 'Sparkles'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    review: 'The food was amazing and delivery was incredibly fast. The truffle pasta arrived piping hot and tasted like a 5-star restaurant dish.'
  },
  {
    id: 2,
    name: 'David Miller',
    role: 'Food Critic & Blogger',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    review: 'Foodly has redefined what modern food delivery should feel like. Pristine packaging, exceptionally fresh ingredients, and reliable service.'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Event Coordinator',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    review: 'We ordered catering for our company summit and the team was blown away. Beautifully presented dishes and super smooth ordering process.'
  }
];

export const aboutStats = [
  { value: '10+', label: 'Years Experience' },
  { value: '50+', label: 'Menu Items' },
  { value: '20K+', label: 'Happy Customers' },
  { value: '4.9', label: 'Average Rating' }
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
