import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { getMissionPageDataRequest, saveMissionPageDataRequest } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import './mission-page.styles.scss';

const MissionPage = () => {
    const { missionPageData } = useSelectorRoot((state) => state.management); // Lst cac ban ve   
    const [newFiles, setNewFiles] = useState<RcFile[]>([]);

    const [form] = Form.useForm();

    const dispatch = useDispatchRoot();

    useEffect(() => {
        // Lấy dữ liệu trang sứ mệnh
        dispatch(getMissionPageDataRequest())
    }, [])


    const handleUploadSketch = (data: any) => {
        dispatch(saveMissionPageDataRequest(data));
        console.log(data)
    };
    return (
        <div className='block-list'>
            <div className="title">Cấu hình giao diện trang sứ mệnh</div>
            {
                missionPageData.length > 0 && 
                missionPageData.map(item => (
                    <Form className="block-ui" initialValues={item} layout="vertical" onFinish={handleUploadSketch}>
                        <div className="sketch-content-area">
                            <div className="content-area">
                                <div className="sketch-content">
                                    <h1 className="title">Khối {item.index}</h1>
                                    <Form.Item
                                        name="id"
                                        initialValue={item.id}
                                    >
                                    </Form.Item>
                                    <Form.Item
                                        name="index"
                                        initialValue={item.index}
                                    >
                                    </Form.Item>
                                    <Form.Item
                                        name="title"
                                        label={<span>Tiêu đề <strong>*</strong></span>}
                                        initialValue={item.title}
                                    >
                                        <Input
                                            className="search-input"
                                            placeholder="Nhập tiêu đề"
                                            defaultValue={item.title}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="text"
                                        label={<span>Nội dung chi tiết <strong>*</strong></span>}
                                    >

                                            <TextArea
                                                rows={4}
                                                placeholder="Nhập nội dung"

                                            />
                                    </Form.Item>
                                    <Form.Item
                                        name="buttonName"
                                        label={<span>Tên nút bấm <strong>*</strong></span>}
                                    >
                                        <Input
                                            className="search-input"
                                            placeholder="Nhập tên nút bấm"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="buttonLink"
                                        label={<span>Đường dẫn của nút bấm <strong>*</strong></span>}
                                    >
                                        <Input
                                            className="search-input"
                                            placeholder="Nhập đường dẫn của nút bấm"
                                        />
                                    </Form.Item>
                                    <div style={{display:'flex'}}>
                                        <div>Danh sách ảnh cũ:</div>
                                        <div>
                                            {item.images.map((itemImage: any) => (
                                                <div>
                                                    <img style={{maxWidth: '160px'}} src={ itemImage} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Form.Item
                                        className="thumbnail"
                                        name='images'
                                        label='Danh sách ảnh mới'
                                    >
                                        <Upload
                                            showUploadList={true}
                                            listType='picture'
                                            beforeUpload={(file) => {
                                                const cloneNewFiles = newFiles;
                                                cloneNewFiles.push(file);
                                                setNewFiles(cloneNewFiles)
                                                return false;
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </div>
                                <div className="btn-submit-upload">
                                    <Button
                                        htmlType='submit'
                                    >
                                        Lưu cấu hình
                                    </Button> 
                                </div>
                            </div>
                        </div>
                    </Form>
                ))
            }
        </div>
    )
}

export default MissionPage