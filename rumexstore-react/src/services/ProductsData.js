//import { http } from "./http";

export const products = [
  {
    categoryId: 1,
    productId: 1,
    details: {
      productImage: 'product-image.png',
      productImageLarge: 'product-image-lg.png',
      productImageThumb: 'product-thumb.png',
      ModelName: 'Communications Device',
      Description:
        'Subversively stay in touch with this miniaturized wireless communications device. Speak into the pointy end and listen with the other end! Voice-activated dialing makes calling for backup a breeze. Excellent for undercover work at schools, rest homes, and most corporate headquarters. Comes in assorted colors.',
      ModelNumber: 'RED1',
    },
    unitCost: 49.99,
    currentPrice: 49.99,
    unitsInStock: 2,
    IsFeatured: true,
    created: new Date(),
  },
  {
    categoryId: 1,
    productId: 2,
    details: {
      productImage: 'product-image.png',
      productImageLarge: 'product-image-lg.png',
      productImageThumb: 'product-thumb.png',
      ModelName: 'Persuasive Pencil',
      Description:
        "Persuade anyone to see your point of view!  Captivate your friends and enemies alike!  Draw the crime-scene or map out the chain of events.  All you need is several years of training or copious amounts of natural talent. You're halfway there with the Persuasive Pencil. Purchase this item with the Retro Pocket Protector Rocket Pack for optimum disguise.",
      ModelNumber: 'LK4TLNT',
    },
    unitCost: 1.99,
    currentPrice: 1.99,
    unitsInStock: 5,
    created: new Date(),
  },
];

