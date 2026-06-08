import { supabase } from '../lib/supabaseClient'

export interface MockMenu {
  id: string
  name: string
  description: string
  price: number
  dietary_tags: string[]
  image_url?: string
}

export interface MockReview {
  id: string
  customer_name: string
  rating: number
  comment: string
  created_at: string
}

export interface MockChef {
  id: string
  kitchen_name: string
  name: string
  bio: string
  is_verified: boolean
  trust_score: number
  latitude: number
  longitude: number
  radius_limit: number
  operating_days: string[]
  area: string
  phone: string
  menus: MockMenu[]
  reviews: MockReview[]
}

export const mockChefs: MockChef[] = [
  {
    id: 'chef-sana-dha-6',
    kitchen_name: "Sana's Gourmet Kitchen",
    name: 'Sana Fatima',
    bio: 'Specializing in traditional Karachi biryani, rich chicken karahi, and fresh whole-wheat roti cooked with high hygiene standards.',
    is_verified: true,
    trust_score: 4.8,
    latitude: 24.7938,
    longitude: 67.0675,
    radius_limit: 3.0,
    operating_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    area: 'DHA Phase 6, Karachi',
    phone: '+923001112233',
    menus: [
      {
        id: 'menu-sana-1',
        name: 'Sindhi Chicken Biryani',
        description: 'Traditional aromatic rice cooked with tender chicken, potatoes, and native spices.',
        price: 350,
        dietary_tags: ['traditional', 'spicy']
      },
      {
        id: 'menu-sana-2',
        name: 'Boneless Chicken Karahi',
        description: 'Wok-cooked boneless chicken in a rich tomato, ginger, and garlic gravy.',
        price: 450,
        dietary_tags: ['classic', 'high-protein']
      },
      {
        id: 'menu-sana-3',
        name: 'Whole Wheat Roti',
        description: 'Freshly baked stoneground wheat flatbread.',
        price: 30,
        dietary_tags: ['healthy', 'low-carb']
      }
    ],
    reviews: [
      {
        id: 'rev-sana-1',
        customer_name: 'Zainab Khan',
        rating: 5,
        comment: 'Absolutely amazing Biryani! Tastes exactly like home, not too oily.',
        created_at: '2026-06-01T12:00:00Z'
      },
      {
        id: 'rev-sana-2',
        customer_name: 'Bilal Ahmed',
        rating: 4,
        comment: 'The boneless karahi was delicious, though slightly spicy. Roti was very soft.',
        created_at: '2026-06-03T19:30:00Z'
      }
    ]
  },
  {
    id: 'chef-amma-clifton-4',
    kitchen_name: "Amma's Handcrafted Spices",
    name: 'Zareen Begum',
    bio: 'Authentic Memoni dishes, Dhoklas, and home-style Daal Maash prepared with generational spice blends.',
    is_verified: true,
    trust_score: 4.9,
    latitude: 24.8138,
    longitude: 67.0281,
    radius_limit: 3.0,
    operating_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    area: 'Clifton Block 4, Karachi',
    phone: '+923004445566',
    menus: [
      {
        id: 'menu-amma-1',
        name: 'Memon Beef Khausa',
        description: 'Spaghetti noodles in a rich coconut milk curry topped with spiced beef chunks and garnishes.',
        price: 480,
        dietary_tags: ['memon', 'traditional']
      },
      {
        id: 'menu-amma-2',
        name: 'Daal Maash Fry',
        description: 'Slow-cooked white split lentils seasoned with ginger, green chilies, and a butter tarka.',
        price: 250,
        dietary_tags: ['vegetarian', 'comfort-food']
      },
      {
        id: 'menu-amma-3',
        name: 'Homemade Mango Pickle',
        description: 'Tangy, mustard-oil cured mango slices seasoned with local pickling spices.',
        price: 120,
        dietary_tags: ['condiment', 'vegetarian']
      }
    ],
    reviews: [
      {
        id: 'rev-amma-1',
        customer_name: 'Sarah Murtaza',
        rating: 5,
        comment: 'Best Khausa in Clifton. Amma uses high-quality ingredients, you can tell by the taste.',
        created_at: '2026-06-02T13:15:00Z'
      },
      {
        id: 'rev-amma-2',
        customer_name: 'Farhan Ali',
        rating: 5,
        comment: 'Simple Daal Maash was incredibly flavorful. Highly recommended for daily lunch.',
        created_at: '2026-06-04T14:00:00Z'
      }
    ]
  },
  {
    id: 'chef-healthy-gulshan-13',
    kitchen_name: 'The Healthy Plate',
    name: 'Dr. Aisha Alvi',
    bio: 'Keto-certified nutritionist preparing calorie-counted meals, low-carb options, and diabetic-friendly selections.',
    is_verified: true,
    trust_score: 4.7,
    latitude: 24.9180,
    longitude: 67.0970,
    radius_limit: 4.0,
    operating_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    area: 'Gulshan-e-Iqbal Block 13, Karachi',
    phone: '+923337778899',
    menus: [
      {
        id: 'menu-healthy-1',
        name: 'Keto Cauliflower Biryani',
        description: 'Low-carb alternative using grated cauliflower instead of rice, layered with grilled chicken.',
        price: 500,
        dietary_tags: ['keto', 'low-carb', 'weight-loss']
      },
      {
        id: 'menu-healthy-2',
        name: 'Grilled Herb Chicken Salad',
        description: 'Grilled chicken breast strips on a bed of fresh local greens, cucumbers, and olive oil vinaigrette.',
        price: 450,
        dietary_tags: ['high-protein', 'diabetic-friendly']
      },
      {
        id: 'menu-healthy-3',
        name: 'Stir-Fried Seasonal Vegetables',
        description: 'Sautéed broccoli, cabbage, carrots, and bell peppers in a low-sodium soy dressing.',
        price: 300,
        dietary_tags: ['diabetic-friendly', 'vegetarian']
      }
    ],
    reviews: [
      {
        id: 'rev-healthy-1',
        customer_name: 'Mustafa Kidwai',
        rating: 5,
        comment: 'This keto biryani changed my life! Keeps me in ketosis while satisfying my biryani cravings.',
        created_at: '2026-06-03T12:45:00Z'
      },
      {
        id: 'rev-healthy-2',
        customer_name: 'Nida Rizvi',
        rating: 4,
        comment: 'Clean, healthy portion sizes. Perfect for office lunches in Gulshan.',
        created_at: '2026-06-05T13:00:00Z'
      }
    ]
  },
  {
    id: 'chef-zareen-dha-6',
    kitchen_name: "Zareen's Bukhari Foods",
    name: 'Zareen Bukhari',
    bio: 'Home-cooked traditional delicacies including light, aromatic Mutton Pulao and home-style vegetable curries.',
    is_verified: false,
    trust_score: 4.5,
    latitude: 24.7960,
    longitude: 67.0690,
    radius_limit: 2.5,
    operating_days: ['Tue', 'Wed', 'Thu', 'Sat', 'Sun'],
    area: 'DHA Phase 6, Karachi',
    phone: '+923212233445',
    menus: [
      {
        id: 'menu-zareen-1',
        name: 'Aromatic Mutton Yakhni Pulao',
        description: 'Mutton pieces slow-cooked in mutton stock and basmati rice with mild spices.',
        price: 600,
        dietary_tags: ['traditional', 'comfort-food']
      },
      {
        id: 'menu-zareen-2',
        name: 'Aloo Bhujia Sabzi',
        description: 'Finely sliced potatoes cooked with cumin seeds, turmeric, and fresh cilantro.',
        price: 220,
        dietary_tags: ['vegetarian', 'comfort-food']
      }
    ],
    reviews: [
      {
        id: 'rev-zareen-1',
        customer_name: 'Kamran Shah',
        rating: 4,
        comment: 'Pulao was light and not greasy. Mutton was very tender.',
        created_at: '2026-06-04T20:00:00Z'
      }
    ]
  },
  {
    id: 'chef-khatri-clifton-9',
    kitchen_name: 'Khatri Special Paya',
    name: 'Razia Khatri',
    bio: 'Specializing in authentic, slow-simmered beef paya and traditional tandoori rotis.',
    is_verified: true,
    trust_score: 4.6,
    latitude: 24.8115,
    longitude: 67.0305,
    radius_limit: 3.5,
    operating_days: ['Sat', 'Sun'],
    area: 'Clifton Block 9, Karachi',
    phone: '+923008889900',
    menus: [
      {
        id: 'menu-khatri-1',
        name: 'Khatri Beef Paya',
        description: 'Traditional slow-cooked beef trotters in a rich, gelatinous spiced gravy.',
        price: 550,
        dietary_tags: ['traditional', 'spicy']
      },
      {
        id: 'menu-khatri-2',
        name: 'Tandoori Garlic Naan',
        description: 'Fluffy clay-oven naan brushed with garlic butter.',
        price: 50,
        dietary_tags: ['classic']
      }
    ],
    reviews: [
      {
        id: 'rev-khatri-1',
        customer_name: 'Omar Lodhi',
        rating: 5,
        comment: 'Outstanding weekend paya! Tastes like old Karachi breakfasts.',
        created_at: '2026-06-06T09:00:00Z'
      }
    ]
  },
  {
    id: 'chef-tadka-gulshan-5',
    kitchen_name: 'Gulshan Desi Tadka',
    name: 'Kausar Parveen',
    bio: 'Dhaba-style chicken karahi and butter tarka daals right from my household kitchen to yours.',
    is_verified: false,
    trust_score: 4.4,
    latitude: 24.9205,
    longitude: 67.0930,
    radius_limit: 3.0,
    operating_days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    area: 'Gulshan-e-Iqbal Block 5, Karachi',
    phone: '+923456677889',
    menus: [
      {
        id: 'menu-tadka-1',
        name: 'Highway Butter Chicken Karahi',
        description: 'Desi style karahi prepared with butter, black pepper, and fresh green chilies.',
        price: 420,
        dietary_tags: ['spicy', 'traditional']
      },
      {
        id: 'menu-tadka-2',
        name: 'Tarka Mash Daal',
        description: 'White lentils fried in butter with onion and red whole chili peppers.',
        price: 240,
        dietary_tags: ['traditional', 'vegetarian']
      }
    ],
    reviews: [
      {
        id: 'rev-tadka-1',
        customer_name: 'Adnan Malik',
        rating: 4,
        comment: 'Excellent spicy butter karahi. Prompt delivery in Gulshan.',
        created_at: '2026-06-07T21:00:00Z'
      }
    ]
  }
]

