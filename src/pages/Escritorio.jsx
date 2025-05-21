import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd"
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { replace, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

export const Escritorio = () => {

  const [ usuario ] = useState( getUsuarioStorage() );
const navigate = useNavigate();
const [ticket, setTicket] = useState(null)
const {socket} = useContext(SocketContext)
;
  useHideMenu(false);

  const { Title, Text } = Typography;

  const salir = () =>{
    localStorage.clear();
    navigate('/ingresar', {replace:true})
  }

  const siguienteTicket = () =>{
    socket.emit('siguiente-ticket-trabajar', usuario, ( ticket ) => {
      setTicket( ticket )
    })
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

    {
      ticket &&
      <Row>
        <Col>
          <Text>Está atendiendo el ticket número: </Text>
          <Text style={{fontSize: 30}} type="danger">{ticket.numero}</Text>
        </Col>
      </Row>

    }

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
