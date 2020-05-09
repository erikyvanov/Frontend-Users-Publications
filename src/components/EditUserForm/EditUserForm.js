import React, { useState, useCallback } from "react";
import "./EditUserForm.scss";

import { Form, Col, Button, Spinner } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { API_HOST } from "../../utils/constants";
import { uploadAvatarAPI, updateInfoApi } from "../../api/user";

export default function EditUserForm(props) {
  const { user, setShow } = props;

  const [formData, setFormData] = useState(initialData(user));
  const [loading, setLoading] = useState(false);
  const [avatarURL, setAvatarURL] = useState(
    user?.avatar ? `${API_HOST}/getAvatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);

  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarURL(URL.createObjectURL(file));
    setAvatarFile(file);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (avatarFile) {
      await uploadAvatarAPI(avatarFile).catch(() => {
        toast.error("No se actualizo el avatar");
      });
    }

    await updateInfoApi(formData)
      .then((response) => {
        if (response.message) {
          toast.error(response.message);
        } else {
          setShow(false);
        }
      })
      .catch(() => {
        toast.error("El servidor no esta disponible");
      });
    setLoading(false);
    window.location.reload();
  };
  // console.log(user);
  return (
    <div className="edit-user-form">
      <div
        className="avatar-edit"
        style={{ backgroundImage: `url('${avatarURL}')` }}
        {...getRootProps()}
      >
        <FontAwesomeIcon icon={faCamera} />
        <input {...getInputProps()} />
      </div>
      <Form onSubmit={onSubmit} className="form">
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              defaultValue={user?.name}
              name="name"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              defaultValue={formData.lastname}
              name="lastname"
              onChange={onChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ubicación"
            defaultValue={formData.location}
            name="location"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descripción"
            defaultValue={formData.description}
            as="textarea"
            rows="3"
            name="description"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Fecha de nacimiento</Form.Label>
          <DatePicker
            placeholder="Fecha de nacimiento"
            selected={new Date(formData.birthday)}
            onChange={(date) => setFormData({ ...formData, birthday: date })}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Actualizar"
          )}
        </Button>
      </Form>
    </div>
  );
}

const initialData = (user) => ({
  name: user.name || "",
  lastname: user.lastname || "",
  location: user.location || "",
  description: user.description || "",
  birthday: user.birthday || "",
});
