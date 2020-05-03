import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { isEmailValid, fullFields } from "../../utils/validationFunctions";
import { signInAPI, setTokenAPI } from "../../api/auth";
import "./SignInForm.scss";

export default function SignInForm(props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData());

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!fullFields(formData)) {
      toast.warn("Algun campo esta vacio");
    } else if (!isEmailValid(formData.email)) {
      toast.warn("El email no es valido");
    } else {
      try {
        const data = await signInAPI(formData);

        if (data.error) {
          toast.error(data.message);
        } else {
          setTokenAPI(data.token);
          props.setShowModal(false);
          window.location.reload();
        }
      } catch (err) {
        toast.err("El servidor no esta disponible");
      }
    }

    setLoading(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h1>Iniciar Sesión</h1>
      <Form onChange={onChange} onSubmit={onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@email.com"
            defaultValue={formData.email}
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            defaultValue={formData.password}
            name="password"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </Form>
    </div>
  );
}

const initialData = () => ({
  email: "",
  password: "",
});
