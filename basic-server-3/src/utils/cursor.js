const generateCursor = (lastItem) => {
  if (!lastItem) {
    return null;
  }

  const raw = `${lastItem._id || lastItem.id}`;
  return Buffer.from(raw).toString('base64');
};

const parseCursor = (cursor) => {
  if (!cursor) {
    return null;
  }

  return Buffer.from(cursor, 'base64').toString('utf8');
};

export {
  generateCursor,
  parseCursor,
}