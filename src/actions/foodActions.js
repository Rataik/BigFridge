const getNewDateTimeItem = (dateTimeColumns, item) => {
  const newItem = {};
  dateTimeColumns.forEach((column) => {
    newItem[column] = new Date(item[column]);
  });

  return newItem;
};

const parseDateTime = (dateTimeColumns, items) => items.map(item => ({
  ...item,
  ...getNewDateTimeItem(dateTimeColumns, item),
}));

// Custom data parser
// If we had separate data sources based on food types like meat, alcohol, cheese etc.
//  we could easily componentize this to meatParseData, cheeseParseData etc.
function parseFoodData(columnsOfTypeDateTime, json) {
  let items = json;
  if (columnsOfTypeDateTime.length !== 0) {
    items = parseDateTime(columnsOfTypeDateTime, json);
  }

  return {
    items,
  };
}

export default parseFoodData;
