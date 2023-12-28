import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Rank from './components/Rank/Rank';


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = '67538a15746348759bf71da9788d3f7b';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'schizo';       
    const APP_ID = 'Test';
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imageUrl;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn:false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  
  loadUser = (data) => {
  
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entires,
      joined: data.joined
    }})
  }

  // async componentDidMount() {
  //   try {
  //     const response = await fetch("http://localhost:3000");
  //     const responseData = await response.json();
  //    console.log(responseData);
  //   } catch(error) {
  //     console.log("error",error);
  //   }   
  // }

  calculateFaceLocation = (data) => {
    const outputs = data.outputs;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);

  const boxes = outputs.flatMap(output => {
    const regions = output.data.regions;
    return regions.map(region => ({
      leftCol: region.region_info.bounding_box.left_col * width,
      topRow: region.region_info.bounding_box.top_row * height,
      rightCol: width - (region.region_info.bounding_box.right_col * width),
      bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
    }));
  });
    return boxes;
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes }, () => {
      console.log("displayFaceBox", this.state.boxes);
    });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = async () => {
  this.setState({ imageUrl: this.state.input }, async () => {
    try {
      const response = await fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(this.state.imageUrl));
      const responseData = await response.json();

      if (response.ok) {
        const data = await fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:this.state.user.id
          })
        });
        const count  = await data.json();
        this.setState(Object.assign(this.state.user, {entries: count}));
        this.displayFaceBox(this.calculateFaceLocation(responseData));
      }
    } catch (error) {
      console.log('error', error);
    }
  });
}

onRouteChange = (route) => {
  if(route ==='signout') {
    this.setState({isSignedIn: false});
  } else if(route === 'home') {
    this.setState({isSignedIn: true});
  }
    this.setState({route: route});
}


  render() {
    return (
      <div className="App">
        <Navigation route={this.state.route} isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
            ? <div>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
              </div>
            : (this.state.route === 'register'
              ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}


export default App;
