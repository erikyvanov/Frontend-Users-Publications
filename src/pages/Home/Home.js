import React, { useEffect, useState } from "react";
import "./Home.scss";

import BasicLayout from "../../layout/BasicLayout";
import ListPost from "../../components/ListPost";

import { getPostFollowAPI } from "../../api/post";
import { Spinner, Button } from "react-bootstrap";

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getPostFollowAPI(page)
      .then((data) => {
        if (data === null) {
          setLoading(null);
        } else {
          if (posts === null) {
            setPosts(formatModel(data));
          } else {
            setPosts([...formatModel(data), ...posts]);
          }
          // console.log([...formatModel(data), ...posts]);
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // console.log(posts);
  return (
    <BasicLayout className="home">
      <h1 className="home__title">Inicio</h1>
      {posts === null ? (
        <h1>No hay posts</h1>
      ) : (
        <div>
          <ListPost posts={posts} />
          {loading !== null && (
            <div className="home__bs">
              {loading ? (
                <Spinner animation="border" variant="success" />
              ) : (
                <Button variant="success" onClick={() => setPage(page + 1)}>
                  Ver mas
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </BasicLayout>
  );
}

const formatModel = (posts) => {
  const postTemp = [];
  posts.forEach((element) => {
    postTemp.push({
      _id: element._id,
      userId: element.relationId,
      body: element.Posts.body,
      date: element.Posts.date,
    });
  });

  return postTemp;
};
