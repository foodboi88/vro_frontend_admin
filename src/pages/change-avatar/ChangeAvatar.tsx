import React, { useState } from 'react';
import { Form, Upload, Button, Input, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import UserIcon from '../../assets/image/user-icon.png'
import ImageNotFound from '../../assets/image/Image_not_available.png'
import axios from 'axios';
import './style.changeAvatar.scss'
import { changeAvatarRequest } from '../../redux/controller';
interface ChangeAvatarProps {
    userId: string;
}

const ChangeAvatar = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();
    const { accesstokenExpỉred, userName, userId } = useSelectorRoot((state) => state.login);
    const [imageUploadLst, setImageUploadLst] = useState<any>([]);
    const [checkLstImageUploadLst, setCheckLstImageUploadLst] = useState<any>([]);
    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChangeFileLst: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setCheckLstImageUploadLst(newFileList);
    };


    const onFinish = async (values: any) => {
        console.log('Success:', values);
        console.log("imageUploadLst", imageUploadLst[0]);
        // Lấy ra token từ local storage
        let tokenLogin: any = localStorage.getItem('token');
        tokenLogin = tokenLogin?.replace(/"/g, '');
        console.log("tokenLogin", tokenLogin);

        if (tokenLogin && imageUploadLst.length > 0) {
            dispatch(changeAvatarRequest({ avatar: imageUploadLst[0] }));
        }

    };

    return (
        <div className='change-pawword-main'>
            <h3 className='change-password-title'>Đổi ảnh đại diện</h3>
            <Form
                className='change-password-form'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Ảnh đại diện cũ"
                >
                    <img src={`https://api.banvebank.com.vn/users/avatar/${userId}`} alt='avatar' className='change-avatar-img'
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = ImageNotFound;
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện mới"
                    name="avatar"
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện!' }]}
                >
                    <Upload
                        multiple={false}
                        onRemove={(file) => {
                            let tmplst = imageUploadLst;
                            tmplst.filter((value: any, index: any, arr: any) => {
                                if (value.name === file.name) {
                                    // Removes the value from the original array
                                    arr.splice(index, 1);
                                    return true;
                                }
                                return false;
                            });

                            setImageUploadLst(tmplst);
                            return true;
                        }}
                        listType="picture-card"
                        showUploadList={{
                            showRemoveIcon: true,
                        }}
                        onChange={(file) => {
                            handleChangeFileLst(file);
                            console.log(imageUploadLst);
                        }}
                        accept=".png, .jpeg, .jpg"
                        beforeUpload={(file) => {
                            let tmplst = imageUploadLst;
                            tmplst.push(file);
                            setImageUploadLst(tmplst);
                            return false;
                        }}
                    >
                        {imageUploadLst.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>

                <motion.div className='change-passowrd-btn-item'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                >
                    <Button className='change-password-btn' type="primary" htmlType="submit">Đổi ảnh đại diện</Button>
                </motion.div>
            </Form>
        </div >
    )
};

export default ChangeAvatar;