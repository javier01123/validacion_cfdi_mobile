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

    // let qr_text =
    //   "?re=MSE021121F22&rr=CLE140212H17&tt=9280.000000&id=7EFE7AE4-78F9-49A5-8A68-5E765B5842A5";

    const length = qr_text.length;
    const index = qr_text.indexOf("?re=");
    const lengthToSubstract = length - index;
    const wsData = qr_text.substr(0, lengthToSubstract);

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

    // <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><ConsultaResponse xmlns="http://tempuri.org/">
    // <ConsultaResult xmlns:a="http://schemas.datacontract.org/2004/07/Sat.Cfdi.Negocio.ConsultaCfdi.Servicio" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
    // <a:CodigoEstatus>S - Comprobante obtenido satisfactoriamente.</a:CodigoEstatus>
    // <a:EsCancelable>Cancelable sin aceptación</a:EsCancelable><a:Estado>Vigente</a:Estado>
    // <a:EstatusCancelacion/></ConsultaResult></ConsultaResponse></s:Body></s:Envelope>

    return new Promise((resolve, reject) => {
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
          console.log(xmlhttp.responseText);
          resolve(xmlhttp.responseText);
        }
      };

      xmlhttp.send(body);
    });
  },
};

export default wsValidacionSat;
