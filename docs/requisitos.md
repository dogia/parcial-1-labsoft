⸻

📌 ✅ REQUERIMIENTOS FUNCIONALES (RF)

👉 Describen lo que el sistema debe hacer

⸻

👨‍🌾 Gestión de Productores

RF01. El sistema debe permitir registrar un productor con todos sus datos obligatorios.
RF02. El sistema debe permitir consultar la información de un productor.
RF03. El sistema debe permitir actualizar los datos de un productor.
RF04. El sistema debe permitir eliminar un productor.

⸻

🌱 Gestión de Fincas

RF05. El sistema debe permitir registrar una finca asociada a un productor.
RF06. El sistema debe permitir consultar las fincas de un productor.
RF07. El sistema debe permitir actualizar los datos de una finca.
RF08. El sistema debe impedir registrar una finca sin un productor asociado.

⸻

🌿 Gestión de Viveros

RF09. El sistema debe permitir registrar un vivero asociado a una finca.
RF10. El sistema debe permitir consultar los viveros de una finca.
RF11. El sistema debe permitir actualizar los datos de un vivero.
RF12. El sistema debe impedir registrar un vivero sin finca asociada.

⸻

🧪 Gestión de Productos de Control

RF13. El sistema debe permitir registrar productos de control (plaga, hongo, fertilizante).
RF14. El sistema debe permitir consultar los productos registrados.
RF15. El sistema debe permitir actualizar los productos de control.
RF16. El sistema debe diferenciar los tipos de productos mediante herencia (plaga, hongo, fertilizante).

⸻

🧾 Gestión de Labores

RF17. El sistema debe permitir registrar una labor asociada a un vivero.
RF18. El sistema debe permitir asociar un producto de control a una labor.
RF19. El sistema debe permitir consultar las labores de un vivero.
RF20. El sistema debe impedir registrar labores sin vivero o sin producto asociado.

⸻

🔗 Relaciones del Sistema

RF21. El sistema debe permitir que un productor tenga múltiples fincas.
RF22. El sistema debe permitir que una finca tenga múltiples viveros.
RF23. El sistema debe permitir que un vivero tenga múltiples labores.
RF24. El sistema debe garantizar la integridad de las relaciones entre entidades.

⸻

⚙️ ✅ REQUERIMIENTOS NO FUNCIONALES (RNF)

👉 Describen cómo debe comportarse el sistema

⸻

🔒 Seguridad

RNF01. El sistema debe garantizar la integridad de los datos almacenados.
RNF02. El sistema debe evitar registros con campos nulos o incompletos.

⸻

⚡ Rendimiento

RNF03. El sistema debe responder a consultas en menos de 2 segundos.
RNF04. El sistema debe permitir manejar múltiples registros sin degradación significativa.

⸻

🧱 Calidad de Datos

RNF05. Todos los campos de las entidades deben ser obligatorios.
RNF06. El sistema debe validar el formato de los datos (correo, fechas, etc.).

⸻

🔄 Mantenibilidad

RNF07. El sistema debe estar estructurado bajo un modelo ORM.
RNF08. El código debe ser modular y organizado por entidades.

⸻

🧪 Pruebas

RNF09. El sistema debe contar con pruebas unitarias para cada entidad.
RNF10. El sistema debe validar las relaciones entre entidades mediante pruebas.

⸻

💾 Persistencia

RNF11. El sistema debe almacenar la información en una base de datos relacional.

⸻

🌐 Portabilidad

RNF12. El sistema debe poder ejecutarse en diferentes entornos (local o servidor).
