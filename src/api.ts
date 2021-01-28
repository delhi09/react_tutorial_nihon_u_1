type DogAPIRandomResponse = {
  message: string[];
};

const fetchImages = async (breed: string): Promise<string[]> => {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random/12`,
  );

  const data: Promise<DogAPIRandomResponse> = (await response.json()) as Promise<DogAPIRandomResponse>;

  return (await data).message;
};
export default fetchImages;
