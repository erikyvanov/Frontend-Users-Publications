import React, { useState, useEffect } from "react";
import "./User.scss";

import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { getUserAPI } from "../../api/user";
import { checkFollow, followAPI, unfollowAPI } from "../../api/follow";

import BasicLayout from "../../layout/BasicLayout";
import Avatar from "../../components/User/Avatar";
import UserInfo from "../../components/User/UserInfo";
import useAuth from "../../hooks/useAuth";
import ConfigModal from "../../components/modals/ConfigModal";
import EditUserForm from "../../components/EditUserForm";

function User(props) {
  const { params } = props.match;
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [follow, setFollow] = useState(null);

  const loggetUser = useAuth();

  useEffect(() => {
    async function fetchData() {
      await getUserAPI(params.id)
        .then((data) => {
          if (!data.error) {
            setUser(data);
          } else {
            toast.error(data.message);
          }
        })
        .catch(() => {
          toast.error("El usuario no existe");
        });

      await checkFollow(params.id)
        .then((data) => {
          if (data.status) {
            setFollow(true);
          } else {
            setFollow(false);
          }
        })
        .catch(() => {
          toast.error("El usuario no existe");
        });
    }

    fetchData();
  }, [params]);

  const followFunc = () => {
    followAPI(user.id)
      .then(() => {
        setFollow(true);
      })
      .catch(() => {
        toast.error("Servidor no disponible");
      });
  };

  const unfollowFunc = () => {
    unfollowAPI(user.id)
      .then(() => {
        setFollow(false);
      })
      .catch(() => {
        toast.error("Servidor no disponible");
      });
  };

  return (
    <BasicLayout className="user">
      {user ? (
        <>
          <div className="user__title">
            <h2>
              <Avatar user={user} />
              {user.name} {user.lastname}
            </h2>
            <div className="user__btns">
              {loggetUser.user._id === user.id && (
                <Button variant="warning" onClick={() => setShow(true)}>
                  Editar perfil
                </Button>
              )}
              {follow === null
                ? null
                : loggetUser.user._id !== user.id &&
                  (follow ? (
                    <Button
                      variant="danger"
                      onClick={unfollowFunc}
                      className="unfollow-button"
                    >
                      Dejar de seguir
                    </Button>
                  ) : (
                    <Button variant="success" onClick={followFunc}>
                      Seguir
                    </Button>
                  ))}
            </div>
          </div>
          <UserInfo user={user} />

          <div>Posts</div>
        </>
      ) : null}
      <ConfigModal show={show} setShow={setShow} title="Editar perfil">
        <EditUserForm user={user} setShow={setShow} />
      </ConfigModal>
    </BasicLayout>
  );
}

export default withRouter(User);
