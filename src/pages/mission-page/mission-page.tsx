import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { getMissionPageDataRequest, saveMissionPageDataRequest } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import './mission-page.styles.scss';

const MissionPage = () => {
    const { missionPageData, isLoadingUpload } = useSelectorRoot((state) => state.management); // Lst cac ban ve   
    const [newFiles, setNewFiles] = useState<RcFile[]>([]);
    const [selectedForm, setSelectedForm] = useState<any>(1); // Form dang duoc chon de edit
    const [form] = Form.useForm();
    const dispatch = useDispatchRoot();

    useEffect(() => {
        // Lấy dữ liệu trang sứ mệnh
        dispatch(getMissionPageDataRequest())
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
        console.log(missionPageData);

        if (missionPageData.length > 0) {
            console.log(missionPageData[selectedForm - 1]);
            if (missionPageData[selectedForm - 1] !== undefined) {
                form.setFieldsValue(missionPageData[selectedForm - 1]);
            }
        }
    }, [selectedForm, missionPageData])

    const handleUploadSketch = (data: any) => {
        Modal.confirm({
            title: 'Bạn có muốn lưu thông tin khối này?',
            cancelText: 'Hủy',
            okText: 'Lưu',
            onOk: () => {
                dispatch(saveMissionPageDataRequest(data));
                console.log(data)
            },
            onCancel: () => {
                // setSelectedForm(selectedForm);
                // setNewFiles([]);
            }
        });
        // dispatch(saveMissionPageDataRequest(data));
        // console.log(data)
    };

    const handleClickChangeForm = (index: number) => {
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
                setNewFiles([]);
            }
        });

        // setSelectedForm(index);

    }
    return (
        <div className='block-list'>
            <div className="title-block-list">Sứ mệnh</div>

            <div className='block-lst-items'>
                <div className='block-lst-items-title'>
                    {missionPageData.length > 0 &&
                        missionPageData.map((item: any, index: any) => (
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
                    {(missionPageData.length > 0 && missionPageData[selectedForm - 1]) &&
                        <Form
                            className="block-ui"
                            initialValues={missionPageData[selectedForm - 1]}
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
                                            initialValue={missionPageData[selectedForm - 1].id}
                                        >
                                        </Form.Item>
                                        <Form.Item
                                            className='hidden'
                                            name="index"
                                            initialValue={missionPageData[selectedForm - 1].index}
                                        >
                                        </Form.Item>
                                        <Form.Item
                                            name="title"
                                            label={<span>Tiêu đề <strong>*</strong></span>}
                                            initialValue={missionPageData[selectedForm - 1].title}
                                        >
                                            <Input
                                                className="search-input"
                                                placeholder="Nhập tiêu đề"
                                                defaultValue={missionPageData[selectedForm - 1].title}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="text"
                                            label={<span>Nội dung chi tiết <strong>*</strong></span>}
                                        >

                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập nội dung"
                                                defaultValue={missionPageData[selectedForm - 1].text}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className='hidden'
                                            name="buttonName"
                                            label={<span>Tên nút bấm <strong>*</strong></span>}
                                        >
                                            <Input
                                                className="search-input"
                                                placeholder="Nhập tên nút bấm"
                                                defaultValue={missionPageData[selectedForm - 1].buttonName}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className='hidden'
                                            name="buttonLink"
                                            label={<span>Đường dẫn của nút bấm <strong>*</strong></span>}
                                        >
                                            <Input
                                                className="search-input"
                                                placeholder="Nhập đường dẫn của nút bấm"
                                                defaultValue={missionPageData[selectedForm - 1].buttonLink}
                                            />
                                        </Form.Item>
                                        <div className='image-form'>
                                            <div>Danh sách ảnh cũ:</div>
                                            <div>
                                                {missionPageData[selectedForm - 1].images.map((itemImage: any) => (
                                                    <>
                                                        <div>
                                                            <img style={{ maxWidth: '160px' }} src={itemImage} />
                                                        </div>
                                                    </>

                                                ))}
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

export default MissionPage