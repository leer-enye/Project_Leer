import React, { Component } from 'react';
import { Row, Col, Input, Upload, Icon, message, Button, Typography } from 'antd';

import "./index.scss";

const { Title } = Typography;
const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class EditProfile extends Component {
    state = { loading: false, location: null, locationLoading: false }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

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
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <Row className="card" gutter={32}>
                <Col span={24} style={{ marginBottom: 32 }}>
                    <Title level={3}>Update Profile</Title>
                </Col>
                <Col span={12} md={{ span: 12 }} xs={24} style={{ marginBottom: '1rem' }}>
                    <div className="info-field">
                        <h4 >First Name</h4>
                        <Input style={{ width: '70%' }} />
                    </div>
                    <div className="info-field">
                        <h4>Last Name</h4>
                        <Input style={{ width: '70%' }} />
                    </div>
                    <div className="info-field">
                        <h4>Profile photo</h4>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img style={{ width: 128, height: 128 }} src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                    </div>

                </Col>
                <Col span={12} md={12} xs={24}>
                    <div className="info-field">
                        <h4>High School</h4>
                        <Input style={{ width: '70%' }} />
                    </div>
                    <div className="info-field">
                        <h4>Intended University</h4>
                        <Input style={{ width: '70%' }} />
                    </div>
                    <div className="info-field">
                        <h4>Location</h4>
                        <Input value={this.state.location} style={{ width: '70%', display: 'block', marginBottom: 8 }} />
                        <Button onClick={this.getLocation} type="primary" loading={this.state.locationLoading}>Get Location</Button>
                    </div>
                </Col>
                <Col span={24} style={{ marginBottom: 32 }}>
                    <div className="info-field">
                        <h4>My Bio</h4>
                        <TextArea style={{ width: '80%' }} rows={4} />
                    </div>
                </Col>
                <Col span={24} style={{}}>
                    <Button type="primary">Update Profile</Button>
                </Col>
            </Row>
        );
    }
}

export default EditProfile;
