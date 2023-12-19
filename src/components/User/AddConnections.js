import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import { FaSearch } from "react-icons/fa";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS_BY_EMAIL } from "../../graphql/queries/userQueries";
import { useMutation} from '@apollo/client';
import { ADD_CONNECTIONS } from "../../graphql/mutations/userMutations";

const AddConnections = () => {
const tableColumns = [
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
            <a onClick={() => removeRecord(record)}>Delete</a>
        </Space>
        ),
    },
];
  const [searchUsers, { loading, error, data }] = useLazyQuery(
    SEARCH_USERS_BY_EMAIL
  );
  const [addNewConnections, { data: addConnData, loading: addConnLoading, error: addConnError }] = useMutation(ADD_CONNECTIONS);
  const [searchInput, setSearchInput] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const removeRecord = (rec) => {
    console.log("REC", rec);
    let currUsers = [...selectedUsers];
    let restUsers = currUsers.filter(u => u.userId !== rec.userId);
    console.log(restUsers);
    setSelectedUsers(restUsers);
  }

  useEffect(() => {
    console.log("addConnData", addConnData, addConnLoading, addConnError);
    if (addConnData && addConnData.addConnections && !addConnLoading && !addConnError) {
        setSearchInput("");
        setFetchedUsers([]);
        setSelectedUsers([]);
        console.log("addConnData", addConnData);
    }
  }, [addConnData, addConnLoading, addConnLoading, addConnError])

  useEffect(() => {
    if (searchInput.length > 5) {
      console.log("Am i being called");
      searchUsers({ variables: { email: searchInput } }).then((res) => {
        if (
          res &&
          res.data &&
          res.data.searchUsers &&
          res.data.searchUsers.length
        ) {
          let filteredUsers = res.data.searchUsers.filter(
            (obj) => !selectedUsers.some(({ email }) => obj.email === email)
          );
          setFetchedUsers(filteredUsers);
        }
      });
    }
  }, [searchInput]);

  const addToTable = (user) => {
    let initialUsers = [...selectedUsers];
    initialUsers.push({
      key: initialUsers.length + 1,
      userId: user.userId,
      name: `${user.firstName} ${user.lastName}`,
      email: `${user.email}`,
      tags: user.role,
    });
    console.log("initialUsers", initialUsers);
    setSelectedUsers(initialUsers);
    setSearchInput("");
    setFetchedUsers([]);
  };

  const handleAddConnections = () => {
    let connectionIds = selectedUsers.map((cuid) => {
        return cuid.userId;
    })
    console.log("connectionIdsconnectionIds", connectionIds);
    addNewConnections({ variables:{userIds: connectionIds}});
  }

  console.log("fetchedusers", fetchedUsers);
  return (
    <div>
      <div className="search-bar-container">
        <div className="input-wrapper">
          <FaSearch id="search-icon" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
            placeholder="Type to search ... "
          />
        </div>
        <div className="search-results-list">
          {fetchedUsers.map((us) => {
            return (
              <div className="search-result"
                onClick={() => addToTable(us)}
                key={us.userId}
              >{`${us.firstName} ${us.lastName} --- ${us.email}`}</div>
            );
          })}
        </div>
      </div>
      {selectedUsers && selectedUsers.length && (
        <div>
          <Table columns={tableColumns} dataSource={selectedUsers} />
          <Button onClick={handleAddConnections} disabled={selectedUsers.length ? false : true} block>
            Add Connections
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddConnections;
