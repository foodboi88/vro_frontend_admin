import { UploadOutlined } from '@ant-design/icons';
import { Modal, Button, Upload, Form } from 'antd';
import Input from 'rc-input';
import TextArea from 'rc-textarea';
import { RcFile } from 'rc-upload/lib/interface';
import React, { useEffect, useState } from 'react'
import { getHomepageBannerDataRequest, getMissionPageDataRequest, saveHomepageBannerDataRequest, saveMissionPageDataRequest } from '../../../redux/controller';
import { useSelectorRoot, useDispatchRoot } from '../../../redux/store';
import './banner-homepage.styles.scss'

const BannerHomepage = () => {
    const { bannerHomepageData, isLoadingUpload } = useSelectorRoot((state) => state.management); // Lst cac ban ve   
    const [newFiles, setNewFiles] = useState<RcFile[]>([]);
    const [selectedForm, setSelectedForm] = useState<any>(1); // Form dang duoc chon de edit
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();

    useEffect(() => {
        // Lấy dữ liệu trang sứ mệnh
        dispatch(getHomepageBannerDataRequest())
    }, [])

    useEffect(() => {
        console.log(newFiles);

    }, [newFiles])

    // useEffect(() => {
    //     if (missionPageData.length > 0) {
    //         console.log(missionPageData[0]);
    //         form.setFieldsValue(missionPageData[0]);
    //     }
    // }, [missionPageData])

    useEffect(() => {
        console.log(bannerHomepageData);

        if (bannerHomepageData.length > 0) {
            console.log(bannerHomepageData[selectedForm - 1]);
            if (bannerHomepageData[selectedForm - 1] !== undefined) {
                form.setFieldsValue(bannerHomepageData[selectedForm - 1]);
            }
        }
    }, [selectedForm, bannerHomepageData])

    const handleUploadSketch = (data: any) => {
        if (newFiles.length <=0) return;
        console.log(data);
        Modal.confirm({
            title: 'Bạn có xác nhận lưu thông tin khối này?',
            cancelText: 'Hủy',
            okText: 'Lưu',
            onOk: () => {
                dispatch(saveHomepageBannerDataRequest(data));
                console.log(data)
                resetForm()
            },
            onCancel: () => {
            }
        });

    };

    const handleClickChangeForm = (index: number) => {
        if(newFiles.length){

            Modal.confirm({
                title: 'Bạn có muốn lưu thông tin khối này trước khi chuyển khối sau?',
                cancelText: 'Hủy',
                okText: 'Lưu',
                onOk: () => {
                    form.submit();
                    setSelectedForm(index);
                },
                onCancel: () => {
                    setSelectedForm(index);
                    resetForm()
                }
            });
        }else{
            setSelectedForm(index);
            resetForm()

        }
    }

    const resetForm = () => {
        setNewFiles([]);
        form.resetFields(['images']);
    }


    return (
        <div className='block-list'>
            <div className="title-block-list">Sứ mệnh</div>

            <div className='block-lst-items'>
                <div className='block-lst-items-title'>
                    {bannerHomepageData.length > 0 &&
                        bannerHomepageData.map((item: any, index: any) => (
                            <Button
                                key={index}
                                className={`btn-title ${selectedForm === index + 1 ? 'active' : ''}`}
                                onClick={() => handleClickChangeForm(index + 1)}
                            >
                                Khối {index + 1}
                            </Button>
                        ))
                    }
                </div>
                <div className='block-lst-items-form'>
                    {(bannerHomepageData.length > 0 && bannerHomepageData[selectedForm - 1]) &&
                        <Form
                            className="block-ui"
                            initialValues={bannerHomepageData[selectedForm - 1]}
                            layout="vertical"
                            onFinish={handleUploadSketch}
                            form={form}
                        >
                            <div className="sketch-content-area">
                                <div className="content-area">
                                    <div className="sketch-content">
                                        <Form.Item
                                            className='hidden'
                                            name="id"
                                            initialValue={bannerHomepageData[selectedForm - 1].id}
                                        >
                                        </Form.Item>
                                        <Form.Item
                                            className='hidden'
                                            name="type"
                                            initialValue={bannerHomepageData[selectedForm - 1].type}
                                        >
                                        </Form.Item>
                                        
                                        <div className='image-form'>
                                            <div>Danh sách ảnh cũ:</div>
                                            <div>
                                                    <>
                                                        <div>
                                                            <img style={{ maxWidth: '160px' }} src={bannerHomepageData[selectedForm - 1].image} />
                                                        </div>
                                                    </>

                                            </div>
                                        </div>
                                        <Form.Item
                                            className="thumbnail"
                                            name='images'
                                            label='Danh sách ảnh mới'
                                        >
                                            <Upload
                                                maxCount={1}
                                                showUploadList={true}
                                                listType='picture'
                                                beforeUpload={(file) => {
                                                    if (newFiles.length >= 1) {
                                                        return false;
                                                    }
                                                    const cloneNewFiles = [...newFiles, file];
                                                    setNewFiles(cloneNewFiles);
                                                    return false;
                                                }}
                                            >
                                                <Button icon={<UploadOutlined />}>Upload ảnh</Button>
                                            </Upload>
                                        </Form.Item>
                                    </div>
                                    <div className="btn-submit-upload">
                                        <Button
                                            htmlType='submit'
                                            loading={isLoadingUpload}
                                        >
                                            Lưu thông tin khối
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerHomepage