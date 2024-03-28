export type User = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
};

const DUMMY_USER: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=67",
    name: "John Doe",
    username: "johndoe",
    email: "john@gmail.com",
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=47",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@gmail.com",
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=43",
    name: "Alice Smith",
    username: "alicesmith",
    email: "alice@gmail.com",
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=53",
    name: "Bob Johnson",
    username: "bobjohnson",
    email: "bob@gmail.com",
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=38",
    name: "Emma Davis",
    username: "emmadavis",
    email: "emma@gmail.com",
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=33",
    name: "James Wilson",
    username: "jameswilson",
    email: "james@gmail.com",
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=24",
    name: "Olivia Brown",
    username: "oliviabrown",
    email: "olivia@gmail.com",
  },
];

export type Brand = {
  id: string;
  name: string;
  logo: string;
};

const DUMMY_BRANDS: Brand[] = [
  {
    id: "1",
    name: "Nike",
    logo: "https://picsum.photos/150",
  },
  {
    id: "2",
    name: "Adidas",
    logo: "https://picsum.photos/150",
  },
  {
    id: "3",
    name: "Uniqlo",
    logo: "https://picsum.photos/150",
  },
  {
    id: "4",
    name: "Zara",
    logo: "https://picsum.photos/150",
  },
  {
    id: "5",
    name: "H&M",
    logo: "https://picsum.photos/150",
  },
  {
    id: "6",
    name: "Lululemon",
    logo: "https://picsum.photos/150",
  },
  {
    id: "7",
    name: "Vuori",
    logo: "https://picsum.photos/150",
  },
  {
    id: "8",
    name: "AllBirds",
    logo: "https://picsum.photos/150",
  },
  {
    id: "9",
    name: "Patagonia",
    logo: "https://picsum.photos/150",
  },
  {
    id: "10",
    name: "Arc'teryx",
    logo: "https://picsum.photos/150",
  },
];

export type FeedItem = {
  id: number;
  user: User;
  content: string;
  brand: Brand;
  image: string;
};

export const DUMMY_FEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    user: DUMMY_USER[0],
    content: "ranked",
    brand: DUMMY_BRANDS[0],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    user: DUMMY_USER[1],
    content: "ranked",
    brand: DUMMY_BRANDS[1],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    user: DUMMY_USER[2],
    content: "ranked",
    brand: DUMMY_BRANDS[2],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    user: DUMMY_USER[3],
    content: "ranked",
    brand: DUMMY_BRANDS[3],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    user: DUMMY_USER[4],
    content: "ranked",
    brand: DUMMY_BRANDS[4],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    user: DUMMY_USER[5],
    content: "ranked",
    brand: DUMMY_BRANDS[5],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    user: DUMMY_USER[6],
    content: "ranked",
    brand: DUMMY_BRANDS[6],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    user: DUMMY_USER[0],
    content: "ranked",
    brand: DUMMY_BRANDS[7],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    user: DUMMY_USER[1],
    content: "ranked",
    brand: DUMMY_BRANDS[8],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    user: DUMMY_USER[2],
    content: "ranked",
    brand: DUMMY_BRANDS[9],
    image: "https://via.placeholder.com/150",
  },
];

export type Product = {
  name: string;
  image: string;
  brand: Brand;
  createdTime: Date;
  rating: number;
};

export const DUMMY_PRODUCTS: Product[] = [
  {
    name: "Air Max",
    brand: DUMMY_BRANDS[0],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Superstar",
    brand: DUMMY_BRANDS[1],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[2],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[3],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[4],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[5],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[6],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[7],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[8],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[9],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
  {
    name: "Product Name",
    brand: DUMMY_BRANDS[10],
    createdTime: new Date(),
    rating: 8.5,
    image: "https://picsum.photos/150",
  },
];
