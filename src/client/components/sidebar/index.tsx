import * as React from 'react';
import * as globalStyle from '../../containers/App/style.css';
import * as style from './style.css';
import * as Modal from 'react-modal';
import DynamicForm from '../formTemplates/DynamicForm';

const modalStyles = {
    overlay : {
        backgroundColor   : 'rgba(0, 0, 0, 0.75)',
        transition          : 'all 0.5s ease'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
  };

const formSchema = {
    "entities": [
        {
            "label": "Project Name",
            "name": "name",
            "type": "text"
        },
        {
            "label": "About",
            "name": "about",
            "type": "textarea"
        },
        {
            "label": "Country",
            "name": "country",
            "type": "country"
        },
        {
            "label": "Thumbnail",
            "name": "thumbnail",
            "type": "image"
        },
        {
            "label": "Owner Name",
            "name": "owner.name",
            "type": "text"
        },
        {
            "label": "Owner email",
            "name": "owner.email",
            "type": "text"
        }
    ]
}

export namespace Sidebar {
    export interface Props {

    }

    export interface State {
        isModalOpen:boolean
    }
}

export class Sidebar extends React.Component<Sidebar.Props, Sidebar.State> {
    constructor(props?: Sidebar.Props, context?: any) {
        super(props, context);
        this.state = {
            isModalOpen:false
        };

    }

    handleOpenModal = () => {
        this.setState({isModalOpen:true});
    }

    handleCloseModal = () => {
        this.setState({isModalOpen:false});
    }

    render() {
        return (
            <div id={style.sidebar} className='col-md-2'>
                <h2>Dashboard</h2>
                <Modal
                    style={modalStyles}
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.handleCloseModal}
                    contentLabel="Modal"
                    ariaHideApp={false}
                    >
                    <DynamicForm formSchema={formSchema.entities} />
                </Modal>
                <button onClick={this.handleOpenModal}>Create project</button>
            </div>
        );
    }
}
