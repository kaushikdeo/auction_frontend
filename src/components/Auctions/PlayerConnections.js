import React, { useEffect, useState } from "react";
import { DeleteOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Select, message, Space, Tooltip } from "antd";
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
import LoadingPage from "../UtilityComponents/LoadingPage";

const PlayerConnections = () => {
  const [filteredConnection, setFilteredConnection] = useState([]);
  const [userConnections, setUserConnections] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");
  const [menuProps, setMenuProps] = useState()
  const [allBuckets, setAllBuckets] = useState("")

  const { user, dispatch } = useAuthContext();

  useEffect(() => {
    console.log("ggggg", user?.user?.connections, user?.user?.connections && Array.isArray(user?.user?.connections))
    if (user?.user?.connections && Array.isArray(user?.user?.connections)) {

      let currentUserConnections = user?.user?.connections;
      //TODO: reduce the connections array to display unique connection buckets
      let allBuckets = [];
      currentUserConnections.map((entry, index) => {
        console.log("TAPAT", entry)
        allBuckets.push(entry.connectionBucket);
      });
      const uniqueBuckets = [...new Set(allBuckets.flat())];

      const menuProps = uniqueBuckets.map ((bucketName) => {
        return { value: bucketName, label: bucketName }
      })
      menuProps.push({ value: "ALL", label: "ALL" })
      setMenuProps(menuProps)
      setUserConnections(user.user.connections);
    }
  }, [user]);

  const handleMenuClick = (e) => {
    console.log("menuclick", e);
    setCurrentSelection(e);
  };

  console.log("MENUPROPS", menuProps)

if (user?.user?.connections) {
  return (
    <div className="connectionsContainer">
      <div className="headerStylesConnections">
        <div className="title">
          <h2>Your Connections</h2>
        </div>
        <div className="connectionDropdpwnStyles">
        <Select
        placeholder="Select Bucket Name"
          defaultValue={"ALL"}
          style={{ width: 120 }}
          onChange={handleMenuClick}
          options={menuProps}
        />
        </div>
      </div>
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
            {userConnections.filter(e => {
              if (currentSelection === "" || currentSelection === "ALL") {
                return e
              } else {
                console.log("ETETETETYE", e.connectionBucket);
                return e.connectionBucket.some((buck => buck === currentSelection))
              }
            }).map((row) => (
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
} else {
  <LoadingPage />
}
};

export default PlayerConnections;
