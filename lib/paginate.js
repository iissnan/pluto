'use strict';

module.exports = function paginate(collection, page = 1, size = 30) {
  const offset = (page - 1) * size;
  const items = collection.slice(offset, offset + size);

  return {
    page: page,
    size: size,
    total: collection.length,
    pages: Math.ceil(collection.length / size),
    items: items
  };
};
