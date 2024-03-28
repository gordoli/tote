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
    avatar: "https://picsum.photos/150",
    name: "John Doe",
    username: "johndoe",
    email: "john@gmail.com",
  },
  {
    id: "2",
    avatar: "https://picsum.photos/150",
    name: "Jane Doe",
    username: "janedoe",
    email: "jane@gmail.com",
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
];
