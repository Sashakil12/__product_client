import { Checkbox } from "@chakra-ui/react";
import React, { useContext } from "react";
import productContext from "./../../context/productContext";

function SelectProduct({ id }) {
  const productCtx = useContext(productContext);

  const handleClicked = (e) => {
    if (e.target.checked) {
      productCtx.setSelected([...productCtx.selected, id]);
    } else {
      productCtx.setSelected([
        ...productCtx.selected.filter((el) => el !== id),
      ]);
    }
    return;
  };
  return (
    <>
      <Checkbox mx="1" onChange={handleClicked} />
    </>
  );
}

export default SelectProduct;
