import React, { FC, useEffect, useState } from 'react';
import fetchImages from './api';
import './App.css';

const Header: FC = () => {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Cute Dog Images</h1>
        </div>
      </div>
    </header>
  );
};

type OnFormSubmitFunction = (param: string) => void;

interface FormProps {
  onFormSubmit: OnFormSubmitFunction;
}

const Form: FC<FormProps> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const eventTarget = event.target as HTMLFormElement;
    const breed: HTMLInputElement | null = eventTarget.elements.namedItem(
      'breed',
    ) as HTMLInputElement;
    if (breed != null) {
      props.onFormSubmit(breed.value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="shiba">
                <option value="shiba">Shiba</option>
                <option value="akita">Akita</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

type ImageProps = {
  src: string;
};

const Image: FC<ImageProps> = (props) => {
  const { src } = props;

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={src} alt="cute dog" />
        </figure>
      </div>
    </div>
  );
};

const Loading: FC = () => {
  return <p>Loading...</p>;
};

type GalleryProps = {
  urls: string[];
};

const Gallery: FC<GalleryProps> = (props) => {
  const { urls } = props;
  if (urls.length === 0) {
    return <Loading />;
  }

  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
};

const Main: FC = () => {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    void fetchImages('shiba').then((dogImageUrls) => {
      setUrls(dogImageUrls);
    });
  }, []);

  const reloadImages = (breed: string) => {
    void fetchImages(breed).then((reloadedDogImageUrls) => {
      setUrls(reloadedDogImageUrls);
    });
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
};

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Dog images are retrieved from Dog API</p>
        <p>
          <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
        </p>
      </div>
    </footer>
  );
};

const App: FC = () => {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
