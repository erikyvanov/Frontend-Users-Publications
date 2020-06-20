import React, { useState, useEffect } from "react";
import "./Users.scss";
import BasicLayout from "../../layout/BasicLayout";

import { ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { getUsersAPI } from "../../api/follow";
import queryString from "query-string";

function Users(props) {
  return (
    <BasicLayout className="users">
      <div className="users__head">
        <div className="users__title">
          <h1>Users</h1>
          <input
            // placeholder={`🔎 Buscar usuarios ${
            //   type === "new" ? "nuevos" : "seguidos"
            // }`}
            type="text"
          />
        </div>
        <ButtonGroup className="users__buttons">
          <Button>Nuevos</Button>
          <Button>Seguidos</Button>
        </ButtonGroup>
      </div>
    </BasicLayout>
  );
}

const useUsersQuery = (location) => {
  const { page = 1, type = "follow", search } = queryString.parse(
    location.search
  );
  return { page, type, search };
};

export default withRouter(Users);
