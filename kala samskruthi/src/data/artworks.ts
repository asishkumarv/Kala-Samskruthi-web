import art7 from "@/assets/art7.jpg";
import art8 from "@/assets/art8.jpg";
import art9 from "@/assets/art9.jpg";
import art27 from "@/assets/art27.jpg";
import art28 from "@/assets/art28.jpg";
import art10 from "@/assets/art10.jpg";
import art11 from "@/assets/art11.jpg";
import art12 from "@/assets/art12.jpg";
import art13 from "@/assets/art13.jpg";
import art14 from "@/assets/art14.jpg";
import art15 from "@/assets/art15.jpg";
import art16 from "@/assets/art16.jpg";
import art17 from "@/assets/art17.jpg";
import art18 from "@/assets/art18.jpg";
import art19 from "@/assets/art19.jpg";
import art20 from "@/assets/art20.jpg";
import art21 from "@/assets/art21.jpg";
import art22 from "@/assets/art22.jpg";
import art23 from "@/assets/art23.jpg";
import art24 from "@/assets/art24.jpg";
import art25 from "@/assets/art25.jpg";
import art26 from "@/assets/art26.jpg";

export type Review = {
  name: string;
  rating: number;
  date: string;
  comment: string;
};

export type FrameSize = {
  label: string;
  dimensions: string;
};

export type Artwork = {
  id: number;
  name: string;
  category: string;
  artist: string;
  price: number;
  originalPrice: number;
  rating: number;
  size: string;
  image: string;
  images: string[];
  description: string;
  material: string;
  stock: number;
  frameSizes: FrameSize[];
  reviews: Review[];
};

