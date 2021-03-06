import React, { Component } from 'react';
import './App.css';

class Search extends Component {

  render() {
    const { searchTerm, onSearchChange } = this.props;
    return (
      <div className="Search">
	<form>
	  <input
	    type="text"
	    value={searchTerm}
	    onChange={onSearchChange}
	  />
        </form>
      </div>
    );
  } 
}

class ItemList extends Component {

  searchItem(item) {
    return item.title.toLowerCase()
      .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return (
      <div className="books">
      <ul>
      {this.props.list.filter(item => this.searchItem(item)).map(
        item =>
        <li key={item.id}>
          <span className="badge">{item.id}</span>
          <span className="title">
            <a href={item.url}>{item.title}</a>
          </span>
          <button
            className="delete"
            onClick={() => this.props.onDismiss(item.id)}>
              x
            </button>
        </li>          
      )}
      </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: null,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);    
  }

  componentDidMount() {
    fetch('/api/books')
      .then(response => response.json())
      .then(result =>  this.setState({list: result}))
      .catch(error => error);
  }
  
  onDismiss(id) {
    fetch(`/api/books/${id}`, {method: "DELETE"})
      .then(response => {
        const updatedList = this.state.list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
      })
      .catch(error => error);
  }

  onSearchChange(event) {
    // shallow merge, so list is preserved
    this.setState({ searchTerm: event.target.value });
  }
 
  render() {

    if (!this.state.list) { return null; }
    
    return (
      <div className="App">
        <Search
          value={this.searchTerm}
          onSearchChange={this.onSearchChange}
        />
        <ItemList
          list={this.state.list}
          searchTerm={this.state.searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
  
}

export default App;
