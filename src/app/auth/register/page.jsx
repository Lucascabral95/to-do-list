"use client"
import "./register.scss"
import "../login/login.scss"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const creacionCuenta = async (e) => {
    e.preventDefault();

    // const result = await axios.post('http://localhost:3000/register', {
    // const result = await axios.post(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/register`, {
    const result = await axios.post(`/register`, {
      email: email,
      password: password
    });
    if (result.status === 200) {
      setEmail("");
      setPassword("");

      toast.success('Cuenta creada exitosamente', {
        position: "top-center",
        duration: 3500
      });
    } else {
      setError(result.data.message);
    }
  }


  const logueoGoogle = () => {
    signIn('google', {
      // callbackUrl: 'http://localhost:3000/'
      // callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/`
      callbackUrl: `/app/hoy`
    });
  }

  return (
    <section className="login-definitivo">
      <div className="contenedor">
        <div className="titulo">
          <h2> Registro </h2>
        </div>
        <form onSubmit={creacionCuenta}>
          <div className="entrada-logueo">
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" placeholder="Lucas@hotmail.com" required />
          </div>
          <div className="entrada-logueo">
            <label htmlFor="password">Contraseña</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="******" required />
          </div>
          <div className="boton-login" style={{ marginTop: "32px" }}>
            <div className="boton" onClick={creacionCuenta}>
              <button type="submit"> Registrate </button>
            </div>
          </div>
        </form>
        <div className="logueo-alternativo">
          <p> O registrate usando </p>
        </div>
        <div className="icono-logueo-alternativo">
          <div className="icono" onClick={logueoGoogle}>
            <FcGoogle className="icon" />
          </div>
        </div>
        <div className="o-registrate">
          <p className="o"> Si ya estás registrado, clickeá acá </p>
          <Link href="/auth/login">
            <p className="registrate"> Acceder  </p>
          </Link>
        </div>
        <Toaster />
      </div>
    </section>
  )
}

export default Register;
