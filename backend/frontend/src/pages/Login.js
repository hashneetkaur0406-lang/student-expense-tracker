import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (

    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#243447",
      }}
    >

      <div
        style={{
          background: "#5aa3ad",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Login 🔐
        </h1>

        <input
          type="email"
          placeholder="Email"

          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"

          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

       <button
  onClick={() => {

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    navigate("/dashboard");

  }}

  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    background: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  }}
>
  Login
</button>
        

        <p
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Don’t have an account?

          <Link
            to="/signup"
            style={{
              color: "yellow",
              marginLeft: "5px",
            }}
          >
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;