import one from './images/one.png'
import two from './images/two.png'
import three from './images/three.png'
import four from './images/four.png'
import five from './images/five.png'




const Main = () => {

  const imageStyle={
    position:'absolute',
    width: '1080px'
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',  
      width: '100vw', 
      height: '100vh'
      }}
    >
      <img src={one} alt="as" style={imageStyle} />
      <img src={two} alt="as" style={imageStyle} />
      <img src={three} alt="as" style={imageStyle} />
      <img src={four} alt="as" style={imageStyle} />
      <img src={five} alt="as" style={imageStyle} />
    </div>
  )
}

export default Main;