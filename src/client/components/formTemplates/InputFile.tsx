import * as React from 'react';

export namespace InputFile {
  export interface Props {
    text?: string;
    imgSrc?: string;
    id:string;
  }

  export interface State {
      imgSrc: string
  }
}

export default class InputFile extends React.Component<InputFile.Props,InputFile.State> {
    constructor(props?: InputFile.Props, context?: any) {
        super(props, context);
        this.state = {
            imgSrc: ''
        };
        console.log("In InputFile");
    }

    handleChange=(e)=>{
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            imgSrc: reader.result
          });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {imgSrc} = this.state;
        let imgPreview = null;
        if (imgSrc) {
          imgPreview = (<img src={imgSrc} />);
        }
        return (
            <section>
                <label htmlFor={this.props.id}>{this.props.text}
                    <input className="form-control"
                        id={this.props.id}
                        type="file"
                        onChange={this.handleChange}/>
                </label>
                {imgPreview}
            </section>
            
        );
    }
}