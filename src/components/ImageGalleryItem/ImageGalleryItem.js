import { Component } from 'react';

import Modal from '../Modal';

class ImageGalleryItem extends Component {
  state = {
    largeImg: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = img => {
    this.setState({ largeImg: img });
    this.toggleModal();
  };

  render() {
    const { smallImg, largeImage, id, tags } = this.props;

    return (
      <>
        <li
          className="ImageGalleryItem"
          key={id}
          id={id}
          onClick={() => this.onImageClick(largeImage)}
        >
          <img src={smallImg} alt={tags} className="ImageGalleryItem-image" />
        </li>

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImg} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
