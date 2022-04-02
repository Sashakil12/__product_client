import api from "./../utils/axios";

export async function fetchProducts({ queryKey }) {
  try {
    console.log("fetch-products", queryKey);
    const res = await api.get(
      `/product/all?limit=${queryKey[1]}&skip=${queryKey[2]}`
    );
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}

export async function addProduct(val) {
  try {
    console.log("add-products", val);
    const res = await api.post(`/product/add`, val);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}

export async function deleteProduct({ ids: val, setSelected }) {
  try {
    console.log("delete-products", val);
    let res;
    if (!val.length) throw new Error("No product selected");
    if (val.length < 2) {
      console.log("single call");
      res = await api.delete(`/product/${val[0]}`);
    } else {
      res = await api.delete(`/product/multiple`, { data: { ids: val } });
    }
    setSelected([]);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}

export async function updateProduct({values, _id}) {
  try {
    console.log("update-products", values);
    
    const res = await api.patch(`/product/${_id}`, values);

    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e)
  }
}