export const categories = [
  {
    id: 1,
    categoryName: 'Communications',
    products: [
      {
        productId: 1,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Communications Device',
          Description:
            'Subversively stay in touch with this miniaturized wireless communications device. Speak into the pointy end and listen with the other end! Voice-activated dialing makes calling for backup a breeze. Excellent for undercover work at schools, rest homes, and most corporate headquarters. Comes in assorted colors.',
          ModelNumber: 'RED1',
        },
        unitCost: 49.99,
        currentPrice: 49.99,
        unitsInStock: 2,
        IsFeatured: true,
        created: new Date(),
      },
      {
        productId: 2,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Persuasive Pencil',
          Description:
            "Persuade anyone to see your point of view!  Captivate your friends and enemies alike!  Draw the crime-scene or map out the chain of events.  All you need is several years of training or copious amounts of natural talent. You're halfway there with the Persuasive Pencil. Purchase this item with the Retro Pocket Protector Rocket Pack for optimum disguise.",
          ModelNumber: 'LK4TLNT',
        },
        unitCost: 1.99,
        currentPrice: 1.99,
        unitsInStock: 5,
        created: new Date(),
      },
      {
        productId: 3,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Nonexplosive Cigar',
          Description:
            'Contrary to popular spy lore, not all cigars owned by spies explode! Best used during mission briefings, our Nonexplosive Cigar is really a cleverly-disguised, top-of-the-line, precision laser pointer. Make your next presentation a hit.',
          ModelNumber: 'LSRPTR1',
        },
        unitCost: 29.99,
        currentPrice: 29.99,
        unitsInStock: 5,
      },
      {
        productId: 4,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Fake Moustache Translator',
          Description:
            'Fake Moustache Translator attaches between nose and mouth to double as a language translator and identity concealer. Sophisticated electronics translate your voice into the desired language. Wriggle your nose to toggle between Spanish, English, French, and Arabic. Excellent on diplomatic missions.',
          ModelNumber: 'TCKLR1',
        },
        unitCost: 599.99,
        currentPrice: 599.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 5,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Interpreter Earrings',
          Description:
            "The simple elegance of our stylish monosex earrings accents any wardrobe, but their clean lines mask the sophisticated technology within. Twist the lower half to engage a translator function that intercepts spoken words in any language and converts them to the wearer's native tongue. Warning: do not use in conjunction with our Fake Moustache Translator product, as the resulting feedback loop makes any language sound like Pig Latin.",
          ModelNumber: 'JWLTRANS6',
        },
        unitCost: 459.99,
        currentPrice: 459.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 2,
    categoryName: 'Deception',
    products: [
      {
        productId: 6,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Counterfeit Creation Wallet',
          Description:
            "Don't be caught penniless in Prague without this hot item! Instantly creates replicas of most common currencies! Simply place rocks and water in the wallet, close, open up again, and remove your legal tender!",
          ModelNumber: 'DNTGCGHT',
        },
        unitCost: 999.99,
        currentPrice: 999.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 7,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Cloaking Device',
          Description:
            'Worried about detection on your covert mission? Confuse mission-threatening forces with this cloaking device. Powerful new features include string-activated pre-programmed phrases such as "Danger! Danger!", "Reach for the sky!", and other anti-enemy expressions. Hyper-reactive karate chop action deters even the most persistent villain.',
          ModelNumber: 'CITSME9',
        },
        unitCost: 9999.99,
        currentPrice: 9999.99,
        unitsInStock: 5,
      },
      {
        productId: 8,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Indentity Confusion Device',
          Description:
            'Never leave on an undercover mission without our Identity Confusion Device! If a threatening person approaches, deploy the device and point toward the oncoming individual. The subject will fail to recognize you and let you pass unnoticed. Also works well on dogs.',
          ModelNumber: 'BME007',
        },
        unitCost: 6.99,
        currentPrice: 6.99,
        unitsInStock: 5,
      },
      {
        productId: 9,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Correction Fluid',
          Description:
            "Disguised as typewriter correction fluid, this scientific truth serum forces subjects to correct anything not perfectly true. Simply place a drop of the special correction fluid on the tip of the subject's nose. Within seconds, the suspect will automatically correct every lie. Effects from Correction Fluid last approximately 30 minutes per drop. WARNING: Discontinue use if skin appears irritated.",
          ModelNumber: 'BHONST93',
        },
        unitCost: 1.99,
        currentPrice: 1.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 10,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Hologram Cufflinks',
          Description:
            "Just point, and a turn of the wrist will project a hologram of you up to 100 yards away. Sneaking past guards will be child's play when you've sent them on a wild goose chase. Note: Hologram adds ten pounds to your appearance.",
          ModelNumber: 'THNKDKE1',
        },
        unitCost: 799.99,
        currentPrice: 799.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 3,
    categoryName: 'Travel',
    products: [
      {
        productId: 11,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Rain Racer 2000',
          Description:
            "Looks like an ordinary bumbershoot, but don't be fooled! Simply place Rain Racer's tip on the ground and press the release latch. Within seconds, this ordinary rain umbrella converts into a two-wheeled gas-powered mini-scooter. Goes from 0 to 60 in 7.5 seconds - even in a driving rain! Comes in black, blue, and candy-apple red.",
          ModelNumber: 'RU007',
        },
        unitCost: 1499.99,
        currentPrice: 1499.99,
        unitsInStock: 5,
      },
      {
        productId: 12,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Escape Vehicle (Air)',
          Description:
            'In a ja, need a quick escape? Just whip out a sheet of our patented P38 paper and, with a few quick folds, it converts into a lighter-than-air escape vehicle! Especially effective on windy days - no fuel required. Comes in several sizes including letter, legal, A10, and B52.',
          ModelNumber: 'P38',
        },
        unitCost: 2.99,
        currentPrice: 2.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 13,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Escape Vehicle (Water)',
          Description:
            "Camouflaged as stylish wing tips, these 'shoes' get you out of a jam on the high seas instantly. Exposed to water, the pair transforms into speedy miniature inflatable rafts. Complete with 76 HP outboard motor, these hip heels will whisk you to safety even in the roughest of seas. Warning: Not recommended for beachwear.",
          ModelNumber: 'PT109',
        },
        unitCost: 1299.99,
        currentPrice: 1299.99,
        unitsInStock: 5,
      },
      {
        productId: 14,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Toaster Boat',
          Description:
            "Turn breakfast into a high-speed chase! In addition to toasting bagels and breakfast pastries, this inconspicuous toaster turns into a speedboat at the touch of a button. Boasting top speeds of 60 knots and an ultra-quiet motor, this valuable item will get you where you need to be ... fast! Best of all, Toaster Boat is easily repaired using a Versatile Paperclip or a standard butter knife. Manufacturer's Warning: Do not submerge electrical items.",
          ModelNumber: 'DNTRPR',
        },
        unitCost: 19999.98,
        currentPrice: 19999.98,
        unitsInStock: 5,
      },
      {
        productId: 15,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Global Navigational System',
          Description:
            'No spy should be without one of these premium devices. Determine your exact location with a quick flick of the finger. Calculate destination points by spinning, closing your eyes, and stopping it with your index finger.',
          ModelNumber: 'WRLD00',
        },
        unitCost: 29.99,
        currentPrice: 29.99,
        unitsInStock: 1,
        IsFeatured: true,
      },
      {
        productId: 16,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Escape Cord',
          Description:
            "Any agent assigned to mountain terrain should carry this ordinary-looking extension cord ... except that it's really a rappelling rope! Pull quickly on each end to convert the electrical cord into a rope capable of safely supporting up to two agents. Comes in various sizes including Mt McKinley, Everest, and Kilimanjaro. WARNING: To prevent serious injury, be sure to disconnect from wall socket before use.",
          ModelNumber: 'LNGWADN',
        },
        unitCost: 13.99,
        currentPrice: 13.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 4,
    categoryName: 'Protection',
    products: [
      {
        productId: 17,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Multi-Purpose Towelette',
          Description:
            "Don't leave home without your monogrammed towelette! Made from lightweight, quick-dry fabric, this piece of equipment has more uses in a spy's day than a Swiss Army knife. The perfect all-around tool while undercover in the locker room: serves as towel, shield, disguise, sled, defensive weapon, whip and emergency food source. Handy bail gear for the Toaster Boat. Monogram included with purchase price.",
          ModelNumber: 'TGFDA',
        },
        unitCost: 12.99,
        currentPrice: 12.99,
        unitsInStock: 5,
      },
      {
        productId: 18,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Pocket Protector Rocket Pack',
          Description:
            "Any debonair spy knows that this accoutrement is coming back in style. Flawlessly protects the pockets of your short-sleeved oxford from unsightly ink and pencil marks. But there's more! Strap it on your back and it doubles as a rocket pack. Provides enough turbo-thrust for a 250-pound spy or a passel of small children. Maximum travel radius: 3000 miles.",
          ModelNumber: 'LKARCKT',
        },
        unitCost: 1.99,
        currentPrice: 1.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 19,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Guard Dog Pacifier',
          Description:
            "Pesky guard dogs become a spy's best friend with the Guard Dog Pacifier. Even the most ferocious dogs suddenly act like cuddly kittens when they see this prop.  Simply hold the device in front of any threatening dogs, shaking it mildly.  For tougher canines, a quick squeeze emits an irresistible squeak that never fails to  place the dog under your control.",
          ModelNumber: 'SQUKY1',
        },
        unitCost: 14.99,
        currentPrice: 14.99,
        unitsInStock: 5,
      },
      {
        productId: 20,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Ultra Violet Attack Defender',
          Description:
            'Be safe and suave. A spy wearing this trendy article of clothing is safe from ultraviolet ray-gun attacks. Worn correctly, the Defender deflects rays from ultraviolet weapons back to the instigator. As a bonus, also offers protection against harmful solar ultraviolet rays, equivalent to SPF 50.',
          ModelNumber: 'SHADE01',
        },
        unitCost: 89.99,
        currentPrice: 89.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 21,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Cocktail Party Pal',
          Description:
            "Do your assignments have you flitting from one high society party to the next? Worried about keeping your wits about you as you mingle witih the champagne-and-caviar crowd? No matter how many drinks you're offered, you can safely operate even the most complicated heavy machinery as long as you use our model 1MOR4ME alcohol-neutralizing coaster. Simply place the beverage glass on the patented circle to eliminate any trace of alcohol in the drink.",
          ModelNumber: '1MOR4ME',
        },
        unitCost: 69.99,
        currentPrice: 69.99,
        unitsInStock: 5,
      },
      {
        productId: 22,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Bullet Proof Facial Tissue',
          Description:
            'Being a spy can be dangerous work. Our patented Bulletproof Facial Tissue gives a spy confidence that any bullets in the vicinity risk-free. Unlike traditional bulletproof devices, these lightweight tissues have amazingly high tensile strength. To protect the upper body, simply place a tissue in your shirt pocket. To protect the lower body, place a tissue in your pants pocket. If you do not have any pockets, be sure to check out our Bulletproof Tape. 100 tissues per box. WARNING: Bullet must not be moving for device to successfully stop penetration.',
          ModelNumber: 'BSUR2DUC',
        },
        unitCost: 79.99,
        currentPrice: 79.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 5,
    categoryName: 'Munitions',
    products: [
      {
        productId: 23,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Multi-Purpose Rubber Band',
          Description:
            'One of our most popular items!  A band of rubber that stretches  20 times the original size. Uses include silent one-to-one communication across a crowded roo, holding together a pack of Persuasive Pencils, and powering lightweight aircraft. Beware, stretching past 20 feet results in a painful snap and a rubber strip.',
          ModelNumber: 'NTMBS1',
        },
        unitCost: 1.99,
        currentPrice: 1.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 24,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'The Incredible Versatile Paperclip',
          Description:
            "This 0. 01 oz piece of metal is the most versatile item in any respectable spy's toolbox and will come in handy in all sorts of situations. Serves as a wily lock pick, aerodynamic projectile (used in conjunction with Multi-Purpose Rubber Band), or escape-proof finger cuffs.  Best of all, small size and pliability means it fits anywhere undetected.  Order several today!",
          ModelNumber: 'INCPPRCLP',
        },
        unitCost: 1.49,
        currentPrice: 1.49,
        unitsInStock: 5,
      },
      {
        productId: 25,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Mighty Mighty Pen',
          Description:
            'Some spies claim this item is more powerful than a sword. After examining the titanium frame, built-in blowtorch, and Nerf dart-launcher, we tend to agree! ',
          ModelNumber: 'WOWPEN',
        },
        unitCost: 129.99,
        currentPrice: 129.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 6,
    categoryName: 'Tools',
    products: [
      {
        productId: 26,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Extracting Tool',
          Description:
            'High-tech miniaturized extracting tool. Excellent for extricating foreign objects from your person. Good for picking up really tiny stuff, too! Cleverly disguised as a pair of tweezers. ',
          ModelNumber: 'NOZ119',
        },
        unitCost: 199,
        currentPrice: 199,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 27,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Universal Repair System',
          Description:
            'Few people appreciate the awesome repair possibilities contained in a single roll of duct tape. In fact, some houses in the Midwest are made entirely out of the miracle material contained in every roll! Can be safely used to repair cars, computers, people, dams, and a host of other items.',
          ModelNumber: 'NE1RPR',
        },
        unitCost: 4.99,
        currentPrice: 4.99,
        unitsInStock: 5,
      },
      {
        productId: 28,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Effective Flashlight',
          Description:
            'The most powerful darkness-removal device offered to creatures of this world.  Rather than amplifying existing/secondary light, this handy product actually REMOVES darkness allowing you to see with your own eyes.  Must-have for nighttime operations. An affordable alternative to the Night Vision Goggles.',
          ModelNumber: 'BRTLGT1',
        },
        unitCost: 9.99,
        currentPrice: 9.99,
        unitsInStock: 5,
      },
      {
        productId: 29,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Eavesdrop Detector',
          Description:
            'Worried that counteragents have placed listening devices in your home or office? No problem! Use our bug-sweeping wiener to check your surroundings for unwanted surveillance devices. Just wave the frankfurter around the room ... when bugs are detected, this "foot-long" beeps! Comes complete with bun, relish, mustard, and headphones for privacy.',
          ModelNumber: 'FF007',
        },
        unitCost: 99.99,
        currentPrice: 99.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 30,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Rubber Stamp Beacon',
          Description:
            "With the Rubber Stamp Beacon, you'll never get lost on your missions again. As you proceed through complicated terrain, stamp a stationary object with this device. Once an object has been stamped, the stamp's patented ink will emit a signal that can be detected up to 153.2 miles away by the receiver embedded in the device's case. WARNING: Do not expose ink to water.",
          ModelNumber: 'ULOST007',
        },
        unitCost: 129.99,
        currentPrice: 129.99,
        unitsInStock: 5,
      },
      {
        productId: 31,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Dilemma Resolution Device',
          Description:
            'Facing a brick wall? Stopped short at a long, sheer cliff wall?  Carry our handy lightweight calculator for just these emergencies. Quickly enter in your dilemma and the calculator spews out the best solutions to the problem.   Manufacturer Warning: Use at own risk. Suggestions may lead to adverse outcomes.',
          ModelNumber: 'BPRECISE00',
        },
        unitCost: 11.99,
        currentPrice: 11.99,
        unitsInStock: 5,
      },
      {
        productId: 32,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Multi-Purpose Watch',
          Description:
            'In the tradition of famous spy movies, the Multi Purpose Watch comes with every convenience! Installed with lighter, TV, camera, schedule-organizing software, MP3 player, water purifier, spotlight, and tire pump. Special feature: Displays current date and time. Kitchen sink add-on will be available in the fall of 2001.',
          ModelNumber: 'GRTWTCH9',
        },
        unitCost: 399.99,
        currentPrice: 399.99,
        unitsInStock: 5,
      },
    ],
  },
  {
    id: 7,
    categoryName: 'General',
    products: [
      {
        productId: 33,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Edible Tape',
          Description:
            'The latest in personal survival gear, the STKY1 looks like a roll of ordinary office tape, but can save your life in an emergency.  Just remove the tape roll and place in a kettle of boiling water with mixed vegetables and a ham shank. In just 90 minutes you have a great tasking soup that really sticks to your ribs! Herbs and spices not included.',
          ModelNumber: 'STKY1',
        },
        unitCost: 3.99,
        currentPrice: 3.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 34,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Perfect-Vision Glasses',
          Description:
            'Avoid painful and potentially devastating laser eye surgery and contact lenses. Cheaper and more effective than a visit to the optometrist, these Perfect-Vision Glasses simply slide over nose and eyes and hook on ears. Suddenly you have 20/20 vision! Glasses also function as HUD (Heads Up Display) for most European sports cars manufactured after 1992.',
          ModelNumber: 'ICNCU',
        },
        unitCost: 129.99,
        currentPrice: 129.99,
        unitsInStock: 5,
      },
      {
        productId: 35,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Survival Bar',
          Description:
            "Survive for up to four days in confinement with this handy item. Disguised as a common eraser, it's really a high-calorie food bar. Stranded in hostile territory without hope of nourishment? Simply break off a small piece of the eraser and chew vigorously for at least twenty minutes. Developed by the same folks who created freeze-dried ice crea, powdered drink mix, and glow-in-the-dark shoelaces.",
          ModelNumber: 'CHEW99',
        },
        unitCost: 6.99,
        currentPrice: 6.99,
        unitsInStock: 5,
      },
      {
        productId: 36,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Remote Foliage Feeder',
          Description:
            'Even spies need to care for their office plants.  With this handy remote watering device, you can water your flowers as a spy should, from the comfort of your chair.  Water your plants from up to 50 feet away.  Comes with an optional aiming system that can be mounted to the top for improved accuracy.',
          ModelNumber: 'SQRTME1',
        },
        unitCost: 9.99,
        currentPrice: 9.99,
        unitsInStock: 5,
      },
      {
        productId: 37,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Contact Lenses',
          Description:
            'Traditional binoculars and night goggles can be bulky, especially for assignments in confined areas. The problem is solved with these patent-pending contact lenses, which give excellent visibility up to 100 miles. New feature: now with a night vision feature that permits you to see in complete darkness! Contacts now come in a variety of fashionable colors for coordinating with your favorite ensembles.',
          ModelNumber: 'ICUCLRLY00',
        },
        unitCost: 59.99,
        currentPrice: 59.99,
        unitsInStock: 5,
      },
      {
        productId: 38,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Telekinesis Spoon',
          Description:
            'Learn to move things with your mind! Broaden your mental powers using this training device to hone telekinesis skills. Simply look at the device, concentrate, and repeat "There is no spoon" over and over.',
          ModelNumber: 'OPNURMIND',
        },
        unitCost: 2.99,
        currentPrice: 2.99,
        unitsInStock: 5,
        IsFeatured: true,
      },
      {
        productId: 39,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Speed Bandages',
          Description:
            'Even spies make mistakes.  Barbed wire and guard dogs pose a threat of injury for the active spy.  Use our special bandages on cuts and bruises to rapidly heal the injury.  Depending on the severity of the wound, the bandages can take between 10 to 30 minutes to completely heal the injury.',
          ModelNumber: 'NOBOOBOO4U',
        },
        unitCost: 3.99,
        currentPrice: 3.99,
        unitsInStock: 5,
      },
      {
        productId: 40,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Document Transportation System',
          Description:
            "Keep your stolen Top Secret documents in a place they'll never think to look!  This patent leather briefcase has multiple pockets to keep documents organized.  Top quality craftsmanship to last a lifetime.",
          ModelNumber: 'QLT2112',
        },
        unitCost: 299.99,
        currentPrice: 299.99,
        unitsInStock: 5,
      },
      {
        productId: 41,
        details: {
          productImage: 'product-image.png',
          productImageLarge: 'product-image-lg.png',
          productImageThumb: 'product-thumb.png',
          ModelName: 'Telescoping Comb',
          Description:
            'Use the Telescoping Comb to track down anyone, anywhere! Deceptively simple, this is no normal comb. Flip the hidden switch and two telescoping lenses project forward creating a surprisingly powerful set of binoculars (50X). Night-vision add-on is available for midnight hour operations.',
          ModelNumber: 'C00LCMB1',
        },
        unitCost: 399.99,
        currentPrice: 399.99,
        unitsInStock: 5,
      },
    ],
  },
];

