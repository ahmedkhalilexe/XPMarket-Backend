const formateData = (allProducts) => {
  const formatedData = {};
  console.log(allProducts);
  for (const row of allProducts) {
    const { productId, productImageUri, productImageId, ...productData } = row;
    if (!formatedData[productId]) {
      formatedData[productId] = {
        productId: productId,
        product: productData,
        images: [],
      };
    }
    formatedData[productId].images.push({
      imageId: productImageId,
      imageUri: productImageUri,
    });
  }
  const formattedProductsArray = Object.values(formatedData);
  console.log(formattedProductsArray);
  return formattedProductsArray;
};
module.exports = formateData;
