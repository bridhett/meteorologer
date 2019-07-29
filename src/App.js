import React from 'react';
import './App.css';
//import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
// import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
import SearchIcon from '@material-ui/icons/Search';
//import LinearProgress from '@material-ui/core/LinearProgress';
import ProgressBar from 'react-bootstrap/Form';

class App extends React.Component {

  state={
    memes:[],
    loading: false,
    text:'',
  }

  getMemes = async (e) => {
    e.preventDefault()
    this.setState({loading: true})
    var key = 'Kd8A5MXRCFSgM6bRq33arpSGh8aVBBsw'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({memes: json.data, loading:false, text:''})
    console.log(json)
  }

  render() {
    var {memes, loading, text} = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.getMemes}>
          <Form.Control value={text}
            autoFocus
            variant="outlined"
            placeholder="Search for Memes"
            onChange={e=> this.setState({text: e.target.value})}
            style={{width:'100%',marginLeft:8}}
          />
          <Button variant="contained"
            color="primary"
            disabled={loading || !text} 
            type="submit"
            style={{width:150, margin:'0 10px', height:75}}>
            <SearchIcon style={{marginRight:8}} />
            Search
          </Button>
        </form>
        {loading && <ProgressBar striped variant="success" />}
        <main>
          {memes.map(meme=>{
            return <Meme key={meme.id} meme={meme} />
          })}
        </main>
      </div>
    );
  }
}

function Meme(props){
  const {meme} = props
  const url = meme.images.fixed_height.url
  return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
    <img height="200" alt="meme" src={url} />
  </div>)
}
export default App;
