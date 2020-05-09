import React from "react";
import "./ConfigModal.scss";

import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ConfigModal(props) {
  const { show, setShow, title, children } = props;
  return (
    <Modal
      className="config-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Title>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setShow(false)} />
      </Modal.Title>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
