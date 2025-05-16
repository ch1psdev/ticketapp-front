import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import { Escritorio } from './Escritorio';
import { Cola } from './Cola';
import { Ingresar } from './Ingresar';
import { CrearTicket } from './CrearTicket';
import { useContext } from 'react';
import { UiContext } from '../context/UiContext';

const { Sider, Content } = Layout;


export const RouterPage = () => {

    const { ocultarMenu } = useContext(UiContext);

    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
        <Layout style={{ height: '100vh'}}>
        <Sider collapsedWidth={0} breakpoint='md' hidden={ocultarMenu}>
            <div className="demo-logo-vertical" />
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
                {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/ingresar">Ingresar</Link>,
                },
                {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <Link to="/cola">Cola de tickets</Link>,
                },
                {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to="/crear">Crear tickets</Link>,
                },
            ]}
            />
        </Sider>
        <Layout>
        
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
            >
            <Routes>
                <Route path="/ingresar" element={ <Ingresar /> } />
                <Route path="/cola" element={ <Cola /> } />
                <Route path="/crear" element={ <CrearTicket /> } />
                <Route path="/escritorio" element={ <Escritorio /> } />
                <Route path='/*' element={<Navigate to="/ingresar" />} />
            </Routes>
            </Content>
        </Layout>
        </Layout>
  )
}
