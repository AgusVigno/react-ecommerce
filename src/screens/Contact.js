import React from 'react';
import Layout from '../components/Layout';

const Contact = () => {

  return ( 
    <Layout>
      <main className="contacto seccion">
        <div className="contenedor encabezado">
            <h1>Contacto</h1>
            <p className="subtitulo">Envianos un mensaje</p>
            <form className="formulario__contacto"> 
                <div className="container-fluid">
                    <div className="form-group">
                        <div className="row justify-content-center mt-4">
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <i className="far fa-user"></i>
                                        </span>
                                    </div>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                      placeholder="Nombre" 
                                      aria-label="Nombre" 
                                      aria-describedby="addon-wrapping" 
                                      required="required"
                                    />
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <i className="far fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Apellido" aria-label="Apellido" aria-describedby="addon-wrapping" required="required" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <i className="fas fa-mobile-alt"></i>
                                        </span>
                                    </div>
                                    <input type="tel" className="form-control" placeholder="Teléfono" aria-label="Teléfono" aria-describedby="addon-wrapping" required="required" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6 col-lg-6">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <i className="far fa-envelope"></i>
                                        </span>
                                    </div>
                                    <input type="email" className="form-control" placeholder="Correo" aria-label="Correo" aria-describedby="addon-wrapping" required="required" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text">Mensaje</span>
                                    </div>
                                    <textarea className="form-control" aria-label="With textarea" required="required"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input className="button" type="submit" value="Enviar" />
            </form>
            <div className="formulario__newsletter">
                <input type="checkbox" />
                <label for="terminos">Deseo recibir el newsletter</label>
            </div>
        </div>
    </main>
    </Layout>
  );
}
 
export default Contact;