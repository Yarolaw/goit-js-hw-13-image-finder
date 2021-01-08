const apiKey = '19700503-b2d39d1f98216d71a2eb0aa47';

const fetchPhotos = async (searchQuery, page = 1, perPage) => {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${perPage}&key=${apiKey}`;
  const res = await fetch(url);
  return await res.json();
};

export default { fetchPhotos };