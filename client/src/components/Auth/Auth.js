import React, { useState } from "react";
import { Form, FormGroup, Button, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { register, login } from "../../Redux/actions/authActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Auth = ({ signin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const initState = { name: "", email: "", password: "" },
    [inputs, setInputs] = useState(initState),
    onChange = e =>
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();

    signin ? dispatch(register(inputs)) : dispatch(login(inputs));

    setInputs(initState);

    history.push("/");
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className="card p-4  shadow bg-white rounded"
        style={{ width: "30rem" }}>
        <div className="card-title text-center">
          <h4>{signin ? "Signup" : "Signin"}</h4>
        </div>

        <Form onSubmit={handleSubmit}>
          {signin && (
            <FormGroup>
              <Input
                type="name"
                name="name"
                placeholder="Enter Username"
                value={inputs.name}
                onChange={onChange}
              />
            </FormGroup>
          )}

          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={inputs.email}
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={inputs.password}
              onChange={onChange}
            />
          </FormGroup>

          <Button type="submit" color={signin ? "primary" : "success"}>
            {signin ? "Signup" : "Signin"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
