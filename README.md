# Social Network

## Índice

* [1. Definición](#1-definición)
* [2. Princiaples usuarios](#2-principales-usuarios)
* [3. Problematica a resolver](#3-problematica-a-resolver)
* [6. CheckList](#6-checklist)
* [7. Producto Final](#7-producto-final)
* [8. Fuente](#8-fuente)
* [9. Autores](#9-autores)
***

## 1. Definición
Queen Coders es una red social dirigida  a mujeres interesadas en el mundo del desarrollo .Es una plataforma  donde podrás compartir cursos , tutoriales , empleos , responder y hacer preguntas . Así mismo podrás interactuar con otras mujeres con interés afines.

La página es una SPA (Single-Page Application), de diseño responsive que te permite crear , editar , eliminar, leer post,  clasificándolos de acuerdo al tipo de contenido que estos tienen, así mismo , puedes definir la privacidad de los post (público o privado). Puedes editar la información de tu perfil, definiendo tus intereses . Así como visitar el perfil de otros usuarios de la plataforma.

***

## 2. Principales usuarios
Queen Coders es un espacio diseñado para mujeres de todas las edades con un interés en el mundo del desarrollo . Es una plataforma diseñada para encontrar y aportar todo tipo de contenido sobre el desarrollo , así mismo  podrás conectar con otras mujeres con intereses en común.

***

## 3. Problematica a resolver
El producto resuelve la necesidad de encontrar un espacio donde mujeres con intereses en el desarrollo  puedan conectarse y compartir todo tipo de conocimientos, tutoriales, ,eventos, cursos , ofertas de trabajo , etc.

***

## 4. Historias de usuario
![Historias de usuario](https://github.com/andreahenos/LIM016-social-network/blob/main/src/img/img-readme/Historias%20de%20usuario.jpg)

***

## 5. Prototipos 

### Prototipos de baja fidelidad

<div align="center">
  
<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/img-readme/Prototipos1.1.jpg"  width="400">
  
<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/img-readme/Prototipos1.2.jpg"  width="400">

</div>

### Prototipos de alta fidelidad
![Prototipo en Figma](https://github.com/andreahenos/LIM016-social-network/blob/main/src/img/img-readme/Protoripo%202.1.1.png)
![Prototipo en Figma](https://github.com/andreahenos/LIM016-social-network/blob/main/src/img/img-readme/Prototipo%202.2.1.png)
![Prototipo en Figma](https://github.com/andreahenos/LIM016-social-network/blob/main/src/img/img-readme/Prototipo2.3.1.png)
![Prototipo en Figma](https://github.com/andreahenos/LIM016-social-network/blob/main/src/img/img-readme/Prototipo2.4.1.png)

***
## 6. Test de USabilidad

<div align="center">
  
<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/encuestas/1.png"  width="450">
  
<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/encuestas/2.png"  width="450">

<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/encuestas/3.png"  width="450">

</div>

## 7. Checklist ✔️

#### Creación de cuenta de usuario e inicio de sesión

* _Login_ con Firebase:
  * ✅ Para el _login_ y las publicaciones en el muro puedes utilizar [Firebase](https://firebase.google.com/products/database/)
  * ✅ Creación de cuenta de acceso y autenticación con cuenta de correo y
    contraseña, y también con una cuenta de Google.
* Validaciones:
  * ✅ Solamente se permite el acceso a usuarios con cuentas válidas.
  * ✅ No pueden haber usuarios repetidos.
  * ✅ La cuenta de usuario debe ser un correo electrónico válido.
  * ✅ Lo que se escriba en el campo (_input_) de contraseña debe ser secreto.
* Comportamiento:
  * ✅ Al enviarse el formulario de registro o inicio de sesión, debe validarse.
  * ✅ Si hay errores, se deben mostrar mensajes descriptivos para ayudar al
  usuario a corregirlos.

#### Muro/timeline

* Validaciones:
  * ✅ Al publicar, se debe validar que exista contenido en el _input_.
* Comportamiento:
  * ✅ Al recargar la aplicación, se debe verificar si el usuario está _logueado_
    antes de mostrar contenido.
  * ✅ Poder publicar un _post_.
  * ✅ Poder dar y quitar _like_ a una publicación. Máximo uno por usuario.
  * ✅ Llevar un conteo de los _likes_.
  * ✅ Poder eliminar un post específico.
  * ✅ Pedir confirmación antes de eliminar un _post_.
  * ✅ Al dar _click_ para editar un _post_, debe cambiar el texto por un _input_
    que permita editar el texto y luego guardar los cambios.
  * ✅ Al guardar los cambios debe cambiar de vuelta a un texto normal pero con la
    información editada.
  * ✅ Al recargar la página debo de poder ver los textos editados.

#### Consideraciones técnicas UX

* ✅ Hacer al menos 2 entrevistas con usuarios.
* ✅ Hacer un  prototipo de baja fidelidad.
* ✅ Hacer sesiones de _testing de usabilidad_ con el producto en HTML.

#### Hacker edition

* ✅ Permite crear posts con imágenes.
* ✅ Permite buscar usuarios.
* ✅ Permite definir la privacidad de los _posts_ (público o solamente para amigos).
* ✅ Permite ver su muro de cualquier usuario "no-amigo" (solamente los
  posts _públicos_).
* ✅ Permite comentar o responder una publicación.
* ✅ Permite editar perfil.

***

## 8. Producto final <img src="https://cdn-icons-png.flaticon.com/512/3709/3709284.png" width=35px>

Esta es nuestra red social Queen Coders en su estado final. Si desea verlo completo puede dar click:
-  [Version escritorio](https://github.com/MerlyAnco/LIM016-social-network/blob/main/src/img/videos%20de%20producto%20final/full%20screen%20video.mp4) 💻

-  [Version mobile](https://github.com/MerlyAnco/LIM016-social-network/blob/main/src/img/videos%20de%20producto%20final/Queen%20Corder%20Mobile.mp4) 📱

<div align="center">
  
<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/img-final/imagen-home.PNG"  width="800">

</div>

<div align="center">

<img  src="https://raw.githubusercontent.com/MerlyAnco/LIM016-social-network/main/src/img/img-final/img-profile.PNG"  width="800">

</div>

***
## 9. Fuente 📄

Social Network del [Repositorio de Laboratoria](https://github.com/Laboratoria/LIM016-social-network) <img src="https://scontent.flim14-1.fna.fbcdn.net/v/t1.6435-9/130980793_1690922481082152_7942209969687939916_n.png?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFFDsavO8fBBY62GsNsF_IsYehI860yPFhh6EjzrTI8WNi08hyHHv66WO3DZVHiJKe0OfHMVx75hdTyIhUJrKWj&_nc_ohc=tu2wv_3wOzkAX9TVZ5m&_nc_ht=scontent.flim14-1.fna&oh=00_AT-jr3sRGBUJeBi77mmrrSAaBbmvieCALw7YXqmB45O7Xg&oe=6202A8F2" width=20px>
***

## 10. Autores

- [Nicol Mendoza](https://github.com/nicolmendoza) <img src="https://cdn-icons-png.flaticon.com/512/2570/2570280.png" width=20px>
- [Andrea Henostroza](https://github.com/andreahenos) <img src="https://cdn-icons-png.flaticon.com/512/2570/2570280.png" width=20px>
- [Merly Anco](https://github.com/MerlyAnco) <img src="https://cdn-icons-png.flaticon.com/512/2570/2570280.png" width=20px>
