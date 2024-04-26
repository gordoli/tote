import { CATEGORY } from "./const";

export type User = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  stats: UserStats;
};

const DUMMY_USER: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=67",
    name: "John Doe",
    username: "johndoe",
    email: "john@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=47",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=43",
    name: "Alice Smith",
    username: "alicesmith",
    email: "alice@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=53",
    name: "Bob Johnson",
    username: "bobjohnson",
    email: "bob@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=38",
    name: "Emma Davis",
    username: "emmadavis",
    email: "emma@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=33",
    name: "James Wilson",
    username: "jameswilson",
    email: "james@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=24",
    name: "Olivia Brown",
    username: "oliviabrown",
    email: "olivia@gmail.com",
    stats: {
      followers: 123,
      following: 456,
      products: 10,
    },
  },
];

export const CURRENT_USER: User = {
  id: "8",
  avatar: "https://i.pravatar.cc/150?img=26",
  name: "Lavender Haze",
  username: "lavenderhaze",
  email: "lavender@gmail.com",
  stats: {
    followers: 123,
    following: 456,
    products: 10,
  },
};

export type UserStats = {
  followers: number;
  following: number;
  products: number;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
  cover: string;
};

export const DUMMY_BRANDS: Brand[] = [
  {
    id: "1",
    name: "Nike",
    logo: "https://i.ibb.co/qFqn12c/nike-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "2",
    name: "Adidas",
    logo: "https://i.ibb.co/Db2mTpb/adidas-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "3",
    name: "Hoka",
    logo: "https://i.ibb.co/n7WBXMN/hoka-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "4",
    name: "Alo Yoga",
    logo: "https://i.ibb.co/my8mbdx/alo-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "5",
    name: "All Birds",
    logo: "https://i.ibb.co/qJLFsQK/allbirds-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "6",
    name: "Everlane",
    logo: "https://i.ibb.co/t2STCPc/everlane-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "7",
    name: "Levis",
    logo: "https://i.ibb.co/1LqQ51T/levis-logo.png",
    cover: "https://picsum.photos/150",
  },
  {
    id: "8",
    name: "Patagonia",
    logo: "https://i.ibb.co/D8B6dbv/patagonia-logo.png",
    cover: "https://picsum.photos/150",
  },
];

export type Product = {
  name: string;
  image: string;
  brand: Brand;
  category: CATEGORY;
  createdTime: Date;
  rating: number;
};

export const DUMMY_PRODUCTS: Product[] = [
  {
    name: "Air Max",
    brand: DUMMY_BRANDS[0],
    category: CATEGORY.Sneakers,
    createdTime: new Date(),
    rating: 8.5,
    image: "https://i.ibb.co/LgVWqh6/nike-airmax.png",
  },
  {
    name: "Straight Leg Jeans",
    brand: DUMMY_BRANDS[5],
    category: CATEGORY.Jeans,
    createdTime: new Date(),
    rating: 7.6,
    image: "https://i.ibb.co/Y8NLFb9/levi-straight-leg.png",
  },
  {
    name: "Wool Runners",
    brand: DUMMY_BRANDS[4],
    category: CATEGORY.Sneakers,
    createdTime: new Date(),
    rating: 6.5,
    image: "https://i.ibb.co/T12H1zX/allbirds-wool.png",
  },
  {
    name: "Mach 5",
    brand: DUMMY_BRANDS[2],
    category: CATEGORY.Sneakers,
    createdTime: new Date(),
    rating: 9.6,
    image: "https://i.ibb.co/KFFDqWx/hoka-mach.png",
  },
  {
    name: "Sambas",
    brand: DUMMY_BRANDS[1],
    category: CATEGORY.Sneakers,
    createdTime: new Date(),
    rating: 7.9,
    image: "https://i.ibb.co/8zXW5SN/adidas-sambas.png",
  },
  {
    name: "Dark Denim Strauss",
    brand: DUMMY_BRANDS[6],
    category: CATEGORY.Jeans,
    createdTime: new Date(),
    rating: 4.2,
    image: "https://i.ibb.co/ydnsbvh/everlane-denim.png",
  },
  {
    name: "Green Wool Jacket",
    brand: DUMMY_BRANDS[5],
    category: CATEGORY.Jackets,
    createdTime: new Date(),
    rating: 6.8,
    image: "https://i.ibb.co/k139rjZ/everlane-jacket.png",
  },
  {
    name: "Beige Button Jacket",
    brand: DUMMY_BRANDS[5],
    category: CATEGORY.Jackets,
    createdTime: new Date(),
    rating: 7.3,
    image: "https://i.ibb.co/vvkrLLk/everlane-jacket-beige.png",
  },
  {
    name: "Taupe Clogs",
    brand: DUMMY_BRANDS[4],
    category: CATEGORY.Jackets,
    createdTime: new Date(),
    rating: 5.5,
    image: "https://i.ibb.co/JpLDxzt/birkenstocks.png",
  },
];

export type FeedItem = {
  id: number;
  user: User;
  content: string;
  brand: Brand;
  product: Product;
  createdTime: Date;
};

export const DUMMY_FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    user: DUMMY_USER[0],
    content: "ranked",
    brand: DUMMY_BRANDS[0],
    product: DUMMY_PRODUCTS[0],
    createdTime: new Date(),
  },
  {
    id: 2,
    user: DUMMY_USER[1],
    content: "ranked",
    brand: DUMMY_BRANDS[1],
    product: DUMMY_PRODUCTS[4],
    createdTime: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 3,
    user: DUMMY_USER[2],
    content: "ranked",
    brand: DUMMY_BRANDS[2],
    product: DUMMY_PRODUCTS[3],
    //createdTime should be 5 hours ago
    createdTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: 4,
    user: DUMMY_USER[3],
    content: "ranked",
    brand: DUMMY_BRANDS[3],
    product: DUMMY_PRODUCTS[7],
    createdTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 5,
    user: DUMMY_USER[4],
    content: "ranked",
    brand: DUMMY_BRANDS[4],
    product: DUMMY_PRODUCTS[2],
    createdTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 6,
    user: DUMMY_USER[5],
    content: "ranked",
    brand: DUMMY_BRANDS[5],
    product: DUMMY_PRODUCTS[6],
    createdTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 7,
    user: DUMMY_USER[6],
    content: "ranked",
    brand: DUMMY_BRANDS[6],
    product: DUMMY_PRODUCTS[5],
    createdTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: 8,
    user: DUMMY_USER[0],
    content: "ranked",
    brand: DUMMY_BRANDS[7],
    product: DUMMY_PRODUCTS[1],
    createdTime: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
];
