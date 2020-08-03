const wsResponseParser = (soapResponse) => {
  const regexCodigoEstatus = /<a:CodigoEstatus>.*<\/a:CodigoEstatus>/g;
  const regexEsCancelable = /<a:EsCancelable>.*<\/a:EsCancelable>/g;
  const regexEstado = /<a:Estado>.*<\/a:Estado>/g;
  const regexEstatusCancelacion = /<a:EstatusCancelacion>.*<\/a:EstatusCancelacion>/g;

  let codigoEstatus = soapResponse.match(regexCodigoEstatus);
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
    codigoEstatus,
    esCancelable,
    estado,
    estatusCancelacion,
  };
};

export default wsResponseParser;