export const artworks: Artwork[] = [
  {
    id: 7, name: "Ram Darbar Relief", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 35999, originalPrice: 44999, rating: 4.9, size: "36×48 inches",
    image: art7, images: [art7, art8, art9, art10],
    description: "A majestic wood-tone relief sculpture of Ram Darbar featuring Lord Rama, Sita, Lakshmana, and Hanuman. Exquisitely carved with traditional temple-style framing and intricate ornamental details.",
    material: "Fiberglass, wood finish, hand-painted details", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Suresh V.", rating: 5, date: "1 March 2026", comment: "Absolutely divine! The detailing on each figure is beyond words." },
      { name: "Gayatri S.", rating: 5, date: "15 February 2026", comment: "Museum-quality craftsmanship. A true devotional masterpiece." },
      { name: "Mohan K.", rating: 5, date: "28 January 2026", comment: "Perfect for our pooja room. The wood finish is stunning." },
    ],
  },
  {
    id: 8, name: "Radha Krishna Vrindavan", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 28999, originalPrice: 37999, rating: 4.8, size: "48×30 inches",
    image: art8, images: [art8, art9, art7, art11],
    description: "A breathtaking 3D mural depicting Radha and Krishna in the lush forests of Vrindavan, surrounded by cows, deer, and ancient trees. Each element is sculpted in high relief with vibrant hand-painted colors.",
    material: "Fiberglass, acrylic paints, lacquer finish", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "48×30" }, { label: "Large", dimensions: "56×36" }, { label: "Grand", dimensions: "64×42" }],
    reviews: [
      { name: "Nandini R.", rating: 5, date: "20 February 2026", comment: "The 3D effect is incredible. Looks alive on the wall!" },
      { name: "Vikram P.", rating: 4, date: "10 February 2026", comment: "Rich colors and beautiful composition. Great value for money." },
      { name: "Latha M.", rating: 5, date: "1 February 2026", comment: "Every visitor stops to admire this piece. Truly exceptional art." },
    ],
  },
  {
    id: 9, name: "Radha Krishna Moonlight", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 32999, originalPrice: 42999, rating: 4.9, size: "36×36 inches",
    image: art9, images: [art9, art8, art7, art12],
    description: "An enchanting 3D mural of Radha and Krishna with a glowing moon, peacock, and sacred cow. The intricate detailing includes jewel-encrusted ornaments and flowing garments in rich, jewel-toned colors.",
    material: "Fiberglass, semi-precious stone accents, hand-painted", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "36×36" }, { label: "Large", dimensions: "42×42" }, { label: "Grand", dimensions: "48×48" }],
    reviews: [
      { name: "Padma D.", rating: 5, date: "5 March 2026", comment: "The moonlight glow effect is magical. Truly a divine piece." },
      { name: "Arjun T.", rating: 5, date: "18 February 2026", comment: "Gifted to my parents — they were speechless with joy!" },
      { name: "Kamala V.", rating: 5, date: "8 February 2026", comment: "Exquisite craftsmanship. The stone accents add real elegance." },
    ],
  },
  {
    id: 10, name: "Krishna Divine Elegance", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 22999, originalPrice: 29999, rating: 4.8, size: "30×42 inches",
    image: art10, images: [art10, art9, art11, art7],
    description: "A serene ivory-and-gold relief sculpture of Lord Krishna playing the flute, surrounded by lotus blossoms, a graceful swan, and ornamental foliage. The monochromatic palette with gold highlights creates an aura of divine elegance.",
    material: "Fiberglass, gold leaf accents, ivory-tone finish", stock: 4,
    frameSizes: [{ label: "Standard", dimensions: "30×42" }, { label: "Large", dimensions: "36×48" }, { label: "Grand", dimensions: "42×56" }],
    reviews: [
      { name: "Shanti B.", rating: 5, date: "12 March 2026", comment: "The ivory-gold combination is absolutely divine. So peaceful." },
      { name: "Ravi K.", rating: 4, date: "25 February 2026", comment: "Beautiful piece with a calming presence. Very well crafted." },
      { name: "Anuradha S.", rating: 5, date: "10 February 2026", comment: "The gold leaf accents catch light beautifully. Stunning artwork." },
    ],
  },
  {
    id: 11, name: "Radha Krishna Forest Scene", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 26999, originalPrice: 34999, rating: 4.7, size: "48×36 inches",
    image: art11, images: [art11, art8, art12, art9],
    description: "A vivid 3D mural art depicting Radha and Krishna walking through a lush forest with a sacred white cow. The scene is brought to life with vibrant colors, detailed foliage, and a serene pastoral backdrop.",
    material: "Fiberglass, acrylic paints, UV-protected finish", stock: 5,
    frameSizes: [{ label: "Standard", dimensions: "48×36" }, { label: "Large", dimensions: "56×42" }, { label: "Grand", dimensions: "64×48" }],
    reviews: [
      { name: "Vijay M.", rating: 5, date: "8 March 2026", comment: "The depth and color of this mural is breathtaking in person!" },
      { name: "Deepika L.", rating: 4, date: "20 February 2026", comment: "Beautiful forest scene. The cow adds such a lovely touch." },
      { name: "Ganesh R.", rating: 5, date: "5 February 2026", comment: "Transforms any wall into a work of art. Love it!" },
    ],
  },
  {
    id: 12, name: "Baby Krishna Peacock Mural", category: "Mural Art", artist: "Kala Samskruthi Arts",
    price: 19999, originalPrice: 25999, rating: 4.9, size: "48×30 inches",
    image: art12, images: [art12, art11, art10, art13],
    description: "An adorable mural of Baby Krishna (Bal Gopal) playing the flute, surrounded by vibrant peacock feathers against a teal backdrop. The piece features a golden halo and intricate feather detailing.",
    material: "Fiberglass, acrylic paints, gold accents", stock: 4,
    frameSizes: [{ label: "Standard", dimensions: "48×30" }, { label: "Large", dimensions: "56×36" }, { label: "Grand", dimensions: "64×42" }],
    reviews: [
      { name: "Meena T.", rating: 5, date: "15 March 2026", comment: "The peacock feathers are stunning! Perfect for our kids' room." },
      { name: "Sathya N.", rating: 5, date: "28 February 2026", comment: "Baby Krishna looks so adorable. The teal backdrop is gorgeous." },
      { name: "Ranjith K.", rating: 5, date: "12 February 2026", comment: "A unique and colorful piece. Everyone loves it!" },
    ],
  },
  {
    id: 13, name: "Sri Rama with Bow", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 29999, originalPrice: 38999, rating: 4.8, size: "30×60 inches",
    image: art13, images: [art13, art7, art14, art10],
    description: "A magnificent full-body relief sculpture of Lord Rama holding his iconic bow and arrow, adorned with a colorful floral garland. The figure features rich golden tones against a deep maroon background.",
    material: "Fiberglass, gold finish, hand-painted details", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "30×60" }, { label: "Large", dimensions: "36×72" }, { label: "Grand", dimensions: "42×84" }],
    reviews: [
      { name: "Hanuman D.", rating: 5, date: "10 March 2026", comment: "Majestic! The golden finish and garland look incredibly real." },
      { name: "Sita R.", rating: 5, date: "22 February 2026", comment: "The perfect addition to our prayer hall. Simply divine." },
      { name: "Bharat S.", rating: 4, date: "5 February 2026", comment: "Impressive size and detailing. A truly royal piece of art." },
    ],
  },
  {
    id: 14, name: "Tirupati Balaji Relief", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 34999, originalPrice: 44999, rating: 4.9, size: "36×48 inches",
    image: art14, images: [art14, art7, art13, art15],
    description: "A magnificent relief sculpture of Lord Venkateswara (Tirupati Balaji) with Lord Ganesha, set in an ornate temple-style frame. Features intricate carvings, decorative lamps, and a floral offering.",
    material: "Fiberglass, wood-tone finish, floral accents", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Venkatesh P.", rating: 5, date: "12 March 2026", comment: "An exact temple feel at home. The craftsmanship is divine." },
      { name: "Lakshmi N.", rating: 5, date: "1 March 2026", comment: "The Ganesha panel below is such a beautiful touch. We love it." },
      { name: "Prasad M.", rating: 5, date: "15 February 2026", comment: "Feels blessed to have this at our entrance. Outstanding work." },
    ],
  },
  {
    id: 15, name: "Radha Krishna Celestial", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 27999, originalPrice: 35999, rating: 4.8, size: "36×48 inches",
    image: art15, images: [art15, art9, art12, art8],
    description: "A celestial 3D mural of Radha and Krishna in an ethereal embrace, surrounded by swirling clouds and golden flames. The flowing garments and radiant halos create a sense of divine transcendence.",
    material: "Fiberglass, gold leaf, acrylic paints, lacquer", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Ganga D.", rating: 5, date: "18 March 2026", comment: "The celestial feeling this mural brings is unmatched. Truly divine." },
      { name: "Krishna R.", rating: 5, date: "5 March 2026", comment: "The golden flames and flowing robes are mesmerizing. A masterpiece!" },
      { name: "Radha P.", rating: 4, date: "20 February 2026", comment: "Beautiful artwork. The colors and 3D effect are impressive." },
    ],
  },
  {
    id: 16, name: "Buddha HDHMR Serenity", category: "HDHMR Mural Art", artist: "Kala Samskruthi Arts",
    price: 31999, originalPrice: 41999, rating: 4.9, size: "36×48 inches",
    image: art16, images: [art16, art10, art14, art18],
    description: "A breathtaking HDHMR mural art of Lord Buddha in deep meditation, surrounded by flowing waves of energy and a delicate lotus blossom. The serene expression and soft pastel tones with golden accents create an aura of divine peace.",
    material: "HDHMR board, acrylic paints, gold leaf accents, lacquer finish", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Sunil M.", rating: 5, date: "20 March 2026", comment: "The serenity of this Buddha mural transforms the entire room. Breathtaking!" },
      { name: "Ananya D.", rating: 5, date: "10 March 2026", comment: "Incredible detail in the carving. The pastel tones are so calming." },
      { name: "Kiran J.", rating: 4, date: "1 March 2026", comment: "A beautiful piece for meditation spaces. Love the lotus detail." },
    ],
  },
  {
    id: 17, name: "Peacock Pair Wood Carving", category: "Wood Carving", artist: "Kala Samskruthi Arts",
    price: 27999, originalPrice: 35999, rating: 4.8, size: "30×42 inches",
    image: art17, images: [art17, art11, art19, art22],
    description: "An ornate wood carving featuring a majestic pair of peacocks amidst intricate floral scrollwork. The rich walnut-toned frame and vivid teal-blue feather accents create a stunning display of traditional craftsmanship.",
    material: "Premium wood, hand-carved, natural stain, teal accents", stock: 4,
    frameSizes: [{ label: "Standard", dimensions: "30×42" }, { label: "Large", dimensions: "36×48" }, { label: "Grand", dimensions: "42×56" }],
    reviews: [
      { name: "Deepak R.", rating: 5, date: "18 March 2026", comment: "The woodwork is exquisite! The peacock feathers look incredibly real." },
      { name: "Swati P.", rating: 5, date: "8 March 2026", comment: "A masterpiece of wood carving. Perfect for our entryway." },
      { name: "Manoj S.", rating: 4, date: "25 February 2026", comment: "Stunning craftsmanship. The ornate frame adds a royal touch." },
    ],
  },
  {
    id: 18, name: "Venkateswara Temple Shrine", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 38999, originalPrice: 49999, rating: 4.9, size: "36×54 inches",
    image: art18, images: [art18, art14, art12, art20],
    description: "A magnificent relief sculpture of Lord Venkateswara (Balaji) with an ornate temple gopuram crown, flanking decorative lamps, and Lord Ganesha at the base.",
    material: "Fiberglass, wood-tone finish, floral garland accents", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "36×54" }, { label: "Large", dimensions: "42×64" }, { label: "Grand", dimensions: "48×72" }],
    reviews: [
      { name: "Srinivas K.", rating: 5, date: "22 March 2026", comment: "Brings the sacred energy of Tirumala right into our home. Magnificent!" },
      { name: "Padmini R.", rating: 5, date: "12 March 2026", comment: "The gopuram detail and floral garland are breathtaking. Divine artwork." },
      { name: "Venkat N.", rating: 5, date: "2 March 2026", comment: "Museum-quality piece. The Ganesha panel at the base is a beautiful touch." },
    ],
  },
  {
    id: 19, name: "Ram Darbar Wooden Panel", category: "Wood Carving", artist: "Kala Samskruthi Arts",
    price: 33999, originalPrice: 43999, rating: 4.8, size: "36×36 inches",
    image: art19, images: [art19, art7, art13, art17],
    description: "A magnificent hand-carved wooden panel depicting the divine Ram Darbar — Lord Rama with Sita, Lakshmana, and the devoted Hanuman.",
    material: "Premium teak wood, hand-carved, natural wood finish", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "36×36" }, { label: "Large", dimensions: "42×42" }, { label: "Grand", dimensions: "48×48" }],
    reviews: [
      { name: "Ramesh P.", rating: 5, date: "25 March 2026", comment: "The wood carving detail is extraordinary. A true heirloom piece." },
      { name: "Sita D.", rating: 5, date: "15 March 2026", comment: "Every figure is perfectly carved. The canopy detail is stunning." },
      { name: "Bharat K.", rating: 4, date: "5 March 2026", comment: "Beautiful warm tones. Perfect for our prayer room." },
    ],
  },
  {
    id: 20, name: "Bala Ramudu HDHMR Mural", category: "HDHMR Mural Art", artist: "Kala Samskruthi Arts",
    price: 29999, originalPrice: 38999, rating: 4.9, size: "30×48 inches",
    image: art20, images: [art20, art21, art13, art14],
    description: "A stunning HDHMR mural art of Bala Ramudu (Young Lord Rama) in a traditional temple-style arch frame.",
    material: "HDHMR board, acrylic paints, gold accents, protective coating", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "30×48" }, { label: "Large", dimensions: "36×56" }, { label: "Grand", dimensions: "42×64" }],
    reviews: [
      { name: "Narasimha R.", rating: 5, date: "28 March 2026", comment: "The temple arch framing is gorgeous. Every panel tells a story." },
      { name: "Gayatri M.", rating: 5, date: "18 March 2026", comment: "Bala Ramudu looks divine! The colors are vibrant and rich." },
      { name: "Pavan K.", rating: 5, date: "8 March 2026", comment: "Perfect handcrafted temple art. A blessing for our home." },
    ],
  },
  {
    id: 21, name: "Artisan at Work Portrait", category: "Artist Collection", artist: "Kala Samskruthi Arts",
    price: 15999, originalPrice: 19999, rating: 4.7, size: "24×36 inches",
    image: art21, images: [art21, art20, art15, art22],
    description: "A special collector's piece showcasing the master artisan of Kala Samskruthi Arts with one of his magnificent creations.",
    material: "Premium photo print, gallery-grade framing", stock: 5,
    frameSizes: [{ label: "Standard", dimensions: "24×36" }, { label: "Large", dimensions: "30×42" }, { label: "Grand", dimensions: "36×48" }],
    reviews: [
      { name: "Aditya S.", rating: 5, date: "30 March 2026", comment: "Love seeing the artisan behind the art. Adds so much meaning!" },
      { name: "Lakshmi V.", rating: 4, date: "20 March 2026", comment: "A beautiful tribute to the craft. Inspiring piece." },
      { name: "Ravi T.", rating: 5, date: "10 March 2026", comment: "Great to see the scale of these magnificent artworks in context." },
    ],
  },
  {
    id: 22, name: "Radha Krishna Divine Love", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 34999, originalPrice: 44999, rating: 4.9, size: "42×54 inches",
    image: art22, images: [art22, art8, art9, art11],
    description: "A vibrant 3D mural art depicting the divine love of Radha and Krishna, adorned in resplendent traditional attire with intricate jewelry.",
    material: "Fiberglass, acrylic paints, gold leaf, semi-precious accents", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "42×54" }, { label: "Large", dimensions: "48×64" }, { label: "Grand", dimensions: "56×72" }],
    reviews: [
      { name: "Kamala S.", rating: 5, date: "1 April 2026", comment: "The colors are absolutely vivid! Radha and Krishna look divine." },
      { name: "Govind P.", rating: 5, date: "22 March 2026", comment: "Every detail is hand-painted to perfection. A true masterwork." },
      { name: "Meera R.", rating: 5, date: "12 March 2026", comment: "The peacock and cow add such life to the scene. Stunning!" },
    ],
  },
  {
    id: 23, name: "7 Horses Mural Art", category: "Mural Art", artist: "Kala Samskruthi Arts",
    price: 25999, originalPrice: 33999, rating: 4.8, size: "36×48 inches",
    image: art23, images: [art23, art24, art10, art17],
    description: "A majestic mural art featuring seven galloping horses beneath a radiant sun — a powerful Vastu symbol of success, strength, and prosperity.",
    material: "Fiberglass, ivory finish, gold accents, UV-protected", stock: 4,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Arjun M.", rating: 5, date: "2 April 2026", comment: "The horses look so dynamic and powerful. Great Vastu piece!" },
      { name: "Pooja B.", rating: 4, date: "24 March 2026", comment: "Elegant ivory tones work beautifully with our modern interior." },
      { name: "Suresh V.", rating: 5, date: "14 March 2026", comment: "Majestic creation! The golden sun detail is a lovely touch." },
    ],
  },
  {
    id: 24, name: "7 Horses Grand Mural", category: "Mural Art", artist: "Kala Samskruthi Arts",
    price: 28999, originalPrice: 37999, rating: 4.9, size: "42×56 inches",
    image: art24, images: [art24, art23, art16, art10],
    description: "A grand-scale mural art of seven majestic horses in full gallop beneath a golden sun — symbolizing power, progress, and prosperity.",
    material: "Fiberglass, ivory finish, gold leaf, lacquer coating", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "42×56" }, { label: "Large", dimensions: "48×64" }, { label: "Grand", dimensions: "56×72" }],
    reviews: [
      { name: "Vikram R.", rating: 5, date: "5 April 2026", comment: "The grand size makes this piece truly impressive. A showstopper!" },
      { name: "Nandini K.", rating: 5, date: "28 March 2026", comment: "Beautiful Vastu art. The horse detailing is incredibly lifelike." },
      { name: "Harish D.", rating: 5, date: "18 March 2026", comment: "Perfect for our living room wall. Brings energy and elegance." },
    ],
  },
  {
    id: 25, name: "Ganesh Lakshmi Saraswati Panel", category: "Relief Sculpture", artist: "Kala Samskruthi Arts",
    price: 36999, originalPrice: 47999, rating: 4.9, size: "48×36 inches",
    image: art25, images: [art25, art14, art7, art10],
    description: "A grand relief sculpture panel featuring the divine trinity of Lord Ganesha, Goddess Lakshmi, and Goddess Saraswati. Each deity is exquisitely sculpted with ornate jewelry, flowing garments, and traditional iconography, set within richly decorated arched frames with floral motifs and sacred symbols.",
    material: "Fiberglass, gold leaf accents, hand-painted details, lacquer finish", stock: 3,
    frameSizes: [{ label: "Standard", dimensions: "48×36" }, { label: "Large", dimensions: "56×42" }, { label: "Grand", dimensions: "64×48" }],
    reviews: [
      { name: "Lakshmi P.", rating: 5, date: "5 April 2026", comment: "Having all three deities together is so auspicious. Stunning craftsmanship!" },
      { name: "Ganesh R.", rating: 5, date: "28 March 2026", comment: "The detail on each deity is incredible. A true masterpiece for our pooja room." },
      { name: "Saraswati D.", rating: 5, date: "18 March 2026", comment: "Beautiful gold accents and the arched frames look so elegant. Highly recommend!" },
    ],
  },
  {
    id: 26, name: "Krishna Govardhan Leela Mural", category: "3D Mural Art", artist: "Kala Samskruthi Arts",
    price: 31999, originalPrice: 41999, rating: 4.8, size: "42×48 inches",
    image: art26, images: [art26, art8, art11, art22],
    description: "A vivid 3D mural depicting the legendary Govardhan Leela — Lord Krishna effortlessly lifting the Govardhan mountain to shelter the people and cattle of Vrindavan. The scene is rich with vibrant colors, detailed figures, lush greenery, and sacred cows, capturing the divine miracle in breathtaking sculptural relief.",
    material: "Fiberglass, acrylic paints, gold highlights, UV-protected finish", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "42×48" }, { label: "Large", dimensions: "48×56" }, { label: "Grand", dimensions: "56×64" }],
    reviews: [
      { name: "Gopal K.", rating: 5, date: "3 April 2026", comment: "The Govardhan scene looks absolutely magnificent. So much detail!" },
      { name: "Radha M.", rating: 4, date: "25 March 2026", comment: "Vibrant colors and the 3D effect brings the story to life. Beautiful!" },
      { name: "Venkat S.", rating: 5, date: "15 March 2026", comment: "A divine piece that captures Krishna's love for his devotees. Stunning work." },
    ],
  },
  {
    id: 27, name: "Nature Theme Crane Mural", category: "Mural Art", artist: "Kala Samskruthi Arts",
    price: 23999, originalPrice: 30999, rating: 4.8, size: "36×48 inches",
    image: art27, images: [art27, art12, art11, art23],
    description: "An exquisite nature-themed mural art featuring a graceful pair of white cranes wading among lotus leaves and blossoms. The soft pastel tones of green, blue, and pink create a serene and tranquil atmosphere, expertly crafted for spiritual interiors and peaceful living spaces.",
    material: "Fiberglass, acrylic paints, textured finish, UV-protected", stock: 4,
    frameSizes: [{ label: "Standard", dimensions: "36×48" }, { label: "Large", dimensions: "42×56" }, { label: "Grand", dimensions: "48×64" }],
    reviews: [
      { name: "Priya M.", rating: 5, date: "6 April 2026", comment: "The cranes look so lifelike! The pastel tones are calming and beautiful." },
      { name: "Anil S.", rating: 4, date: "28 March 2026", comment: "A refreshing nature piece. Perfect for our meditation room." },
      { name: "Kavita R.", rating: 5, date: "18 March 2026", comment: "Unique and elegant. The lotus details are stunning!" },
    ],
  },
  {
    id: 28, name: "Sri Bala Ramudu Temple Arch", category: "HDHMR Mural Art", artist: "Kala Samskruthi Arts",
    price: 37999, originalPrice: 48999, rating: 4.9, size: "36×60 inches",
    image: art28, images: [art28, art20, art13, art7],
    description: "A magnificent hand-carved HDHMR mural of Sri Bala Ramudu (Young Lord Rama) set within an ornate temple arch adorned with divine figures and sacred symbols. The stunning black and gold color palette with intricate detailing creates a truly regal and devotional masterpiece.",
    material: "HDHMR board, hand-carved, gold leaf, premium black finish", stock: 2,
    frameSizes: [{ label: "Standard", dimensions: "36×60" }, { label: "Large", dimensions: "42×72" }, { label: "Grand", dimensions: "48×84" }],
    reviews: [
      { name: "Raghav K.", rating: 5, date: "7 April 2026", comment: "The black and gold finish is absolutely royal. A temple-quality piece!" },
      { name: "Sushma D.", rating: 5, date: "30 March 2026", comment: "Sri Bala Ramudu looks divine. The arch carvings are incredible." },
      { name: "Prasad V.", rating: 5, date: "20 March 2026", comment: "Museum-level craftsmanship. Proudly displayed in our prayer hall." },
    ],
  },
];

