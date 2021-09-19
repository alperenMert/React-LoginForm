import React, { Component } from "react";
import "./Form_1.css";

export default class form_1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formSending: false,
      isLogin: false,
      errors: {
        username: "",
        password: "",
        formError: "",
      },
    };
  }

  /* parametre olarak verilen email kontrol edildi.*/
  isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  inputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    let max = Number(e.target.max);
    let required = e.target.required;

    this.setState({
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });

    /*hatalı email girildiğinde */
    if (
      e.target.name === "username" &&
      this.isEmailValid(this.state.username) === false
    ) {
      this.setState({
        errors: {
          ...this.state.errors,
          username: "Email hatalı, lütfen kontrol edin.",
        },
      });
    }

    /*Eğer zorunlu alanlar boş ise */
    if (required && e.target.value === "") {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: "",
        },
      });
    }

    /* Eğer girilen input max değeri aşmış ise */
    if (e.target.value.length > max) {
      this.setState({
        errors: {
          ...this.state.errors,
          [e.target.name]: "Hatalı giriş." + e.target.max + "sınırı aşıldı.",
        },
      });
    }
  };
  formSubmit = () => {
    this.setState({
      formSending: true,
    });
    setTimeout(() => {
      this.setState({
        formSending: false,
        isLogin: true,
      });
    }, 1000);
  };
  render() {
    let { username, password, isLogin, formSending } = this.state;
    return isLogin ? (
      <div>Hoş Geldiniz</div>
    ) : formSending ? (
      <div>Giriş Yapılıyor...</div>
    ) : (
      <div>
        <h5> Form 1</h5>
        <form onSubmit={this.formSubmit}>
          <label>Kullanıcı adı</label>
          <br />
          <input
            type="email"
            name="username"
            value={username}
            onChange={this.inputChange}
            max="32"
            required
          />
          <br />
          <small>{this.state.errors.username}</small> 
          <label>Parola</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.inputChange}
            max="16"
            required
          />
          <br />
          <small>{this.state.errors.password}</small> 
          <input type="submit" value="Giriş" />
        </form>
      </div>
    );
  }
}
