import React, { useState } from "react";
import "./SignUpForm.scss";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validationFunctions";
import { signUpAPI } from "../../api/signUpAPI";

export default function SingInForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialData());
  const [loading, setLoading] = useState(false);

  const validForm = () => {
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData)) {
      toast.warn("Algun campo esta vacio");
      return false;
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warn("El email no es valido");
        return false;
      } else if (formData.password !== formData.repeatPassword) {
        toast.warn("Las contraseñas no coinciden");
        return false;
      } else if (size(formData.password) < 6) {
        toast.warn("La contraseña tiene que tener por menos 6 caracteres");
        return false;
      } else {
        return true;
      }
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (validForm()) {
      setLoading(true);
      try {
        const response = await signUpAPI(formData);
        if (response.status >= 200 && response.status < 300) {
          toast.success("Te has registrado correctamente!");
          setShowModal(false);
        } else if (response.status === 400) {
          toast.error("Ese email ya esta en uso");
        }
      } catch (err) {
        toast.error("El servidor no esta disponible");
      }
      setLoading(false);
    }
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sing-up-form">
      <h1>Crear Cuenta</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" name="name" />
            </Col>
            <Col>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                name="lastname"
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formGroupEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="correo@email.com"
            name="email"
          />
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
              />
            </Col>
            <Col>
              <Form.Label>Repetir Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repetir Contraseña"
                name="repeatPassword"
              />
            </Col>
          </Row>
        </Form.Group>

        <Button variant="success" type="submit">
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Crear Cuenta"
          )}
        </Button>
      </Form>
    </div>
  );
}

const initialData = () => ({
  name: "",
  lastname: "",
  email: "",
  password: "",
  repeatPassword: "",
});
