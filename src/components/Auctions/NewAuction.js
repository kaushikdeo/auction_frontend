import React, { useEffect, useState } from "react";
import './newAuction.scss'
import { 
  Layout, 
  Form, 
  Input, 
  Space, 
  Table, 
  Tag, 
  Button, 
  Steps,
  DatePicker,
  DatePickerProps,
  Dropdown 
 } from "antd";
 import Dropzone from 'react-dropzone'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, TeamOutlined, BarsOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_NEW_AUCTION } from "../../graphql/mutations/auctionMutations";
import { GET_LOGGED_IN_USER } from "../../graphql/queries/userQueries";
import AddConnections from "../User/AddConnections";
import AddPlayers from "./AddPlayers";

const { Content } = Layout;

const NewAuction = () => {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  const teamsTableColumnsInit = [
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Team Captain",
      dataIndex: "teamCaptain",
      key: "teamCaptain",
    },
    {
      title: "Team Description",
      dataIndex: "teamDescription",
      key: "teamDescription",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
  ];
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
      title: "Select Bucket",
      key: "selectBucket",
      dataIndex: "selectBucket",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
                <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                  <Button>bottom</Button>
                </Dropdown>
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
    refetch
  } = useQuery(GET_LOGGED_IN_USER);
  const [auctionName, setAuctionName] = useState("");
  const [bucketWalletBalance, setBucketWalletBalance] = useState(null);
  const [walletBalanceDifference, setWalletBalanceDifference] = useState(null);
  const [sportsName, setSportsName] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [venueName, setVenueName] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);

  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamCaptain, setTeamCaptain] = useState({
    firstName: "",
    lastName: "",
    userId: ""
  })
  const [teamViceCaptain, setViceTeamCaptain] = useState({
    firstName: "",
    lastName: "",
    userId: ""
  })
  const [teamDescription, setTeamDescription] = useState("");

  const [currentStep, setCurrentStep] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [playerBucket, setPlayerBucket] = useState([]);
  const [buckets, setBuckets] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  console.log("selectedUsersselectedUsers", playerBucket);

  const onChangeStart = (value,dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setStartDateTime(dateString)
  };

  const onChangeEnd = (value,dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setEndDateTime(dateString)
  };

  const onStepChange = (value) => {
    console.log('onChange:', value);
    setCurrentStep(value);
  };

  const refetchConnections = () => {
    refetch();
  }


  const addNewTeam = () => {
    let initTeams = [...teams];
    console.log(teamName, teamCaptain, teamViceCaptain, teamDescription);
    let newTeam = {
      teamName,
      teamCaptain: `${teamCaptain.firstName} ${teamCaptain.lastName}`,
      teamCaptainUserId: teamCaptain.userId,
      // teamViceCaptain,
      teamDescription
    }
    initTeams.push(newTeam);
    setTeamName("")
    setTeamCaptain("")
    setTeams(initTeams);
    setTeamDescription("");
    setSearchInput("");
  }
   
  const onOkStart = (value) => {
    console.log('onOk: ', value);
  };

  const onOkEnd = (value) => {
    console.log('onOk: ', value);
  };

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
    let formattedTeams = teams.map(t => {
      return {
        teamName: t.teamName,
        teamCaptain: t.teamCaptainUserId,
        teamViceCaptain: "",
        teamDescription: t.teamDescription,
        teamLogo: "",
      }
    })
    let formattedPlayers = playerBucket.map(player => player.userId)
    console.log("playerBucketplayerBucketplayerBucketplayerBucket", playerBucket)
    let newAuction = {
        auctionName,
        startTime: startDateTime,
        endTime: endDateTime,
        sportName: sportsName,
        bucketWalletBalance: Number(bucketWalletBalance),
        walletBalDifference: Number(walletBalanceDifference),
        stepPrice: Number(stepPrice),
        venue: venueName,
        players: formattedPlayers,
        teams: formattedTeams,
        numberOfBuckets: Number(buckets) || 0,
        minimumBid: Number(minimumBid),
    }
    console.log("Received values:", newAuction);
    let addedAuction = await addNewAuction({
      variables: {
        newAuctionInput: {
          ...newAuction,
          endTime: new Date(newAuction.endTime).toISOString(),
          startTime: new Date(newAuction.startTime).toISOString(),
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

  const addTeamCaptain = (addedCaptain) => {
    console.log("ADDED CAPTAIN", addedCaptain);
    let newCap = {
      firstName: addedCaptain.name.split(" ")[0],
      lastName: addedCaptain.name.split(" ")[1],
      userId: addedCaptain.userId
    }
    setTeamCaptain(newCap);
  }

  const renderStepsForms = () => {
    console.log("Hello", currentStep)
    if (currentStep === 0) {
      return (
        <div className="formContainer">
          <div className="title">Basic Auction Details</div>
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Auction Name</span>
                <input value={auctionName} onChange={(e) => setAuctionName(e.target.value)} type="text" placeholder="Enter Auction Name" required />
              </div>
              <div className="input-box">
                <span className="details">Initial Wallet Balance</span>
                <input value={bucketWalletBalance} onChange={(e) => setBucketWalletBalance(e.target.value)} type="number" placeholder="Enter Initial Wallet Balance" required />
              </div>
              <div className="input-box">
                <span className="details">Wallet Balance Difference</span>
                <input value={walletBalanceDifference} onChange={(e) => setWalletBalanceDifference(e.target.value)} type="number" placeholder="Enter Wallet Balance Difference" required />
              </div>
              <div className="input-box">
                <span className="details">Minimum Bid</span>
                <input value={minimumBid} onChange={(e) => setMinimumBid(e.target.value)} type="number" placeholder="Enter Minimum Bid" required />
              </div>
              <div className="input-box">
                <span className="details">Bid Raise By</span>
                <input value={stepPrice} onChange={(e) => setStepPrice(e.target.value)} type="number" placeholder="Enter Minimum Bid" required />
              </div>
              <div className="input-box">
                <span className="details">Sport Name</span>
                <input value={sportsName} onChange={(e) => setSportsName(e.target.value)} type="text" placeholder="Enter Sports Name" required />
              </div>
              <div className="input-box">
                <span className="details">Number of Teams</span>
                <input value={numberOfTeams} onChange={(e) => setNumberOfTeams(e.target.value)} type="number" placeholder="Enter Number of Teams" required />
              </div>
              <div className="input-box">
                <span className="details">Buckets</span>
                <input value={buckets} onChange={(e) => setBuckets(e.target.value)} type="text" placeholder="Enter comma seperated bucket names" required />
              </div>
              <div className="input-box">
                <span className="details">Start Date & Time</span>
                <DatePicker showTime onChange={onChangeStart} onOk={onOkStart} />
              </div>
              <div className="input-box">
                <span className="details">End Date & Time</span>
                <DatePicker showTime onChange={onChangeEnd} onOk={onOkEnd} />
              </div>
              <div className="input-box">
                <span className="details">Venue</span>
                <input value={venueName} onChange={(e) => setVenueName(e.target.value)} type="text" placeholder="Enter Venue" required />
              </div>
              <div className="button">
                <input type="button" value='Next' onClick={() => setCurrentStep(1)}/>
              </div>
            </div>
          </form>
        </div>
      )
    } else if (currentStep === 1) {
      return (
        <div className="formContainer">
          <div className="title">Team Details</div>
          <form action="#">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Team Name</span>
                <input onChange={(e) => setTeamName(e.target.value)} value={teamName} type="text" placeholder="Enter Team Name" required />
              </div>
              <div className="input-box">
                <span className="details">Team Captain</span>
                {/* <input type="text" placeholder="Enter Team Captain" required /> */}
                <AddPlayers searchInput={searchInput} setSearchInput={setSearchInput} addTeamCaptain={addTeamCaptain} />
              </div>
              {/* <div className="input-box">
                <span className="details">Team Vice Captain</span>
                <input type="text" placeholder="Enter Vice Team Captain" required />
              </div>
              <div className="input-box">
                <span className="details">Retained Players</span>
                <input type="text" placeholder="Retained Players" required />
              </div> */}
              <div className="input-box">
                <span className="details">Team Description</span>
                <input onChange={(e) => setTeamDescription(e.target.value)} value={teamDescription} type="text" placeholder="Enter Description" required />
              </div>
              {/* <div className="input-box">
                <span className="details">Team Logo</span>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className="dropzoneSection">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="dropZonepText">+ Select Logo</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              </div> */}
              <div className="button">
                <input type="button" value='Add Team' onClick={() => addNewTeam() } />
              </div>
              <div className="tableTitle">{`Teams Added (${teams.length})`}</div>
              <Table columns={teamsTableColumnsInit} dataSource={teams} />
              <div className="button">
              <input type="button" value='Next' onClick={() => setCurrentStep(2)}/>
              </div>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className="formContainer">
          <div className="title">Players Bucket</div>
          <input type="button" value='Refetch Connections' onClick={() => refetchConnections() } />
          {loggedInUser &&
          loggedInUser.connections &&
          loggedInUser.connections.length && (
            <div className="new-auction-table-container">
              <div className="tableTitle">{`Connections (${loggedInUser.connections.length})`}</div>
              <div>
                <Table columns={tableColumnsInit} dataSource={selectedUsers} />
              </div>
              <div className="tableTitle">{`Tournament Players (${playerBucket.length})`}</div>
              <div>
                <Table columns={tableColumnsAuc} dataSource={playerBucket} />
              </div>
            </div>
          )}
          <div className="button">
            <input type="button" value='Create Auction' onClick={() => handleCreateNewAuction()}/>
          </div>
        </div>
      )
    }
  }
  console.log("Hello", teams)
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
    <div className="container">
      <Steps
      onChange={onStepChange}
      items={[
        {
          title: 'Basic Details',
          status: currentStep > 0 ? 'finish' : 'progress',
          icon: <SolutionOutlined />,
        },
        {
          title: 'Teams',
          status: currentStep > 1 ? 'finish' : 'progress',
          icon: <BarsOutlined />,
        },
        {
          title: 'Players',
          status: currentStep > 2 ? 'finish' : 'progress',
          icon: <TeamOutlined />,
        },
      ]}
      />
      {renderStepsForms()}
    </div>
  )
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