export const categories = ["All", "Relief Sculpture", "3D Mural Art", "Mural Art", "HDHMR Mural Art", "Wood Carving", "Artist Collection"];

export const coupons: Record<string, number> = {
  KALA10: 10, ART20: 20, WELCOME15: 15, FESTIVE25: 25,
};

export const videos = [
  { id: 1, title: "Relief Sculpture Making", description: "See how our artisans create stunning 3D relief sculptures.", image: art7 },
  { id: 2, title: "3D Mural Art Process", description: "The art of bringing mythological scenes to life in 3D.", image: art12 },
  { id: 3, title: "Wood Carving Masterclass", description: "Watch the intricate process of hand-carving traditional wood panels.", image: art17 },
  { id: 4, title: "HDHMR Mural Creation", description: "Behind the scenes of creating stunning HDHMR mural art.", image: art16 },
  { id: 5, title: "Temple Art Traditions", description: "Explore the centuries-old traditions behind temple-style art.", image: art14 },
  { id: 6, title: "Painting Sacred Murals", description: "Watch the delicate process of hand-painting divine murals.", image: art22 },
  { id: 7, title: "Artisan Workshop Tour", description: "Step inside our studio and see how masterpieces are created.", image: art21 },
  { id: 8, title: "Gold Leaf Techniques", description: "The traditional art of applying gold leaf to sculptures.", image: art10 },
];