// const wait = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// export const getAllCategories = async () => {
//   await wait(50);
//   return categories;
// };
export const getAllCategories = async () => {
  let allCategories = [];
  const response = await fetch('https://localhost:7092/api/Category');
  allCategories = await response.json();
  return allCategories;
};

export const getCategory = async (categoryId) => {
  let category = {};
  let request = `https://localhost:7092/api/Category/${categoryId}`;
  const response = await fetch(request);
  category = await response.json();
  return category;
};

// export const getFeaturedProducts = async () => {
//   await wait(50);
//   return products;
// };

export const getFeaturedProducts = async () => {
  let featuredProducts = [];
  const response = await fetch('https://localhost:7092/api/Product/featured');
  featuredProducts = await response.json();
  return featuredProducts;
};

export const getProduct = async (productId) => {
  let product = null;
  let request = `https://localhost:7092/api/Product/${productId}`;
  const response = await fetch(request);
  product = await response.json();
  return product;
};
export const getProducts = async (categoryId) => {
  let products = [];
  let request = `https://localhost:7092/api/Category/${categoryId}/products`;
  const response = await fetch(request);
  products = await response.json();
  return products;
};
// export const Active = (selectedCategoryId, categoryId) => {
//   return selectedCategoryId === categoryId ? ' active' : '';
// };
export const Active = (selectedId, Id) => {
  return selectedId === Id ? ' active' : '';
};
export const truncate = (str, n, useWordBoundary) => {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(' '))
      : subString) + '...'
  );
};
export const Picture = () => {
  let pictures = [
    'https://st.depositphotos.com/13053202/54754/i/600/depositphotos_547543394-stock-photo-hand-holding-new-iphone-13.jpg',
    'https://img.freepik.com/premium-psd/realistic-iphone-14-pro-max-3d-smartphone-screen-mockup-template-with-editable-background-psd_349001-533.jpg?size=626&ext=jpg&ga=GA1.1.2008385313.1674322045',
    'https://images.unsplash.com/photo-1664478711535-fd3cc5d1a99a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTQlMjBwcm98ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1635310568932-47fd9c961c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ4NTQ2MjM&ixlib=rb-1.2.1&q=80&w=400',
    'https://images.unsplash.com/photo-1635310568932-47fd9c961c26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ4NTQ2MjM&ixlib=rb-1.2.1&q=80&w=400',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.jpg',
    'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/14.jpg',
    'https://www.freepnglogos.com/uploads/jeans-png/jeans-mens-pants-cliparts-download-clip-art-37.png',
    'https://www.freepnglogos.com/uploads/t-shirt-png/t-shirt-png-printed-shirts-south-africa-20.png',
    'https://www.freepnglogos.com/uploads/belts-png/casual-dress-belts-for-men-28.png',
    'https://www.freepnglogos.com/uploads/women-shoes-png/download-women-shoes-png-image-png-image-pngimg-2.png',
    'https://www.freepnglogos.com/uploads/shoes-png/find-your-perfect-running-shoes-26.png',
    'https://www.freepnglogos.com/uploads/notebook-png/download-laptop-notebook-png-image-png-image-pngimg-2.png',
    'https://www.freepnglogos.com/uploads/notebook-png/notebook-laptop-png-images-you-can-download-mashtrelo-14.png',
    'https://www.freepnglogos.com/uploads/money-png/money-wallet-dollar-image-money-pictures-download-27.png',
    'http://orig11.deviantart.net/6356/f/2010/156/e/f/swallowed_by_nature_by_danutza88.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/20.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/28.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/5.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/6.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/7.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/8.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/9.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/17.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/18.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/19.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/21.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/22.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/23.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/24.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/25.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/26.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/27.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/1.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/2.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/3.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/4.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/10.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/11.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/29.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/30.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/31.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/32.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/16.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/14.jpg',
    'https://mdbootstrap.com/img/Photos/Others/images/15.jpg',
    'https://picsum.photos/200',
    'https://picsum.photos/250',
    'https://i.imgur.com/w2rCsEw.jpg',
    'https://i.imgur.com/ZRUetRF.jpg',
    'https://i.imgur.com/0M7pldG.jpg',
    'https://i.imgur.com/emb60L5.jpg',
    'https://i.imgur.com/gGyOciQ.jpg',
    'https://i.imgur.com/3VuD1Ij.jpg',
    'https://i.imgur.com/psvQPza.jpg',
    'https://i.imgur.com/5l1bL3Y.jpg',
    'https://i.imgur.com/9StAn6x.jpg',
    'https://i.imgur.com/Dhebu4F.jpg',
    ///
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239782/ecommerce-furniture/simple-dining-table-1813502.jpg',
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239782/ecommerce-furniture/black-kettle-beside-condiment-shakers-and-green-fruits-and-1080696.jpg',
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239782/ecommerce-furniture/apartment-chairs-clean-contemporary-534172.jpg',
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239781/ecommerce-furniture/cabinet-contemporary-cups-decoration-279618.jpg',
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239782/ecommerce-furniture/office-chair-and-desk-1957477.jpg',
    'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574239781/ecommerce-furniture/apartment-armchair-chair-coffee-table-1148955.jpg',
  ];
  let index = Math.floor(Math.random() * pictures.length);
  return pictures[index];
};

