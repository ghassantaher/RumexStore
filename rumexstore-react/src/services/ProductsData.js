import { http } from './Http';

// const wait = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

export const mapDataFromServer = (data) => ({
  ...data,
  // created: new Date(category.timeStamp),
  // answers:
  //   // category.answers
  //   //   ? category.answers.map((answer) => ({
  //   //       ...answer,
  //   //       created: new Date(answer.created),
  //   //     }))
  //   //   :
  //   [],
});
export const getAllCategories = async () => {
  const result = await http({
    path: '/Category',
  });
  if (result.ok && result.body) {
    return result.body.map(mapDataFromServer);
  } else {
    return [];
  }
};
export const getCategory = async (categoryId) => {
  const result = await http({
    path: `/Category/${categoryId}`,
  });
  if (result.ok && result.body) {
    return mapDataFromServer(result.body);
  } else {
    return null;
  }
};

export const getFeaturedProducts = async () => {
  const result = await http({
    path: `/Product/featured`,
  });
  if (result.ok && result.body) {
    return result.body.map(mapDataFromServer);
  } else {
    return [];
  }
};
export const searchProducts = async (criteria) => {
  const result = await http({
    path: `/Search/${criteria}`,
  });
  if (result.ok && result.body) {
    return result.body.map(mapDataFromServer);
  } else {
    return [];
  }
};
export const getProduct = async (productId) => {
  const result = await http({
    path: `/product/${productId}`,
  });
  if (result.ok && result.body) {
    return mapDataFromServer(result.body);
  } else {
    return null;
  }
};
export const getProducts = async (categoryId) => {
  const result = await http({
    path: `/Category/${categoryId}/products`,
  });
  if (result.ok && result.body) {
    return result.body.map(mapDataFromServer);
  } else {
    return [];
  }
};
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
