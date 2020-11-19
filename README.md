Proyecto realizado en ReactJS utilizando [Create React App](https://github.com/facebook/create-react-app).

[Ver Proyecto FUNCIONANDO](https://hopeful-feynman-fc07f1.netlify.app/), siendo un ecommerce.

* ** *** **** ***** **** *** ** * 

En esta etapa se realizó:
* Al agregar productos al carrito, y hacer hover, se muestra un resumen de lo agregado.
* Se configuro el registro de usuarios mediante Firebase, con correo y password.
* Se configuro el login de usuarios, modificando el NavBar dependiendo si el usuarios se encuentra logueado o no.
* Se habilita el boton en la vista del Checkout, unicamente si el usuario ingresa todos los campos requeridos.
* Si el usuario se encuentra logueado, se permite que pueda cargar nuevos productos. (al agregarse en el menu la seccion "Productos").
* Los productos y las categorias se encuentran en el Context, para optimizar consultas innecesarias a la API, ya que se consumen los productos desde diferentes componentes.
* Se valida que los componentes no carguen o se re-rendericen innecesariamente, mejorando la performance general de la carga en todo el sitio.

* ** *** **** ***** **** *** ** * 

Recordá instalar todas las dependencias del proyecto ejecutando el comando: npm install

Luego ejecuta el comando: npm run start