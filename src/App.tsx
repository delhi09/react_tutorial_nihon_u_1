import React, { FC } from 'react';

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

type Props = {
  src: string;
};

const Image: FC<Props> = (props) => {
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

const Gallery: FC = () => {
  const url = 'https://images.dog.ceo/breeds/shiba/shiba-8.jpg';

  return (
    <div className="columns is-vcentered is-multiline">
      <div className="column is-3">
        <Image src={url} />
      </div>
    </div>
  );
};

const Main: FC = () => {
  return (
    <main>
      <section className="section">
        <div className="container">
          <Gallery />
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
