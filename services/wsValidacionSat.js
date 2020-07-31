const wsValidacionSat = {
  validate: () => {
    const url =
      "https://consultaqr.facturaelectronica.sat.gob.mx/consultacfdiservice.svc";

    let headers = new Headers();
    headers.append("Content-Type", 'text/xml;charset="utf-8"');
    headers.append("Accept", "text/xml");
    headers.append(
      "SOAPAction",
      "http://tempuri.org/IConsultaCFDIService/Consulta"
    );
    headers.append("Origin", "consultaqr.facturaelectronica.sat.gob.mx");
    headers.append("Host", "consultaqr.facturaelectronica.sat.gob.mx");
    headers.append("cache-control", "no-cache");

    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "*");

    let qr_text =
      "?re=MSE021121F22&rr=CLE140212H17&tt=9280.000000&id=7EFE7AE4-78F9-49A5-8A68-5E765B5842A5";

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

    body = body.replace("{{DATOS}}", qr_text);

    console.log("about to send " + body);

    // fetch(url, {
    //   body: body,
    //   method: "POST",
    //   mode: "cors",
    //   headers: headers,
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

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

    //FOR TESTING: display results in an alert box once the response is received
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        alert(xmlhttp.responseText);
      }
    };

    //send the SOAP request
    xmlhttp.send(body);
  },
};

export default wsValidacionSat;