/**
 * Seed the Supabase database with mock Karachi chefs, profiles, and menu items.
 * If offline or configuration is missing, registers in localStorage.
 */
export async function seedMockData(forceOffline = false): Promise<{ success: boolean; mode: 'online' | 'offline'; message: string }> {
  const isEnvPresent = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY

  if (forceOffline || !isEnvPresent) {
    // Offline mode: Seed into localStorage
    localStorage.setItem('dastarkhwan_chefs', JSON.stringify(mockChefs))
    return {
      success: true,
      mode: 'offline',
      message: 'Successfully seeded 6 Karachi cooks in localStorage fallback.'
    }
  }

  try {
    // Online mode: Attempt to insert into remote database
    // We would need credentials. If the connection fails or credentials aren't correct, it will throw.
    
    // First check connection
    const { error: pingError } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    if (pingError) throw pingError

    // Seeding logic (in case we have write access)
    for (const chef of mockChefs) {
      // 1. Create a mock user in auth or profiles directly
      // Note: Direct auth creation requires admin keys, but profiles table is writable if owner or schema allows.
      // Since it's a client seed, it might fail if RLS is enabled.
      // We will perform upserts on profiles and chefs.
      
      const { error: pError } = await supabase
        .from('profiles')
        .upsert({
          id: chef.id, // Usually matches an auth user. If schema allows bypass or uses dummy ids
          name: chef.name,
          phone: chef.phone,
          role: 'chef',
          created_at: new Date().toISOString()
        })
      
      if (pError) throw pError

      const { error: cError } = await supabase
        .from('chefs')
        .upsert({
          id: chef.id,
          kitchen_name: chef.kitchen_name,
          bio: chef.bio,
          is_verified: chef.is_verified,
          trust_score: chef.trust_score,
          latitude: chef.latitude,
          longitude: chef.longitude,
          radius_limit: chef.radius_limit,
          operating_days: chef.operating_days,
          updated_at: new Date().toISOString()
        })

      if (cError) throw cError

      // Insert menus
      for (const item of chef.menus) {
        const { error: mError } = await supabase
          .from('menus')
          .upsert({
            id: item.id,
            chef_id: chef.id,
            name: item.name,
            description: item.description,
            price: item.price,
            dietary_tags: item.dietary_tags,
            created_at: new Date().toISOString()
          })
        if (mError) throw mError
      }

      // Insert reviews
      for (const rev of chef.reviews) {
        // Since customer_id is a FK, we might fail unless we create customer profiles.
        // We will insert reviews with a dummy customer_id or catch it
        try {
          // Creating a dummy customer profile if not exists
          const dummyCustomerId = `cust-${rev.customer_name.toLowerCase().replace(/\s+/g, '-')}`
          await supabase.from('profiles').upsert({
            id: dummyCustomerId,
            name: rev.customer_name,
            role: 'customer'
          })

          await supabase.from('reviews').upsert({
            id: rev.id,
            customer_id: dummyCustomerId,
            chef_id: chef.id,
            rating: rev.rating,
            comment: rev.comment,
            created_at: rev.created_at
          })
        } catch (rErr) {
          console.warn('Could not insert review in online DB, skipping review item:', rev.id, rErr)
        }
      }
    }

    return {
      success: true,
      mode: 'online',
      message: 'Successfully seeded 6 Karachi cooks in remote Supabase tables.'
    }
  } catch (err: any) {
    console.error('Online seed failed, falling back to localStorage:', err.message || err)
    localStorage.setItem('dastarkhwan_chefs', JSON.stringify(mockChefs))
    return {
      success: true,
      mode: 'offline',
      message: `Database seeding fallback to local: ${err.message || 'connection issue'}`
    }
  }
}
