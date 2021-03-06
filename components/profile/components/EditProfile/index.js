import { Row, Col, Input, Upload, Icon, Button, Modal, Typography, message } from 'antd';
import React, { Component } from 'react';

import * as constants from '../../constants';
import "./index.scss";

const { Title } = Typography;
const { TextArea } = Input;
const {
    BUTTON_PRIMARY,
    CLASS_NAMES: {
        antUploadText,
        card,
        infoField,
        mb1,
        mb2,
        w100,
        w80,
    },
    EDIT_PROFILE_FIELDS,
    EDIT_PROFILE_TITLE,
    ICONS: { plus },
} = constants;

class EditProfile extends Component {
    constructor(props){
        super(props);

        const { firstName, lastName, bio, highSchool, intendedUni, username } = props.user;

        this.state = {
            bio: bio || '',
            fileList: [],
            firstName: firstName || '',
            highSchool: highSchool || '',
            intendedUni: intendedUni || '',
            lastName: lastName || '',
            loading: false,
            previewImage: '',
            previewVisible: false,
            username: username || '',
        };
    }

    handleTextChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        const { updateUser } = this.props;
        const { firstName, lastName, highSchool, intendedUni, username, bio } = this.state;
        const data = { bio, firstName, highSchool, intendedUni, lastName,  username };
        
        updateUser(data);

        // get errors data from state after action has been made
        const { errors } = this.props;    
        
        // return error message if there are errors 
        if (errors){
            return message.error('An error occured');
        }
        
        return message.success('Profile Update successfully');

    };

    generateComponent = (name, label, extra) => {
        const { fileList, previewImage, previewVisible } = this.state;
        switch (name) {
        case 'firstName':
        case 'highSchool':
        case 'intendedUni':
        case 'lastName':
        case 'username':
            return <Input 
                name={name} 
                onChange={this.handleTextChange} 
                // eslint-disable-next-line react/destructuring-assignment
                value={this.state[name]} 
            />;

        case 'bio':
            return (
                <TextArea 
                    name={name} 
                    onChange={this.handleTextChange}  
                    // eslint-disable-next-line react/destructuring-assignment
                    value={this.state[name]} 
                    className={`${w80}`} rows={4} 
                />
            );
        
        case 'profilePhoto':
            return (
                <div>
                    <Upload
                        listType={extra.uploadListType}
                        fileList={fileList}
                        beforeUpload={() => false}
                        onPreview={this.handleImagePreview}
                        onChange={this.handleImageChange}
                    >
                        {fileList.length < 1 ? (
                            <div>
                                <Icon type={plus} />
                                <div className={antUploadText}>{extra.uploadLabel}</div>
                            </div>
                        ) : null}
                    </Upload>
                    <Modal
                        visible={previewVisible}
                        footer={null}
                        onCancel={this.handleImagePreviewCancel}
                    >
                        <img
                            alt={extra.profilePhotoPreviewAlt}
                            className={`${w100}`}
                            src={previewImage}
                        />
                    </Modal>
                </div>
            );

        default:
            return null;
        }
    };

    handleImagePreview = ({ url, thumbUrl }) => {
        this.setState({
            previewImage: url || thumbUrl,
            previewVisible: true,
        });
    };

    handleImagePreviewCancel = () => this.setState({ previewVisible: false });

    handleImageChange = ({ fileList }) => this.setState({ fileList });

    render(){
        const { loading } = this.props;
        return (
            <Row className={`${card}`} gutter={32}>
                <Col span={24} className={`${mb2}`}>
                    <Title level={3}>{EDIT_PROFILE_TITLE}</Title>
                </Col>
                <Col span={24} md={{ span: 24 }} xs={24} className={`${mb1}`}>
                    {
                        EDIT_PROFILE_FIELDS.map((
                            ({ label, name, className, extra }) => (
                                <Col
                                    key={label}
                                    span={12}
                                    md={name === 'bio' ? 24 : 12} xs={24}>
                                    <div key={label} className={className || infoField}>
                                        <h4>{label}</h4>
                                        {this.generateComponent(name, label, extra)}
                                    </div>
                                </Col>
                            )
                        ))
                    }
                </Col>
                <Col span={24}>
                    <Button 
                        onClick={this.handleSubmit} 
                        loading={loading} 
                        type={BUTTON_PRIMARY}
                    >
                        {EDIT_PROFILE_TITLE}
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default EditProfile;
