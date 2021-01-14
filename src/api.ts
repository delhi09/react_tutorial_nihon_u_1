type DogAPIRandomResponse = {
  message: string[];
};

const fetchImages = async (breed: string): Promise<DogAPIRandomResponse> => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/12`,
  );

  return (await response.json()) as Promise<DogAPIRandomResponse>;
};
export default fetchImages;
