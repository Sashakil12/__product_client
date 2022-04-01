import api from './../utils/axios';

export async function fetchProducts({ queryKey }) {
    try {
      console.log("fetch-products", queryKey);
      const res = await api.get(`/product/all?limit=${queryKey[1]}&skip=${queryKey[2]}`);
      console.log(res);
      return res.data;
    } catch (e) {
        console.log(e)
      return e;
    }
  }


  
export async function addProduct(val) {
  try {
    console.log("add-products", val);
    const res = await api.post(`/product/add`, val);
    console.log(res);
    return res.data;
  } catch (e) {
      console.log(e)
    return e;
  }
}