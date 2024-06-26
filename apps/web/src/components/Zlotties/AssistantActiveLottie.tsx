import Lottie from 'react-lottie';
import * as animationData from 'assets/lottie/assistant-active-white.json';

const AssistantActiveLottie = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} />;
};

export default AssistantActiveLottie;
