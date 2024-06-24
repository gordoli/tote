import { Brand, Category, FeedActivity } from "./types";

export const BE_BRANDS: Brand[] = [
  {
    id: 5,
    name: "Fila",
    description: "lorem isum",
    cover: null,
    logo: null,
    website: "xyz.com",
    overallRating: 0,
  },
  {
    id: 4,
    name: "Puma",
    description: "lorem isum",
    cover: null,
    logo: null,
    website: "xyz.com",
    overallRating: 0,
  },
  {
    id: 3,
    name: "Gucci",
    description: "lorem isum",
    cover: null,
    logo: null,
    website: "xyz.com",
    overallRating: 0,
  },
  {
    id: 2,
    name: "Adidas",
    description: "lorem isum",
    cover: null,
    logo: null,
    website: "xyz.com",
    overallRating: 6.67,
  },
  {
    id: 1,
    name: "Nike",
    description: "lorem isum",
    cover: null,
    logo: null,
    website: "xyz.com",
    overallRating: 8.33,
  },
];

export const BE_PRODUCTS: Product2[] = [
  {
    id: 4,
    createdAt: "2024-06-18T03:53:48.527Z",
    updatedAt: "2024-06-18T03:53:48.527Z",
    rate: 2,
    link: "google.com",
    image: "",
    name: "Airforce 1",
    description: "Loremisum 2",
    brand: {
      id: 1,
      name: "Nike",
      description: "lorem isum",
      cover: null,
      logo: null,
      website: "xyz.com",
      overallRating: 8.33,
    },
    category: {
      id: 1,
      createdAt: "2024-06-14T03:17:59.861Z",
      updatedAt: "2024-06-14T03:17:59.861Z",
      name: "Sneakers",
      description: null,
      image: null,
    },
    createdBy: {
      id: "10",
      username: "example-mail2",
      email: "example-mail2@gmail.com",
      avatar: null,
    },
  },
  {
    id: 3,
    createdAt: "2024-06-17T06:23:59.481Z",
    updatedAt: "2024-06-17T06:23:59.481Z",
    rate: 2,
    link: "google.com",
    image: "",
    name: "Airforce 1",
    description: "Loremisum 2",
    brand: {
      id: 1,
      name: "Nike",
      description: "lorem isum",
      cover: null,
      logo: null,
      website: "xyz.com",
      overallRating: 8.33,
    },
    category: {
      id: 1,
      createdAt: "2024-06-14T03:17:59.861Z",
      updatedAt: "2024-06-14T03:17:59.861Z",
      name: "Sneakers",
      description: null,
      image: null,
    },
    createdBy: {
      id: 10,
      username: "example-mail2",
      email: "example-mail2@gmail.com",
      avatar: null,
    },
  },
  {
    id: 2,
    createdAt: "2024-06-17T06:11:34.756Z",
    updatedAt: "2024-06-17T06:11:34.756Z",
    rate: 3,
    link: "google.com",
    image: "",
    name: "Airforce 1",
    description: "Loremisum 2",
    brand: {
      id: 1,
      name: "Nike",
      description: "lorem isum",
      cover: null,
      logo: null,
      website: "xyz.com",
      overallRating: 8.33,
    },
    category: {
      id: 1,
      createdAt: "2024-06-14T03:17:59.861Z",
      updatedAt: "2024-06-14T03:17:59.861Z",
      name: "Sneakers",
      description: null,
      image: null,
    },
    createdBy: {
      id: 9,
      username: "example-mail",
      email: "example-mail@gmail.com",
      avatar: null,
    },
  },
  {
    id: 1,
    createdAt: "2024-06-17T04:57:03.001Z",
    updatedAt: "2024-06-17T04:57:03.001Z",
    rate: 3,
    link: "google.com",
    image: "",
    name: "Airforce 1",
    description: "Loremisum 2",
    brand: {
      id: 1,
      name: "Nike",
      description: "lorem isum",
      cover: null,
      logo: null,
      website: "xyz.com",
      overallRating: 8.33,
    },
    category: {
      id: 1,
      createdAt: "2024-06-14T03:17:59.861Z",
      updatedAt: "2024-06-14T03:17:59.861Z",
      name: "Sneakers",
      description: null,
      image: null,
    },
    createdBy: {
      id: 9,
      username: "example-mail",
      email: "example-mail@gmail.com",
      avatar: null,
    },
  },
];

export const BE_CATEGORIES: Category[] = [
  {
    id: 1,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Sneakers",
    description: null,
    image: null,
  },
  {
    id: 2,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "T-Shirts",
    description: null,
    image: null,
  },
  {
    id: 3,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Tops",
    description: null,
    image: null,
  },
  {
    id: 4,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Shorts",
    description: null,
    image: null,
  },
  {
    id: 5,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Vests",
    description: null,
    image: null,
  },
  {
    id: 6,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Jackets",
    description: null,
    image: null,
  },
  {
    id: 7,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Jerseys",
    description: null,
    image: null,
  },
  {
    id: 8,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Jeans",
    description: null,
    image: null,
  },
  {
    id: 9,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Sweatshirts",
    description: null,
    image: null,
  },
  {
    id: 10,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Hoodies",
    description: null,
    image: null,
  },
  {
    id: 11,
    createdAt: "2024-06-14T03:17:59.861Z",
    updatedAt: "2024-06-14T03:17:59.861Z",
    name: "Tracksuits",
    description: null,
    image: null,
  },
];

