const subStr = (content, start, length) => {
  if (content.length >= length) {
    return content.substr(start, length).concat("...");
  } else {
    return content;
  }
};

export default subStr;
