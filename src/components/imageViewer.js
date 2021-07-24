import { useState } from "react";

const ImageViewer = ({thumbnail, images}) => {
  const [currentImage, setCurrentImage] = useState(thumbnail);

  const styles = {
    mainImage: {
      width: 530,
      height: 355,
      marginBottom: 8,
      borderRadius: 12,
    },
    smallImage: {
      width: 56,
      height: 56,
      cursor: 'pointer'
    },
    switcher: {
      display: 'flex',
      gap: 8
    },
  }

  const handleClick = (image) => {
    setCurrentImage(image);
  }

  return (
    <div>
      <img src={currentImage} style={styles.mainImage}/>
      <div style={styles.switcher} >
        {images.length > 1 && images.map(i => <img src={i} style={{
          ...styles.smallImage,
          border: i == currentImage ? '2px solid #0076d4' : '2px solid transparent'
        }} onClick={() => handleClick(i)} />)}
      </div>
    </div>
  );
}
 
export default ImageViewer;