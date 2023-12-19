import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Space, Table, Tag, Button } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_NEW_AUCTION } from "../../graphql/mutations/auctionMutations";
import { GET_LOGGED_IN_USER } from "../../graphql/queries/userQueries";

const { Content } = Layout;

const NewAuction = () => {
  const tableColumnsInit = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => addToBucket(record)}>Add</a>
        </Space>
      ),
    },
  ];
  const tableColumnsAuc = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => removeFromBucket(record)}>Remove</a>
        </Space>
      ),
    },
  ];
  const navigate = useNavigate();
  const [addNewAuction, { data, loading, error }] =
    useMutation(ADD_NEW_AUCTION);
  const {
    data: loggedInUserData,
    loading: loggedInUserLoading,
    error: loggedInUserError,
  } = useQuery(GET_LOGGED_IN_USER);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [playerBucket, setPlayerBucket] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const addToBucket = (rec) => {
    let initialPlayerBucket = [...playerBucket];
    let initialSelectedUsers = [...selectedUsers];
    initialPlayerBucket.push(rec);
    setPlayerBucket(initialPlayerBucket);
    let ans = initialSelectedUsers.filter(us => us.userId !== rec.userId);
    setSelectedUsers(ans)
  }

  const removeFromBucket = (rec) => {
    let initialPlayerBucket = [...playerBucket];
    let initialSelectedUsers = [...selectedUsers];
    let ans = initialPlayerBucket.filter(us => us.userId !== rec.userId);
    setPlayerBucket(ans)
    console.log("initialPlayerBucket", initialPlayerBucket);
    initialSelectedUsers.push(rec);
    setSelectedUsers(initialSelectedUsers);
  }

  const handleCreateNewAuction = async (values) => {
    console.log("Received values:", values);
    let addedAuction = await addNewAuction({
      variables: {
        newAuctionInput: {
          ...values,
          endTime: new Date(values.endTime).toISOString(),
          startTime: new Date(values.startTime).toISOString(),
        },
      },
    });
    if (addedAuction && addedAuction.data && addedAuction.data.addNewAuction) {
      console.log("addedAuction", addedAuction.data);
      console.log("DATAuoo", addedAuction.data.addNewAuction);
      navigate("/auctioneerDashboard");
    }
    // Implement your logic to handle form submission
  };

  useEffect(() => {
    if (
      loggedInUserData &&
      loggedInUserData.getMe &&
      loggedInUserData.getMe.userId &&
      !loggedInUserLoading &&
      !loggedInUserError
    ) {
      let initialUsers = [];
      loggedInUserData.getMe.connections.map((conn, i) => {
        initialUsers.push({
          key: i + 1,
          userId: conn.userId,
          name: `${conn.firstName} ${conn.lastName}`,
          email: `${conn.email}`,
          tags: conn.role,
        });
      })
      setSelectedUsers(initialUsers);
      setLoggedInUser(loggedInUserData.getMe);
    }
  }, [loggedInUserData, loggedInUserLoading, loggedInUserError]);
  console.log("loggedInUserloggedInUser", loggedInUser);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
            animation: "slideIn 0.6s ease-in-out forwards",
          }}
        >
          <Form
            name="advanced_form"
            onFinish={handleCreateNewAuction}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              New Auction
            </h2>
            <Form.Item
              label="Auction Name"
              name="auctionName"
              rules={[
                { required: true, message: "Please input the auction name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Bucket Wallet Balance"
              name="bucketWalletBalance"
              rules={[
                {
                  required: true,
                  message: "Please input the bucket wallet balance!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                { required: true, message: "Please input the end time!" },
              ]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item
              label="Sport Name"
              name="sportName"
              rules={[
                { required: true, message: "Please input the sport name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                { required: true, message: "Please input the start time!" },
              ]}
            >
              <Input type="datetime-local" />
            </Form.Item>
            <Form.Item
              label="Venue"
              name="venue"
              rules={[
                {
                  required: true,
                  message: "A value must be entered",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Wallet Balance Difference"
              name="walletBalDifference"
              rules={[
                {
                  required: true,
                  message: "A value must be entered",
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        {loggedInUser &&
          loggedInUser.connections &&
          loggedInUser.connections.length && (
            <div className="new-auction-table-container">
              <div>Connections</div>
              <div>
                <Table columns={tableColumnsInit} dataSource={selectedUsers} />
              </div>
              <div>
                <Table columns={tableColumnsAuc} dataSource={playerBucket} />
              </div>
            </div>
          )}
      </Content>
    </Layout>
  );
};

export default NewAuction;
