import * as React from "react";
import InputText from "common/components/Form/InputText/InputText";
import { FormStyles } from "types/models";
import {
  SearchWrapper,
  ModalButton,
  SearchIconWrapper,
  SearchModal,
  SearchHeading,
  SearchButtonsWrapper,
  SearchFilterButton,
  ButtonContent,
} from "./Search.styles";
import Investments from "assets/icons/Investments";
import Cells from "assets/icons/Cells";
import Oracle from "assets/icons/Oracle";
import Template from "assets/icons/Template";
import SearchIcon from "assets/icons/Search";
import Down from "assets/icons/Down";
import Projects from "assets/icons/Projects";
import DataAssets from "assets/icons/DataAssets";
import { EntityType } from "../../types";
import { entityTypeMap } from "../../strategy-map";

// TODO - search submitted

interface Props {
  entityType: EntityType;
  entityColor?: string;
  filterChanged: (entityType: EntityType) => void;
}

export default class Search extends React.Component<Props> {
  state = {
    search: "",
    isModalOpen: false,
  };

  handleChange = (event): void => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSubmit = (e): void => {
    e.preventDefault();
    alert(`Search for: ${this.state.search}`);
  };

  handleToggleModal = (): void => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSearchFilter = (entityType: EntityType): void => {
    this.handleToggleModal();
    this.props.filterChanged(entityType);
  };

  render(): JSX.Element {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-lg-8 offset-lg-2">
            <SearchWrapper>
              <ModalButton
                onClick={(): void => this.handleToggleModal()}
                className={this.state.isModalOpen ? "modal-open" : ""}
              >
                {this.props.entityType === EntityType.Project && (
                  <Projects fill="#000" width="26" />
                )}
                {this.props.entityType === EntityType.Oracle && (
                  <Oracle fill="#000" width="26" />
                )}
                {this.props.entityType === EntityType.Investment && (
                  <Investments fill="#000" width="26" />
                )}
                {this.props.entityType === EntityType.Cell && (
                  <Cells fill="#000" width="26" />
                )}
                {this.props.entityType === EntityType.Template && (
                  <Template fill="#000" width="26" />
                )}
                {this.props.entityType === EntityType.Data && (
                  <DataAssets fill="#000" width="26" />
                )}
                <span className="modal-text">
                  {entityTypeMap[this.props.entityType].plural}
                </span>
                <span
                  className="down-icon"
                  style={{
                    transform: this.state.isModalOpen ? "rotateX(180deg)" : "",
                  }}
                >
                  <Down fill="#000" />
                </span>
              </ModalButton>
              <form
                onSubmit={(e): void => this.handleSubmit(e)}
                className="search-input-wrapper"
              >
                <InputText
                  formStyle={FormStyles.search}
                  id="name"
                  type="text"
                  text={`Search all ${entityTypeMap[
                    this.props.entityType
                  ].plural.toLowerCase()}`}
                  key="search"
                  onChange={(event): void => this.handleChange(event)}
                />
              </form>
              <SearchIconWrapper onClick={this.handleSubmit}>
                <SearchIcon fill={this.props.entityColor || "#83d9f2"} />
              </SearchIconWrapper>
              <SearchModal
                style={{ display: this.state.isModalOpen ? "block" : "none" }}
              >
                <SearchHeading>Explore</SearchHeading>
                <SearchButtonsWrapper>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Project)
                    }
                    className={`
                    ${EntityType.Project.toLowerCase()} ${
                      this.props.entityType === EntityType.Project
                        ? "active"
                        : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <Projects fill="#000" width="26" />
                      {entityTypeMap[EntityType.Project].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Oracle)
                    }
                    className={`
                    ${EntityType.Oracle.toLowerCase()} ${
                      this.props.entityType === EntityType.Oracle
                        ? "active"
                        : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <Oracle fill="#000" width="26" />
                      {entityTypeMap[EntityType.Oracle].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Investment)
                    }
                    className={`
                    ${EntityType.Investment.toLowerCase()} ${
                      this.props.entityType === EntityType.Investment
                        ? "active"
                        : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <Investments fill="#000" width="26" />
                      {entityTypeMap[EntityType.Investment].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Cell)
                    }
                    className={`
                    ${EntityType.Cell.toLowerCase()} ${
                      this.props.entityType === EntityType.Cell ? "active" : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <Cells fill="#000" width="26" />
                      {entityTypeMap[EntityType.Cell].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Template)
                    }
                    className={`
                    ${EntityType.Template.toLowerCase()} ${
                      this.props.entityType === EntityType.Template
                        ? "active"
                        : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <Template fill="#000" width="26" />
                      {entityTypeMap[EntityType.Template].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                  <SearchFilterButton
                    onClick={(): void =>
                      this.handleSearchFilter(EntityType.Data)
                    }
                    className={`
                    ${EntityType.Data.toLowerCase()} ${
                      this.props.entityType === EntityType.Data ? "active" : ""
                    }
                    `}
                  >
                    <ButtonContent>
                      <DataAssets fill="#000" width="26" />
                      {entityTypeMap[EntityType.Data].plural}
                    </ButtonContent>
                  </SearchFilterButton>
                </SearchButtonsWrapper>
              </SearchModal>
            </SearchWrapper>
          </div>
        </div>
      </div>
    );
  }
}
