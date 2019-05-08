import React, { Component } from 'react';
import { Row, Col, Input, Upload, Icon, Button, Modal, Typography } from 'antd';
import * as constants from '../../constants';
import "./index.scss";

const { Title } = Typography;
const { TextArea } = Input;
const {
    BUTTON_PRIMARY,
    CLASS_NAMES,
    EDIT_PROFILE_FIELDS,
    EDIT_PROFILE_TITLE,
    EDIT_PROFILE_UPLOAD_LIST_TYPE,
    ICONS,
} = constants;

const {
    antUploadText,
    card,
    infoField,
    locationInput,
    mb1,
    mb2,
    w100,
    w80,
} = CLASS_NAMES;

const { plus } = ICONS;

const {
    bioLabel,
    firstNameLabel,
    getLocationLabel,
    highSchoolLabel,
    intendedUniLabel,
    lastNameLabel,
    locationLabel,
    profilePhotoLabel,
    profilePhotoPreviewAlt,
    uploadLabel,
} = EDIT_PROFILE_FIELDS;

class EditProfile extends Component {
    state = { 
        fileList: [], 
        location: null, 
        locationLoading: false, 
        previewImage: '', 
        previewVisible: false, 
    }

    handleImagePreview = ({ url, thumbUrl }) => {
        this.setState({
            previewImage: url || thumbUrl,
            previewVisible: true,
        });
    };

    handleImagePreviewCancel = () => this.setState({ previewVisible: false });

    handleImageChange = ({ fileList }) => this.setState({ fileList });

    getLocation = ()  => {
        this.setState({ locationLoading: true });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                this.setState({ location: `${latitude}, ${longitude}`, locationLoading: false });
            });
        }
    }

    render(){
        const { fileList, location, locationLoading, previewImage, previewVisible  } = this.state;
        return (
            <Row className={`${card}`} gutter={32}>
                <Col span={24} className={`${mb2}`}>
                    <Title level={3}>{EDIT_PROFILE_TITLE}</Title>
                </Col>
                <Col span={12} md={{ span: 12 }} xs={24} className={`${mb1}`}>
                    <div className={`${infoField}`}>
                        <h4>{firstNameLabel}</h4>
                        <Input />
                    </div>
                    <div className={`${infoField}`}>
                        <h4>{lastNameLabel}</h4>
                        <Input />
                    </div>
                    <div className={`${infoField}`}>
                        <h4>{profilePhotoLabel}</h4>
                        <Upload
                            listType={EDIT_PROFILE_UPLOAD_LIST_TYPE}
                            fileList={fileList}
                            beforeUpload={() => false}
                            onPreview={this.handleImagePreview}
                            onChange={this.handleImageChange}
                        >
                            {fileList.length < 1 ? (
                                <div>
                                    <Icon type={plus} />
                                    <div className={antUploadText}>{uploadLabel}</div>
                                </div>
                            ) : null}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            footer={null}
                            onCancel={this.handleImagePreviewCancel}
                        >
                            <img
                                alt={profilePhotoPreviewAlt}
                                className={`${w100}`}
                                src={previewImage}
                            />
                        </Modal>
                    </div>

                </Col>
                <Col span={12} md={12} xs={24}>
                    <div className={`${infoField}`}>
                        <h4>{highSchoolLabel}</h4>
                        <Input />
                    </div>
                    <div className={`${infoField}`}>
                        <h4>{intendedUniLabel}</h4>
                        <Input />
                    </div>
                    <div className={`${infoField}`}>
                        <h4>{locationLabel}</h4>
                        <Input value={location} className={`${locationInput}`}  />
                        <Button 
                            onClick={this.getLocation} 
                            type={BUTTON_PRIMARY} 
                            loading={locationLoading}
                        >
                            {getLocationLabel}
                        </Button>
                    </div>
                </Col>
                <Col span={24} className={`${mb2}`}>
                    <div className={`${infoField}`}>
                        <h4>{bioLabel}</h4>
                        <TextArea className={`${w80}`} rows={4} />
                    </div>
                </Col>
                <Col span={24}>
                    <Button type={BUTTON_PRIMARY}>{EDIT_PROFILE_TITLE}</Button>
                </Col>
            </Row>
        );
    }
}

export default EditProfile;
