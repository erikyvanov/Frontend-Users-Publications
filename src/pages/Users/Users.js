import React, { useState, useEffect } from "react";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";

import { ButtonGroup, Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import UsersCard from "../../components/UsersCard";

import { getUsersAPIv2 } from "../../api/follow";
// import queryString from "query-string";

function Users(props) {
  const [params, setParams] = useState({
    type: "new",
    page: 1,
    search: "",
  });

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (params.page === 1) {
      setUsers(null);
    }
    getUsersAPIv2(params.type, params.page, params.search).then((data) => {
      if (data === null) {
        setLoading(null);
      } else {
        if (params.page > 1) {
          setUsers([...users, ...data]);
          setLoading(false);
        } else {
          setUsers(data);
          setLoading(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  console.log(params);
  console.log(users);
  return (
    <BasicLayout className="users">
      <div className="users__head">
        <div className="users__title">
          <h1>Users</h1>
          <input
            placeholder={`🔎 Buscar usuarios ${
              params.type === "new" ? "nuevos" : "seguidos"
            }`}
            type="text"
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
        </div>
        <ButtonGroup className="users__buttons">
          <Button
            className={params.type === "new" && "active"}
            onClick={() => setParams({ ...params, type: "new", page: 1 })}
          >
            Nuevos
          </Button>
          <Button
            className={params.type === "follow" && "active"}
            onClick={() => setParams({ ...params, type: "follow", page: 1 })}
          >
            Seguidos
          </Button>
        </ButtonGroup>
      </div>
      <div className="users__data">
        {users === null ? (
          <h1>No hay resultados</h1>
        ) : loading ? (
          <Spinner animation="border" variant="success" />
        ) : (
          users?.map((user, idx) => <UsersCard user={user} key={idx} />)
        )}
        {loading !== null && (
          <Button
            variant="success"
            onClick={() => setParams({ ...params, page: params.page + 1 })}
          >
            Ver mas
          </Button>
        )}
      </div>
    </BasicLayout>
  );
}

// const useUsersQuery = (location) => {
//   const { page = 1, type = "follow", search } = queryString.parse(
//     location.search
//   );
//   return { page, type, search };
// };

export default withRouter(Users);
