import { Component } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import './styles.css';

class App extends Component {
  state = {
    imgName: '',
  };

  handleFormSubmit = data => {
    this.setState({ imgName: data });
  };

  render() {
    return (
      <div className="App">
        <Searchbar formSubmit={this.handleFormSubmit} />
        <ImageGallery imgName={this.state.imgName} />
      </div>
    );
  }
}

export default App;
