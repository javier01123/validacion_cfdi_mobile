const qrParser = (qrData) => {
  const rfcEmisorRegex = /re=.*?&/;
  const rfcReceptorRegex = /rr=.*?&/;
  const totalRegex = /tt=.*?&/;
  const uuidRegex = /id=.{36}/;

  let rfcEmisor = qrData.match(rfcEmisorRegex);
  let rfcReceptor = qrData.match(rfcReceptorRegex);
  let total = qrData.match(totalRegex);
  let uuid = qrData.match(uuidRegex);

  if (!rfcEmisor) rfcEmisor = "";
  if (!rfcReceptor) rfcReceptor = "";
  if (!total) total = "";
  if (!uuid) uuid = "";

  rfcEmisor = rfcEmisor.toString().replace("re=", "").replace("&", "");
  rfcReceptor = rfcReceptor.toString().replace("rr=", "").replace("&", "");
  total = total.toString().replace("tt=", "").replace("&", "");
  uuid = uuid.toString().replace("id=", "");

  return { rfcEmisor, rfcReceptor, total, uuid };
};

export default qrParser;
