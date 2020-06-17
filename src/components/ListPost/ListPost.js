import React, { useState, useEffect } from "react";
import "./ListPost.scss";

import { map } from "lodash";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";

import moment from "moment";
import avatarDefault from "../../assets/avatarDefault.png";
import { API_HOST } from "../../utils/constants";
import { getUserAPI } from "../../api/user";

export default function ListPost(props) {
  const { posts } = props;
  return (
    <div>
      {map(posts, (post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
}

const Post = (props) => {
  const { post } = props;

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getUserAPI(post.userId)
        .then((data) => {
          if (!data.error) {
            setUser(data);
          } else {
            toast.error("Error al cargar");
          }
        })
        .catch(() => {
          toast.error("Error al cagar los posts");
        });
    }

    fetchData();
  }, [post]);

  const avatarUrl = user?.avatar
    ? `${API_HOST}/getAvatar?id=${user.id}`
    : avatarDefault;

  return (
    <div className="post">
      <div className="post__head">
        <div className="post_title">
          <Image src={avatarUrl} roundedCircle />
          <h3>{`${user?.name} ${user?.lastname}`}</h3>
        </div>
        <h4>{moment(user?.date).calendar()}</h4>
      </div>
      <p>{post.body}</p>
    </div>
  );
};
