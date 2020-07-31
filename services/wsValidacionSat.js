const wsValidacionSat = {
  validate: (qr_text) => {
    const url =
      "https://consultaqr.facturaelectronica.sat.gob.mx/consultacfdiservice.svc";

    var xmlhttp = new XMLHttpRequest();

    //replace second argument with the path to your Secret Server webservices
    xmlhttp.open("POST", url, true);
    //specify request headers

    xmlhttp.setRequestHeader(
      "SOAPAction",
      '"urn:thesecretserver.com/Authenticate"'
    );
    xmlhttp.setRequestHeader("Content-Type", 'text/xml;charset="utf-8"');
    xmlhttp.setRequestHeader("Accept", "text/xml");
    xmlhttp.setRequestHeader(
      "SOAPAction",
      "http://tempuri.org/IConsultaCFDIService/Consulta"
    );
    xmlhttp.setRequestHeader(
      "Origin",
      "consultaqr.facturaelectronica.sat.gob.mx"
    );
    xmlhttp.setRequestHeader(
      "Host",
      "consultaqr.facturaelectronica.sat.gob.mx"
    );
    xmlhttp.setRequestHeader("cache-control", "no-cache");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "*");

    const length = qr_text.length;
    const index = qr_text.indexOf("?re=");
    const lengthToSubstract = length - index;
    let wsData = qr_text.substr(0, lengthToSubstract);

    wsData =
      "?re=MSE021121F22&rr=CLE140212H17&tt=9280.000000&id=7EFE7AE4-78F9-49A5-8A68-5E765B5842A4";

    let body =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
      "<soapenv:Header/>" +
      "<soapenv:Body>" +
      "<tem:Consulta>" +
      "<!--Optional:-->" +
      "<tem:expresionImpresa><![CDATA[{{DATOS}}]]></tem:expresionImpresa>" +
      "</tem:Consulta>" +
      "</soapenv:Body>" +
      "</soapenv:Envelope>";

    body = body.replace("{{DATOS}}", wsData);

    console.log("about to send " + body);

    return new Promise((resolve, reject) => {
      try {
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4) {
            console.log(xmlhttp.responseText);
            resolve(responseReader(xmlhttp.responseText));
          }
        };

        xmlhttp.send(body);
      } catch (ex) {
        reject(ex);
      }
    });
  },
};

export default wsValidacionSat;

const responseReader = (soapResponse) => {
  const regexCodigoEstatus = /<a:CodigoEstatus>.*<\/a:CodigoEstatus>/g;
  const regexEsCancelable = /<a:EsCancelable>.*<\/a:EsCancelable>/g;
  const regexEstado = /<a:Estado>.*<\/a:Estado>/g;
  const regexEstatusCancelacion = /<a:EstatusCancelacion>.*<\/a:EstatusCancelacion>/g;

  let codigoEstatus = soapResponse.toString().match(regexCodigoEstatus);
  let esCancelable = soapResponse.match(regexEsCancelable);
  let estado = soapResponse.match(regexEstado);
  let estatusCancelacion = soapResponse.match(regexEstatusCancelacion);

  if (!estatusCancelacion) estatusCancelacion = "";
  if (!esCancelable) esCancelable = "";
  if (!estado) estado = "";
  if (!estatusCancelacion) estatusCancelacion = "";

  codigoEstatus = codigoEstatus
    .toString()
    .replace("<a:CodigoEstatus>", "")
    .replace("</a:CodigoEstatus>", "");

  esCancelable = esCancelable
    .toString()
    .replace("<a:EsCancelable>", "")
    .replace("</a:EsCancelable>", "");

  estado = estado
    .toString()
    .replace("<a:Estado>", "")
    .replace("</a:Estado>", "");

  estatusCancelacion = estatusCancelacion
    .toString()
    .replace("<a:EstatusCancelacion>", "")
    .replace("</a:EstatusCancelacion>", "");

  return {
    codigoEstatus: codigoEstatus,
    esCancelable: esCancelable,
    estado: estado,
    estatusCancelacion,
  };
};