export const BE_FEED_ACTIVITIES: FeedActivity[] = [
  {
    id: 5,
    createdAt: "2024-06-18T03:54:06.389Z",
    updatedAt: "2024-06-18T03:54:06.389Z",
    type: "rank_product",
    referenceId: 5,
    title: "Airforce 1",
    createdBy: {
      id: 10,
      username: "example-mail2",
      email: "example-mail2@gmail.com",
      avatar: null,
    },
    rankProduct: {
      id: 5,
      createdAt: "2024-06-18T03:54:05.728Z",
      updatedAt: "2024-06-18T03:54:05.728Z",
      rate: 2,
      link: "google.com",
      image: "",
      name: "Airforce 1",
      description: "Loremisum 2",
      createdBy: {
        id: 10,
        username: "example-mail2",
        email: "example-mail2@gmail.com",
        avatar: null,
      },
      brand: BE_BRANDS[0],
      category: BE_CATEGORIES[0],
    },
  },
  {
    id: 4,
    createdAt: "2024-06-18T03:53:49.130Z",
    updatedAt: "2024-06-18T03:53:49.130Z",
    type: "rank_product",
    referenceId: 4,
    title: "Airforce 1",
    createdBy: {
      id: 10,
      username: "example-mail2",
      email: "example-mail2@gmail.com",
      avatar: null,
    },
    rankProduct: {
      id: 4,
      createdAt: "2024-06-18T03:53:48.527Z",
      updatedAt: "2024-06-18T03:53:48.527Z",
      rate: 2,
      link: "google.com",
      image: "",
      name: "Airforce 1",
      description: "Loremisum 2",
      createdBy: {
        id: 10,
        username: "example-mail2",
        email: "example-mail2@gmail.com",
        avatar: null,
      },
      brand: BE_BRANDS[0],
      category: BE_CATEGORIES[0],
    },
  },
  {
    id: 3,
    createdAt: "2024-06-17T06:24:00.088Z",
    updatedAt: "2024-06-17T06:24:00.088Z",
    type: "rank_product",
    referenceId: 3,
    title: "Airforce 1",
    createdBy: {
      id: 10,
      username: "example-mail2",
      email: "example-mail2@gmail.com",
      avatar: null,
    },
    rankProduct: {
      id: 3,
      createdAt: "2024-06-17T06:23:59.481Z",
      updatedAt: "2024-06-17T06:23:59.481Z",
      rate: 2,
      link: "google.com",
      image: "",
      name: "Airforce 1",
      description: "Loremisum 2",
      createdBy: {
        id: "10",
        username: "example-mail2",
        email: "example-mail2@gmail.com",
        avatar: null,
      },
      brand: BE_BRANDS[0],
      category: BE_CATEGORIES[0],
    },
  },
  {
    id: 2,
    createdAt: "2024-06-17T06:11:35.384Z",
    updatedAt: "2024-06-17T06:11:35.384Z",
    type: "rank_product",
    referenceId: 2,
    title: "Airforce 1",
    createdBy: {
      id: "9",
      username: "example-mail",
      email: "example-mail@gmail.com",
      avatar: null,
    },
    rankProduct: {
      id: 2,
      createdAt: "2024-06-17T06:11:34.756Z",
      updatedAt: "2024-06-17T06:11:34.756Z",
      rate: 3,
      link: "google.com",
      image: "",
      name: "Airforce 1",
      description: "Loremisum 2",
      createdBy: {
        id: 9,
        username: "example-mail",
        email: "example-mail@gmail.com",
        avatar: null,
      },
      brand: BE_BRANDS[0],
      category: BE_CATEGORIES[0],
    },
  },
  {
    id: 1,
    createdAt: "2024-06-17T04:57:03.644Z",
    updatedAt: "2024-06-17T04:57:03.644Z",
    type: "rank_product",
    referenceId: 1,
    title: "Airforce 1",
    createdBy: {
      id: 9,
      username: "example-mail",
      email: "example-mail@gmail.com",
      avatar: null,
    },
    rankProduct: {
      id: 1,
      createdAt: "2024-06-17T04:57:03.001Z",
      updatedAt: "2024-06-17T04:57:03.001Z",
      rate: 3,
      link: "google.com",
      image: "",
      name: "Airforce 1",
      description: "Loremisum 2",
      createdBy: {
        id: 9,
        username: "example-mail",
        email: "example-mail@gmail.com",
        avatar: null,
      },
      brand: BE_BRANDS[0],
      category: BE_CATEGORIES[0],
    },
  },
];