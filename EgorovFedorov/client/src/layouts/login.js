import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Route, useLocation, useNavigate  } from "react-router-dom";

const FIND_MANY_USER = gql`
  query FindManyUser {
    findManyUser {
      email
      id
      password
    }
  }
`;

const LoginUser = gql`
  mutation LoginUser($data: UserLoginInput!) {
    loginUser(data: $data){
      user{
        email
        password
      }
    }
  }
`;


const Login = () =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, data, refetch } = useQuery(FIND_MANY_USER);
  const [
    loginUser,
    {
      data: dataCreateUser,
      loading: loadingCreateUser,
      error: errorCreateUser,
    },
  ] = useMutation(LoginUser);

  console.log(data);
  const navigate = useNavigate();
  const rega = () =>{
    navigate('/reg');
  }

  return(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        height: "100vh",

      }}
    >

      <div className="mainbar">
        {/*<div className="logo">АБЭ</div>*/}
        <p style={{fontWeight: "500"}}>Вход в соц. сети</p>
        <input
          className="textbox"
          placeholder="Почта"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="textbox"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // style={{ marginTop: 10 }}
        />
        <button
          className="textbox butIn"
          // style={{ marginTop: 10, width: 100, height: 30 }}
          onClick={() => {
            localStorage.setItem('accessToken', loginUser.token);
            loginUser({
              variables: {
                data: {
                  email,
                  password,
                },
              },
            })
              .then((data) => {
                console.log(data);
                refetch();
                // alert(email);
              })
              .catch((e) => {
                // alert(e.message);
              });

            localStorage.setItem('email', email);
            window.location.reload();
          }}
        >
          Войти
        </button>
        {/*<p style={{paddingTop: 40}}>Пользователи</p>*/}
        {/*<div style={{ marginTop: 20}}>*/}
        {/*  {!loading &&*/}
        {/*    data?.findManyUser?.map((item) => {*/}
        {/*      return <div key={item.id}>{item.email}</div>;*/}
        {/*    })}*/}
        {/*</div>*/}
      </div>
      <div className="mainbar downBar">
        <button
          className="textbox butIn butOut"
          onClick={rega}
        >
          Зарегистрироваться
        </button>
        <p>После регистрации вы получите доступ ко всем возможностям нашей соц. сети</p>
      </div>

    </div>
  );
};

export default Login;