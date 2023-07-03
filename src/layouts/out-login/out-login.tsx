import React, { useEffect } from 'react'
import MainBackground from '../../assets/out-login/background.jpg'
import { Button, Checkbox, Form, Input } from 'antd';

import './out-login.styles.scss'
import { ILoginRequest } from '../../common/login.interface';
import { useNavigate } from "react-router-dom";
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { loginRequest } from '../../redux/controller';

const OutLoginLayout = () => {

	const navigate = useNavigate();
	const dispatch = useDispatchRoot();

	const {
        tokenLogin
    } = useSelectorRoot((state) => state.login);


    useEffect(()=>{
        if(tokenLogin){
            navigate('/management')
        }
    },[tokenLogin])

	const onFinish = (bodyRequest: ILoginRequest) => {
		dispatch(loginRequest(bodyRequest))
		// navigate('/management')
	}

	return (
		<div className='main'>
			<div className='content-area'>
				<div className='container'>

					<div className='title'>Login</div>
					<Form
						className='form'
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						initialValues={{ remember: true }}
						onFinish={onFinish}
						// onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Please input your email!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 16 }}>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<Form.Item wrapperCol={{ span: 16 }}>
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default OutLoginLayout