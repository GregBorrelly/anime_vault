"use Server";

export const fetchAnime = async (page: number) => {
  const res = await fetch(`https://shikimori.one/api/animes?page=${page}&limit=8`);
  const data = await res.json();
  console.log(data);
  return data;
};