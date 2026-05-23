import { Link } from "react-router-dom";

function Signup() {

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
          Signup 🚀
        </h1>

        <input
          type="text"
          placeholder="Name"

          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

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
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "#00b894",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Signup
        </button>

        <p
          style={{
            color: "white",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Already have an account?

          <Link
            to="/"
            style={{
              color: "yellow",
              marginLeft: "5px",
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;