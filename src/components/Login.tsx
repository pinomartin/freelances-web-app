import React, { useCallback, useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom' 
import {auth, db, provider } from '../firebase'
import GoogleLoginIcon from '../assets/googleLoginIcon.svg'


interface IProps extends RouteComponentProps<any> {
 
}


const Login  = ({history}:RouteComponentProps<any>) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [error, setError] = useState('')
    const [esRegistro, setEsRegistro] = useState(false)

    const procesarData = (e:any) => {
        console.log(typeof(e));
        e.preventDefault();
        if(!email.trim()){
            setError('Ingrese Email');
            return
        }
        if(!password.trim()){
            setError('Ingrese Contraseña');
            return
        }
        if(password.length < 8) {
            setError('Debe Ingresar una Contraseña con 8 caracteres o más...');
            return
        }
        console.log('Paso todas las pruebas');
        setError('');

        if(esRegistro){
            registrar()
        }else{
            login()
        }
    }

    const login = useCallback(async () => {
        try {
          const response =  await auth.signInWithEmailAndPassword(email,password);
          console.log('***DATOS USUARIO LOGUEADO',response.user);
          setEmail('')
          setPassword('')
          setError('')

          history.push('/admin') //Lo mandamos al Admin al loggearse

        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                error.message = 'Email no valido' 
            }
            if(error.code === 'auth/user-not-found'){
                error.message = 'No existe usuario con ese Email' 
            }
            if(error.code === 'auth/wrong-password'){
                error.message = 'Email o Contraseña no son válidos'
            }

            setError(error.message)
        }
    },[email, password, history]);

    const loginWithGoogleAccount = async () => {
        try {
            const resp:any = await auth.signInWithPopup(provider);
            const dbUser = await db.collection("users").doc(resp.user.email).get()
            if(dbUser.exists){
                console.log("Data Usuario desde DB", dbUser.data());
                
            }else{
                await db.collection("users").doc(resp.user.email).set({
                    userName: resp.user.displayName,
                    email : resp.user.email,
                    uid: resp.user.uid,
                    profilePhotoURL: resp.user.photoURL
                })
            }
            history.push('/admin')
        } catch (error) {
            error.code === 'auth/popup-closed-by-user' && 
            setError("Cerraste el popUp de Google")
        }
    }



    const registrar = useCallback(async () => {
        try {
            const response:any = await auth.createUserWithEmailAndPassword(email,password);
            console.log("TIPO DE Response en registro de usuario", typeof(response))
            await db.collection('users').doc(response.user.email).set({
                userName: userName,
                email : response.user.email,
                uid: response.user.uid,
                profilePhotoURL: ''
            })
            //Reset de los campos del formulario
            setEmail('')
            setPassword('')
            setError('')

            history.push('/admin')

        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                error.message = 'Email no valido' //Para traducir el error de Firebase
            }
            if(error.code === 'auth/email-already-in-use'){
                error.message = 'Email en uso'
            }
            
            setError(error.message)
        }
    }, [email,password, userName , history]) //es necesario insertar los campos que van como parametros en la funcion 



    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuarios' : 'Login de Acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-3">
                    <form onSubmit={procesarData}>
                        { 
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        {
                            esRegistro ? (

                                <input type="text" 
                                className="form-control form-control-sm mb-2"
                                placeholder="Nombre de Usuario"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}/>
                            ): null

                        }

                        <input type="email" 
                        className="form-control form-control-sm mb-2"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}/>

                        <input type="password" 
                        className="form-control form-control-sm mb-2"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>

                        <button className="btn btn-dark btn-lg btn-block"
                        type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>

                        <button className="btn btn-info btn-sm btn-block mb-2"
                        type="button"
                        onClick={() => setEsRegistro(!esRegistro)}>
                            
                            {
                                esRegistro ? '¿Ya tienes Cuenta?' : '¿No estas Registrado?'
                            }
                        </button>

                    </form>
                    <button className="btn btn-outline-light btn-sm btn-block" onClick={loginWithGoogleAccount}>
                        <img src={GoogleLoginIcon} alt=""/>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)