const s3Url = ({ storageBucket, storageKey, fileName }) => {
  if (storageBucket && storageKey && fileName) {
    return `https://s3-us-west-2.amazonaws.com/${storageBucket}/${storageKey}/${fileName}`;
  }
  return null;
};

export default s3Url;
