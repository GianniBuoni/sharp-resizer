const nameSearch = (i: string) => {
  const regex = /\/(.*)\./;

  if (regex.test(i)) {
    return i.match(regex)[1];
  } else {
    return i.split(".")[0];
  }
};

export default nameSearch;
