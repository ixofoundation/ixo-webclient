
import Lottie from 'lottie-react';
import animationData from 'assets/lottie/assistant-inactive-black.json'


const AssistantInactiveLottie = () => {
  return (
    <div>
      <Lottie 
        animationData={animationData} 
        loop={true} 
        autoplay={true} 
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default AssistantInactiveLottie;
