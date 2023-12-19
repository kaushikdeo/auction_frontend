import React from "react";
import { Card, Col, Row, Typography } from "antd";

import { useNavigate } from 'react-router-dom';
import Constants from "../../Constants";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddConnections from "./AddConnections";

const { Meta } = Card;

const UserRole = () => {

  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleRoleSelect = (i) => {
    console.log("IIIII", i);
    if (i === 0) {
      dispatch({type: 'UPDATEROLE', payload: Constants.Auctioneer})
      navigate("/");
    } else {
      dispatch({type: 'UPDATEROLE', payload: Constants.Player})
      navigate("/");
    }
  }

  return (
    <div>
        <Typography.Title style={{ margin: 0 }}>
        Select Role
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Card
            onClick={() => handleRoleSelect(0)}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Auctioneer" description="Select this role if you want to conduct auctions" />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            onClick={() => handleRoleSelect(1)}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Player" description="Select this role if you want to login as a player" />
          </Card>
        </Col>
      </Row>
      <AddConnections />
    </div>
  );
};

export default UserRole;
