import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd"
import { useHideMenu } from "../hooks/useHideMenu";
import { useEffect, useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { replace, useNavigate } from "react-router-dom";

export const Escritorio = () => {

  const [ usuario ] = useState( getUsuarioStorage() );
const navigate = useNavigate();

  useHideMenu(false);

  const { Title, Text } = Typography;

  const salir = () =>{
    localStorage.clear();
    navigate('/ingresar', {replace:true})
  }

  const siguienteTicket = () =>{

  }

  useEffect(() => {
    if(!usuario.agente || !usuario.escritorio){
      navigate('/ingresar')
    }
  }, [usuario])

  return (
    <>
    <Row>
      <Col span={20}>
        <Title level={2}>{ usuario.agente }</Title>
        <Text>Usted está trabajando en el escritorio: </Text>
        <Text type="success">{ usuario.escritorio }</Text>
      </Col>

      <Col span={4} align="right">
        <Button shape="round" danger type="primary" onClick={ salir }>
          <CloseCircleOutlined />
          Salir
        </Button>
      </Col>
    </Row>

    <Divider />

    <Row>
      <Col>
        <Text>Está atendiendo el ticket número: </Text>
        <Text style={{fontSize: 30}} type="danger">55</Text>
      </Col>
    </Row>

    <Row>
      <Col offset={18} span={6} align="right">
        <Button onClick={siguienteTicket} shape="round" type="primary">
          <RightOutlined />
          Siguiente
        </Button>
      </Col>
    </Row>
    </>
  )
}
