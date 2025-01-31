import React, { useEffect, useState } from "react";
import './newAuction.scss'
import { 
  Layout, 
  Form, 
  Input, 
  Space, 
  Table, 
  Tag, 
  Select,
  Button, 
  Steps,
  Tooltip,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Switch
 } from "antd";
 import Dropzone from 'react-dropzone'
import { InfoCircleOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, TeamOutlined, BarsOutlined, DownOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_NEW_AUCTION } from "../../graphql/mutations/auctionMutations";
import { GET_LOGGED_IN_USER } from "../../graphql/queries/userQueries";
import AddConnections from "../User/AddConnections";
import AddPlayers from "./AddPlayers";
import UserProfileUploadWidget from "../UtilityComponents/UserProfileUploadWidget";
import { useAuthContext } from "../../hooks/useAuthContext";

const { Content } = Layout;

const NewAuction = () => {
  const { user, dispatch } = useAuthContext();

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
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      key: "profileImage",
      render: (theImageURL, record) => {
        if (theImageURL) {
          return <img style={{alignSelf: "center"}} alt={theImageURL} src={theImageURL} width={50} height={50} />
        } else {
          return <UserProfileUploadWidget inputUser = {record} width={50} height={50}/>
        }
    },
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
  const [menuProps, setMenuProps] = useState([])
  const [currentSelection, setCurrentSelection] = useState("");
  const [bucketWalletBalance, setBucketWalletBalance] = useState(null);
  const [walletBalanceDifference, setWalletBalanceDifference] = useState(null);
  const [sportsName, setSportsName] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [venueName, setVenueName] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [stepPrice, setStepPrice] = useState(0);
  const [shouldShowStats, setShouldShowStats] = useState(true)
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

  console.log("selectedUsersselectedUsers", selectedUsers);

  const handleMenuClick = (e) => {
    console.log("menuclick", e);
    setCurrentSelection(e);
  };

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
    console.log("ADDALLLOGIC", rec, initialPlayerBucket, initialSelectedUsers)
    initialPlayerBucket.push(rec);
    setPlayerBucket(initialPlayerBucket);
    let ans = initialSelectedUsers.filter(us => us.userId !== rec.userId);
    setSelectedUsers(ans)
  }

  const addAllToBucket = () => {
    let initialPlayerBucket = [...playerBucket];
    let initialSelectedUsers = [...selectedUsers];
    if (initialSelectedUsers?.length !== 0) {
      setPlayerBucket(initialSelectedUsers);
      setSelectedUsers([])
    }
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
    console.log("playerBucketplayerBucketplayerBucketplayerBucket", values)
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
        showPlayerStats: shouldShowStats,
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
    console.log("Hello", selectedUsers, playerBucket)
    if (currentStep === 0) {
      return (
        <div className="auctionDetailsContainer">
          <div className="title">
            <h2>New Auction Form</h2>
            <span className="sliderTextAfter">Show Player Stats</span>
            <Switch
                        checked={shouldShowStats}
                        onChange={(checked, event) => setShouldShowStats(!shouldShowStats)}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked
                    />
          </div>
          <div className="inputContainerStyles">
          <div className="innerTitle"><h4>Basic Auction Details</h4></div>
          <div className="inputLineStyles">
            <Input
              className="inputStyles"
              placeholder="Auction Name"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setAuctionName(e.target.value)}
              value={auctionName}
              suffix={
                <Tooltip title="Enter the Auction Name">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Input
              placeholder="Venue"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setVenueName(e.target.value)}
              value={venueName}
              suffix={
                <Tooltip title="Enter the Venue">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
          </div>
          <div className="inputLineStyles">
            <Input
              className="inputStyles"
              placeholder="Sport Name"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setSportsName(e.target.value)}
              value={sportsName}
              suffix={
                <Tooltip title="Enter the Sport Name">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Input
              placeholder="Buckets"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setBuckets(e.target.value)}
              value={buckets}
              suffix={
                <Tooltip title="Enter the Bucket Names seperated by commas">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
          </div>
          </div>
          <div className="inputContainerStyles">
          <div className="innerTitle"><h4>Auction Calculation Details</h4></div>
          <div className="inputLineStyles">
            <Input
              className="inputStyles"
              type="number"
              placeholder="Initial Wallet Balance"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              allowClear
              onChange={(e) => setBucketWalletBalance(e.target.value)}
              value={bucketWalletBalance}
              suffix={
                <Tooltip title="Enter Initial Wallet Balance">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Input
              type="number"
              placeholder="Wallet Balance Difference"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setWalletBalanceDifference(e.target.value)}
              value={walletBalanceDifference}
              allowClear
              suffix={
                <Tooltip title="Enter Wallet Balance Difference">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
          </div>
          <div className="inputLineStyles">
            <Input
            type="number"
              className="inputStyles"
              placeholder="Minimum Bid"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => setMinimumBid(e.target.value)}
              value={minimumBid}
              suffix={
                <Tooltip title="Enter Minimum Bid">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
            <Input
              type="number"
              placeholder="Bid Raise By"
              onChange={(e) => setStepPrice(e.target.value)}
              value={stepPrice}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={
                <Tooltip title="Enter Bid Raise By">
                  <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
            />
            <br />
            <br />
          </div>
          </div>
          <div className="inputContainerStyles">
          <div className="innerTitle"><h4>Auction Duration Details</h4></div>
          <div className="inputLineStyles">
            <DatePicker className="datetimeInputStyles" placeholder="Start Date and Time" showTime onChange={onChangeStart} onOk={onOkStart} />
            <br />
            <br />
            <DatePicker className="datetimeInputStyles" placeholder="End Date and Time" showTime onChange={onChangeStart} onOk={onOkStart} />
            <br />
            <br />
          </div>
          </div>
          <div className="button">
            <input type="button" value='Next' onClick={() => setCurrentStep(1)}/>
          </div>
        </div>
      )
    } else if (currentStep === 1) {
      return (
        <div className="formContainer">
          <div className="title">Team Details</div>
          <form action="#">
            <div className="user-details">
              <div className="input-box newInputs">
                <span className="details">Team Name</span>
                <input onChange={(e) => setTeamName(e.target.value)} value={teamName} type="text" placeholder="Enter Team Name" required />
              </div>
              <div className="input-box newInputs">
                <span className="details">Team Captain</span>
                {/* <input type="text" placeholder="Enter Team Captain" required /> */}
                <AddPlayers searchInput={searchInput} setSearchInput={setSearchInput} addTeamCaptain={addTeamCaptain} />
              </div>
              {/* <div className="input-box newInputs">
                <span className="details">Team Vice Captain</span>
                <input type="text" placeholder="Enter Vice Team Captain" required />
              </div>
              <div className="input-box newInputs">
                <span className="details">Retained Players</span>
                <input type="text" placeholder="Retained Players" required />
              </div> */}
              <div className="input-box newInputs">
                <span className="details">Team Description</span>
                <input onChange={(e) => setTeamDescription(e.target.value)} value={teamDescription} type="text" placeholder="Enter Description" required />
              </div>
              {/* <div className="input-box newInputs">
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
          <Button type="primary" onClick={() => refetchConnections() }>Refetch Connections</Button>
          <Button type="primary" onClick={addAllToBucket}>Add All Players To Auctions</Button>
          <Select
            placeholder="Select Bucket Name"
            defaultValue={"ALL"}
            style={{ width: 120 }}
            onChange={handleMenuClick}
            options={menuProps}
          />
          {loggedInUser &&
          loggedInUser.connections &&
          loggedInUser.connections.length && (
            <div className="new-auction-table-container">
              <div className="tableTitle">{`Connections (${loggedInUser.connections.length})`}</div>
              <div>
                <Table columns={tableColumnsInit} dataSource={selectedUsers.filter(su => !playerBucket.some(pb => su.userId === pb.userId))} currentSelection={currentSelection}/>
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
  console.log("Hello", shouldShowStats)

  useEffect(() => {
    if (
      loggedInUserData &&
      loggedInUserData.getMe &&
      loggedInUserData.getMe.userId &&
      !loggedInUserLoading &&
      !loggedInUserError
    ) {
      let initialUsers = [];
      if (currentSelection === "" || currentSelection === "ALL") {
        loggedInUserData.getMe.connections.map((conn, i) => {
          console.log("PHODNI", conn)
          initialUsers.push({
            key: i + 1,
            userId: conn?.user?.userId,
            name: `${conn?.user?.firstName} ${conn?.user?.lastName}`,
            email: `${conn?.user?.email}`,
            tags: conn?.user?.role,
            profileImage: conn?.user?.imageUrl
          });
        })
      } else {
        let filteredUsers = loggedInUserData.getMe.connections.filter(e => {
          if (currentSelection === "") {
            return e
          } else {
            console.log("ETETETETYE", e.connectionBucket);
            return e.connectionBucket.some((buck => buck === currentSelection))
          }
        })
        filteredUsers.map((conn, i) => {
          console.log("PHODNI", conn)
          initialUsers.push({
            key: i + 1,
            userId: conn?.user?.userId,
            name: `${conn?.user?.firstName} ${conn?.user?.lastName}`,
            email: `${conn?.user?.email}`,
            tags: conn?.user?.role,
            profileImage: conn?.user?.imageUrl
          });
        })
      }

      let allBuckets = [];
      loggedInUserData.getMe.connections.map((entry, index) => {
        allBuckets.push(entry.connectionBucket);
      });
      const uniqueBuckets = [...new Set(allBuckets.flat())];
      const menuProps = uniqueBuckets.map ((bucketName) => {
        return { value: bucketName, label: bucketName }
      })
      menuProps.push({ value: "ALL", label: "ALL" })
      console.log("TAPAT", initialUsers, selectedUsers)
      setMenuProps(menuProps)
      setSelectedUsers(initialUsers);
      setLoggedInUser(loggedInUserData.getMe);
    }
  }, [loggedInUserData, loggedInUserLoading, loggedInUserError, currentSelection]);
  console.log("loggedInUserloggedInUser", loggedInUser);
  return (
    <div className="newAuctionContainer">
      <div className="innterAuctionContainer">
        <Steps
          current={currentStep}
          className="stepsStyles"
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
    </div>
  )
};

export default NewAuction;
