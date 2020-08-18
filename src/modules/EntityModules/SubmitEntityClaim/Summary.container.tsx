import React, { Dispatch } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "common/redux/types";
import Summary from "./components/Summary/Summary";
import { FormControl } from "../../../common/components/JsonForm/types";
import * as submitEntityClaimSelectors from "./SubmitEntityClaim.selectors";
import * as selectedEntitySelectors from "../SelectedEntity/SelectedEntity.selectors";
import { getEntity } from "../SelectedEntity/SelectedEntity.actions";
import { goToQuestionNumber } from "./SubmitEntityClaim.actions";

interface Props {
  questions: FormControl[];
  entityDid: string;
  match: any;
  answersComplete: boolean;
  handleGetEntity: (entityDid: string) => void;
  handleGoToQuestionClick: (questionNo: number) => void;
}

interface State {
  showForm: boolean;
}

class SummaryContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      showForm: false,
    };
  }

  componentDidMount(): void {
    const {
      match: {
        params: { projectDID: entityDid },
      },
      handleGetEntity,
    } = this.props;

    handleGetEntity(entityDid);
  }

  handleGoToQuestion = (questionNo: number): void => {
    const { handleGoToQuestionClick } = this.props;
    handleGoToQuestionClick(questionNo);
    this.setState({ showForm: true });
  };

  render(): JSX.Element {
    const { entityDid, questions, answersComplete } = this.props;

    if (this.state.showForm || !answersComplete) {
      return (
        <Redirect
          to={`/projects/${entityDid}/overview/action/new_claim/form`}
        />
      );
    }

    return (
      <>
        <Summary
          cancelLink={`/projects/${entityDid}/overview`}
          submitLink={`/projects/${entityDid}/overview/action/new_claim/form`}
          questions={questions.map((question) => ({
            title: question.title,
            control: question.control,
          }))}
          handleNavigatetoQuestion={this.handleGoToQuestion}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  questions: submitEntityClaimSelectors.selectQuestions(state),
  entityDid: selectedEntitySelectors.selectEntityDid(state),
  answersComplete: submitEntityClaimSelectors.selectAnswersComplete(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
  handleGetEntity: (entityDid): void => dispatch(getEntity(entityDid)),
  handleGoToQuestionClick: (questionNo: number): void =>
    dispatch(goToQuestionNumber(questionNo)),
});

export const SummaryContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryContainer);
