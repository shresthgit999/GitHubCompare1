import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [gists, setGists] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/vabhishek-me')
    .then(res => res.json())
    .then(data => {
      setData(data);
    }); 
  } , []);
  const setData =({
    name,
    login,
    followers,
    following,
    public_repos,
    public_gists,
    avatar_url
  }) => {
  setName(name);
  setUserName(login);
  setFollowers(followers);
  setFollowing(following);
  setRepos(public_repos);
  setGists(public_gists);
  setAvatar(avatar_url);
  };
  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }
  const handleSubmit = () => {
    fetch('https://api.github.com/users/'+userInput)
     .then(res => res.json())
     .then(data => {
       if (data.message) {
         setError(data.message)
       }else {
         setData(data);
       }
       setData(data);
      })
  }
    return (
   <div>
     <div className='navbar'>GitHub Search</div>
        <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Github user' name='github user' onChange={handleSearch} />
            <Form.Button content='Compare' />
          </Form.Group>
        </Form>    
        </div>
        
        {error ? (<h1>{Error}</h1>) : (
           <div className="card">
        
        <Card>
    <Image src={avatar} 
    wrapped 
    ui={false} 
    />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Header>{userName}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {followers} Followers
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {repos} Repos
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {gists} Gists
      </a>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {following} Following
      </a>
    </Card.Content>
  </Card>
        </div>)}
      </div>
  );
}

export default App;
