import React, { useState } from "react";

import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { addPostAPI } from "../../../api/post";

import "./PostModal.scss";

export default function PostModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (message.length === 0) {
      toast.warn("El post esta vacio");
      return;
    }

    addPostAPI(message)
      .then((response) => {
        if (response?.code >= 200 && response?.code < 300) {
          toast.success(response.message);
          setShow(false);
          window.location.reload();
        } else {
          toast.warn("No se envio el post");
        }
      })
      .catch(() => {
        toast.error("El servidor no esta disponible");
      });
  };

  return (
    <Modal
      className="post-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="ls"
    >
      <Modal.Header className="post-modal__header" closeButton>
        Publicar
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            row="6"
            placeholder="Publica algo"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="success" className="btn-publicar">
            Publicar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
