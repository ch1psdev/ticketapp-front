import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getUltimos } from "../helpers/getUltimos";

const { Title, Text } = Typography;

export const Cola = () => {

  useHideMenu(true);

  const { socket } = useContext( SocketContext );
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    
    socket.on('ticket-asignado', ( asignados ) => {
      console.log(asignados)
      setTickets(asignados);
    })
  
    return () => {
      socket.off('ticket-asignado')
    }
  }, [socket])

  useEffect(() => {
     getUltimos().then( setTickets )
  }, [])
  
  

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>

      <Row>

        <Col span={12}>
          <List
            dataSource={ tickets.slice(0,3)}
            renderItem={ item=> (
              <List.Item>
                <Card 
                  style={{width:300, marginTop: 16}}
                  actions={[
                    <Tag color="volcano"> { item.agente }</Tag>,
                    <Tag color="magenta">Escritorio: { item.escritorio }</Tag>
                  ]}
                >
                  <Title>No. { item.numero} </Title>
                </Card>  
              </List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Divider> Historial </Divider>
          <List
            dataSource={ tickets.slice(3)}
            renderItem={ item => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${ item.numero }`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio: </Text>
                      <Tag color="magenta">{ item.escritorio }</Tag>
                      <Text type="secondary">Agente: </Text>
                      <Tag color="volcano">{ item.agente }</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />

        </Col>

      </Row>
     </>
  )
}

export default Cola;