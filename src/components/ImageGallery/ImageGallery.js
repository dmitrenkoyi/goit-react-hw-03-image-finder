import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import ImagesAPI from '../Api/img-api';
import LoaderSpinner from '../Loader';

class ImageGallery extends Component {
  state = {
    currentPage: 1,
    images: [],
    error: '',
    status: 'idle',
  };

  componentDidMount() {
    this.setState({ currentPage: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const { imgName } = this.props;
    const { currentPage } = this.state;

    if (prevProps.imgName !== imgName) {
      this.setState({
        currentPage: 1,
        images: [],
      });
    }

    if (
      (prevProps.imgName !== imgName && currentPage === 1) ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ status: 'pending' });

      ImagesAPI.fetchImages(imgName, currentPage)
        .then(response => {
          this.setState(prev => ({
            images: [...prev.images, ...response.hits],
            status: 'resolved',
          }));
          if (response.hits.length === 0) {
            this.setState({
              error: 'По вашему запросу ничего не найдено.',
              status: 'rajected',
            });
          }
        })
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  onLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'idle') {
      return <div className="Status">Введите запрос в поле поиска</div>;
    }

    if (status === 'pending') {
      return (
        <div>
          {' '}
          <LoaderSpinner />{' '}
        </div>
      );
    }

    if (status === 'rajected') {
      return <div className="Status-error">{error}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(img => (
              <ImageGalleryItem
                key={img.webformatURL}
                smallImg={img.webformatURL}
                largeImage={img.largeImageURL}
                id={img.id}
                tags={img.tags}
              />
            ))}
          </ul>
          {images.length > 0 && <Button onClick={this.onLoadMore} />}
        </>
      );
    }
  }
}
export default ImageGallery;