export const MainLabel = (weight = 0.5) => {
  let weightedResult = WeightedResult(weight);
  let labels = [
    { label: 'New', color: 'yellow' },
    { label: 'Sale', color: 'red' },
  ];
  if (weightedResult) {
    let index = Math.floor(Math.random() * labels.length);
    return labels[index];
  }
  return '';
};
export const SalePercentage = (weight = 0.5) => {
  let weightedResult = WeightedResult(weight);
  let labels = [10, 25, 30, 40, 50, 75];
  if (weightedResult) {
    let index = Math.floor(Math.random() * labels.length);
    return labels[index];
  }
  return '';
};
export const MainLabelType = () => {
  let types = ['', 'general', 'sale'];
  let index = Math.floor(Math.random() * types.length);
  return types[index];
};
export const weightedCoinFlip = (weight) => Math.random() <= weight;
export const WeightedResult = (weight = 0.5) => {
  const LIMIT = 100;
  let arr = Array.from({ length: LIMIT }, () => weightedCoinFlip(weight));
  // let occurrences = arr.reduce(
  //   (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
  //   {},
  // );
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
export const RandomLabel = (weight = 0.5) => {
  let weightedResult = WeightedResult(weight);
  let labels = [
    {
      label: 'Coming Soon',
      color: 'red',
    },
    { label: '10 in Stock', color: 'black' },
    { label: 'Free Shipping', color: 'green' },
    { label: 'Satisfaction Guaranteed', color: 'red' },
    { label: 'Special Offer', color: 'red' },
    { label: 'Premium Quality', color: 'purple' },
    { label: 'Limited Edition', color: 'red' },
    { label: 'Best Seller', color: 'orange' },
    { label: 'Staff Pick', color: 'green' },
    { label: 'Best Rated', color: 'green' },
    { label: '1 Year Warranty', color: 'red' },
    { label: 'New Collection', color: 'yellow' },
    { label: 'Last Minute Offer', color: 'red' },
    { label: 'Hard to Find', color: 'blue' },
    { label: 'Special', color: 'green' },
    { label: 'New Item', color: 'yellow' },
    { label: 'Doorbuster', color: 'red' },
    { label: 'Low Stock', color: 'black' },
    { label: 'Coming Soon', color: 'orange' },
    { label: 'Trending', color: 'red' },
    { label: 'Promo', color: 'red' },
    { label: 'Hot Deals', color: 'red' },
    { label: 'Limited Release', color: 'red' },
    { label: 'Price Drop', color: 'orange' },
    { label: 'Clearance', color: 'yellow' },
    { label: 'Reduced Price', color: 'red' },
    { label: 'Recycled', color: 'green' },
  ];
  if (weightedResult) {
    let index = Math.floor(Math.random() * labels.length);
    return labels[index];
  }
  return '';
};
export const RandomRating = (maxCount = 70, weight = 0.5) => {
  let weightedResult = WeightedResult(weight);
  if (weightedResult) {
    let rating = {};
    rating.count = 10 + Math.floor(Math.random() * maxCount);
    rating.average = (Math.random() * 3 + 2).toFixed(2);
    return rating;
  }
  return '';
};
