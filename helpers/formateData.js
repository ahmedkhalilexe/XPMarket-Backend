const formateData = (allProducts) => {
  const formatedData = {};
  for (const row of allProducts) {
    const { itemId, itemImageUri, itemImageId, ...itemData } = row;
    if (!formatedData[itemId]) {
      formatedData[itemId] = { itemId: itemId, item: itemData, images: [] };
    }
    formatedData[itemId].images.push({
      imageId: itemImageId,
      imageUri: itemImageUri,
    });
  }
  return formatedData;
};
module.exports = formateData;
