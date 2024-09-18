import { Location, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Step, goToStep } from 'redux/entityMultiStepCreation/slice';

const useStepperNavigate = ({ location }: { location: Location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customNavigate = (step: Step) => {
    // Dispatch the Redux action
    dispatch(goToStep(step));

    // Then navigate
    navigate(step.path);
  };

  return customNavigate;
};

export default useStepperNavigate;
