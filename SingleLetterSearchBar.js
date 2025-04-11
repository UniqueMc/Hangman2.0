
import React from 'react';

class SingleLetterSearchBar extends React.Component {
  state = { inputValue: '' };

  handleInputChange = (event) => {
    const value = event.target.value.charAt(0);
    this.setState({ inputValue: value });
  };

  handleSearchClick = () => {
    const { inputValue } = this.state;
    if (inputValue.length === 1) {
      this.props.onSearch(inputValue);
      this.setState({ inputValue: '' });
    } else {
      alert('Please enter a single letter.');
    }
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSearchClick();
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          maxLength={1}
          placeholder="Enter a letter"
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default SingleLetterSearchBar;
