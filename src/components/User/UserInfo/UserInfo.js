import React from "react";

export default function UserInfo(props) {
  const { user } = props;
  return (
    <div>
      <p>{user ? user.email : null}</p>
      {user?.description && <div>{user.description}</div>}
    </div>
  );
}
