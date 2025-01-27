import React, { useEffect, useState } from "react";
import { DeleteOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { useAuthContext } from "../../hooks/useAuthContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import "./playerConnections.scss";

const PlayerConnections = () => {
  const [filteredConnection, setFilteredConnection] = useState([]);
  const [userConnections, setUserConnections] = useState([]);
  const { user, dispatch } = useAuthContext();
  console.log("USEFFROM AUTH", user);

  useEffect(() => {
    if (user?.user?.connections) {
      console.log(user.user.connections);
      setUserConnections(user.user.connections);
    }
  }, [user]);

  const handleMenuClick = (e) => {
    console.log("menuclick", e);
  };
  //TODO: reduce the connections array to display unique connection buckets
  console.log("userConnectionsuserConnections", userConnections);
  let allBuckets=[];
  userConnections.map((entry, index) => {
      allBuckets.push(entry.connectionBucket)
    }
  );
  const uniqueBuckets = [...new Set(allBuckets.flat())];
  console.log("ajxnjsn", uniqueBuckets);
  const items =
    uniqueBuckets && uniqueBuckets.length
      ? uniqueBuckets.map((uc) => {
          return {
            label: uc,
            key: "1",
            icon: <UserOutlined />,
          };
        })
      : [];
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
        <h2>Your Connections</h2>
      </div>
      <Dropdown menu={menuProps}>
        <Button
          trigger={["click", "hover"]}
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
          onClick={handleButtonClick}
        >
          <Space>
            {uniqueBuckets && uniqueBuckets.length ? uniqueBuckets[0] : "Select Connection Bucket"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h6>
                  <b>Player Icon</b>
                </h6>
              </TableCell>
              <TableCell align="left">
                <h6>
                  <b>Player Name</b>
                </h6>
              </TableCell>
              <TableCell align="left">
                <h6>
                  <b>Email</b>
                </h6>
              </TableCell>
              <TableCell align="left">
                <h6>
                  <b>Connection Bucket</b>
                </h6>
              </TableCell>
              <TableCell align="left">
                <h6>
                  <b>Actions</b>
                </h6>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userConnections.map((row) => (
              <TableRow
                key={row.user.userId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.user?.imageUrl ? (
                    <img
                      src={row?.user?.imageUrl}
                      class="profile-image--cover"
                    ></img>
                  ) : (
                    <Avatar
                      sx={{ bgcolor: "rebeccapurple" }}
                    >{`${row.user.firstName[0]} ${row.user.lastName[0]}`}</Avatar>
                  )}
                </TableCell>
                <TableCell className="tableCellStyle" align="left">
                  <b>
                    {row.user.firstName} {row.user.lastName}
                  </b>
                </TableCell>
                <TableCell className="tableCellStyle" align="left">
                  {row.user.email}
                </TableCell>
                <TableCell className="tableCellStyle" align="left">
                  {row.connectionBucket}
                </TableCell>
                <TableCell className="tableCellStyle" align="left">
                  <>
                    <DeleteOutlined />
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayerConnections;
