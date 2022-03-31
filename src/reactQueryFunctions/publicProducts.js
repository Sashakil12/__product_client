import api from './../utils/axios';

export async function getPublicProducts({ queryKey }) {
    try {
      console.log("user", queryKey);
      const res = await api.get(`/product?limit=${queryKey[1]}&skip=${queryKey[2]}`);
      console.log(res);
      return res.data;
    } catch (e) {
        console.log(e)
      return e;
    }
  }