const datos = {
  cantidad: "",
  categoria: "",
};

/* Le asigno el valor de 'estudiante'
a categoría que es la primera opción del select
*/
let categoria;
datos.categoria = "estudiante";

/*
OBTENGO ELEMENTOS HTML
*/
const cantidad = document.querySelector("#cantidad");
categoria = document.querySelector("#categoria");
const totalAPagar = document.querySelector("#totalAPagar");
const btnResumen = document.querySelector(".btnResumen");
const btnBorrar = document.querySelector(".btnBorrar");
const formulario = document.querySelector(".formulario");

/*
Guardo valores que ingreso por input y select
en el objeto creado anteriormente
*/
let indice = totalAPagar.textContent.indexOf("$");

cantidad.addEventListener("input", (event) => {
  datos.cantidad = event.target.value;
  console.log("cantidad: " + event.target.value + " guardada");
});

categoria.addEventListener("change", (event) => {
  datos.categoria = event.target.value;
  console.log("categoria: " + event.target.value + " guardada");
});

/*
BOTÓN RESUMEN
*/
btnResumen.addEventListener("click", (event) => {
  event.preventDefault();
  const { cantidad, categoria } = datos;
  let resultado = 0;
  indice = totalAPagar.textContent.indexOf("$");
  totalAPagar.textContent = totalAPagar.textContent.substring(0, indice + 1);
  if (categoria == "estudiante") {
    resultado = 200 * cantidad * 0.2;
    console.log("La categoria seleccionada es (E): " + categoria);
  } else if (categoria == "trainee") {
    resultado = 200 * cantidad * 0.5;
    console.log("La categoria seleccionada es (T): " + categoria);
  } else if (categoria == "junior") {
    resultado = 200 * cantidad * 0.85;
    console.log("La cantidad seleccionada es (J): " + categoria);
  }
  totalAPagar.textContent += resultado;

  const imprimirPDF = window.confirm(
    "¿Deseas imprimir el comprobante en formato PDF?"
  );
  if (imprimirPDF) {
    const ticketHTML = `
      <div style=" background:#FFFF00; border: 3px #000 solid; width: 500px">
      <div style="height: 70px;">
          <h1 style="color: #333; text-align: center; font-size: 2em;">Comprobante de Pago</h1>
          <h2 style="color: #777; text-align: center;">Gobierno de Buenos Aires</h2>
      </div>
      <br>
      <hr style="border: 2px solid #000; margin-bottom: 20px;">
      <table style="margin:auto;width:80%; height:150px; margin-bottom:15px;">
          <tr style="align-items: center;">
              <h3 style="text-align: center; margin: 0 auto; border: 2px solid #000; width: 78%;background:#ccc;">
                  DETALLES DE COMPRA
              </h3>
          </tr>
          <tr>
              <th style="border: 2px solid #000;">Cantidad:</th>
              <td style="border: 2px solid #000;text-align: center;background:#ccc;">${cantidad}</td>
          </tr>
          <tr>
              <th style="border: 2px solid #000;">Categoría:</th>
              <td style="border: 2px solid #000; text-align: center; background:#ccc;">${categoria}</td>
          </tr>
          <tr style="border-bottom: 2px solid #000;">
              <th style="border: 2px solid #000;">Total a Pagar:</th>
              <td style="border: 2px solid #000;text-align: center; background:#ccc;">${totalAPagar.textContent}</td>
          </tr>
      </table>
      <hr style="margin-bottom: 10px;padding:2px; background:#777; ">
      <p style="width:50%;margin: 0 auto;">Numero de Factura: 123456</p>
  </div>
      `;
    const nuevaVentana = window.open("", "_blank");
    nuevaVentana.document.write(ticketHTML);
    nuevaVentana.document.close();
    nuevaVentana.print();
    console.log("Comprobante impreso en una página separada");
  }

  return;
});

/*
BOTON BORRAR
*/
btnBorrar.addEventListener("click", function (event) {
  event.preventDefault();
  let indice = 0;
  indice = totalAPagar.textContent.indexOf("$");
  totalAPagar.textContent = totalAPagar.textContent.substring(0, indice++);
  formulario.reset();
  return;
});
