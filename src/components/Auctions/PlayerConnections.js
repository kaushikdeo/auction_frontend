import React, { useEffect, useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { useAuthContext } from "../../hooks/useAuthContext";

const basrURL = "http://localhost:3000/";

const PlayerConnections = () => {
	const [userConnections, setUserConnections] = useState([]);
	const { user, dispatch } = useAuthContext();
	console.log("USEFFROM AUTH", user);

	useEffect(() => {
		if (user?.user?.connections) {
			console.log(user.user.connections)
			setUserConnections(user.user.connections);
		}
	}, [user])

  const handleMenuClick = (e) => {
    console.log("menuclick", e);
  };
	//TODO: reduce the connections array to display unique connection buckets
	let uniqueBuckets = userConnections.reduce((acc, ele) => {
		if (acc.find(e => e === ele.connectionBucket)) {
			acc.push(ele.connectionBucket);
		}
	}, [])
	console.log("ajxnjsn", uniqueBuckets);
  const items = userConnections && userConnections.length ? userConnections.map(uc => {
		return {
      label: "Generic",
      key: "1",
      icon: <UserOutlined />,
    }
	}) : [];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleButtonClick = (e) => {
    console.log("button click", e);
  };

  return (
    <div className="connectionsContainer">
      <div className="title">
        <h2>New Auction Form</h2>
      </div>
      <Space wrap>
        <Dropdown menu={menuProps}>
          <Button
            trigger={["click", "hover"]}
            menu={menuProps}
            placement="bottom"
            icon={<UserOutlined />}
            onClick={handleButtonClick}
          >
            <Space>
              Select Connection Bucket
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </div>
  );
};

export default PlayerConnections;
