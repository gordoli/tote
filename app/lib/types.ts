import { CATEGORY } from "./const";

export type UserStats = {
  followerCount: number;
  followingCount: number;
  rankedProductCount: number;
};

export type RankProducts = {
  userRating: number;
  friendsRating: number;
  overallRanking: number;
  totalRanking: number;
};

export type RankingData = {
  rate: number;
  brandId: number;
  categoryId: number;
  // preferProductId: number;
  link: string;
  image: string;
  name: string;
  description: string;
};

export type Brand = {
  id: number;
  name: string;
  logo: string | null;
  cover: string | null;
  overallRating: number;
  friendsRating?: number;
  description?: string;
  rankProducts?: RankProducts;
  website?: string;
};

export type ProductOld = {
  name: string;
  image: string;
  brand: Brand;
  category: CATEGORY;
  createdTime: Date;
  rating: number;
};

export type User = {
  id: string;
  name: string;
  statistics: UserStats;
  products?: Product[];
  avatar: string | null;
  email: string;
  firstName?: string;
  lastName?: string;
  username: string;
};

export const CURRENT_USER: User = {
  id: "8",
  avatar: "https://i.pravatar.cc/150?img=26",
  name: "Lavender Haze",
  username: "lavenderhaze",
  email: "lavender@gmail.com",
  statistics: {
    followerCount: 123,
    followingCount: 456,
    rankedProductCount: 10,
  },
};

export type FeedItem = {
  id: number;
  user: User;
  content: string;
  brand: Brand;
  product: Product;
  createdTime: Date;
  image?: string;
  rate?: number;
  name?: string;
  category?: Product;
  createdBy?: User;
};

export type Request = {
  user: User;
  brand: Brand | null;
  note: string;
  createdTime: Date;
};

export type Notification = {
  id: number;
  type: string;
  sender: User;
  isRead: boolean;
  createdTime: Date;
};

export const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "follow",
    sender: CURRENT_USER,
    isRead: false,
    createdTime: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 2,
    type: "follow",
    sender: CURRENT_USER,
    isRead: true,
    createdTime: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: 3,
    type: "follow",
    sender: CURRENT_USER,
    isRead: true,
    createdTime: new Date(Date.now() - 25 * 60 * 1000),
  },
  {
    id: 4,
    type: "follow",
    sender: CURRENT_USER,
    isRead: false,
    createdTime: new Date(Date.now() - 35 * 60 * 1000),
  },
  {
    id: 5,
    type: "follow",
    sender: CURRENT_USER,
    isRead: true,
    createdTime: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: 6,
    type: "follow",
    sender: CURRENT_USER,
    isRead: false,
    createdTime: new Date(Date.now() - 55 * 60 * 1000),
  },
];

export type RegistrationFormError = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type RegistrationForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LogInFormError = {
  email: string;
  password: string;
};

export type LogInForm = {
  email: string;
  password: string;
};

// ---------------------------------------------------
// Types that match backend

export type FeedActivity = {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  referenceId: number;
  title: string;
  createdBy: User;
  rankProduct: Product;
};

export type Product = {
  id: number;
  createdAt: string;
  updatedAt: string;
  rate: number;
  link: string;
  image: string;
  name: string;
  description: string;
  createdBy: User;
  category?: Category;
  brand?: Brand;
};

export type Brand2 = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  cover: string | null;
  logo: string | null;
  website: string;
  overallRanking?: number;
};

export type Category = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string | null;
  image: string | null;
};
