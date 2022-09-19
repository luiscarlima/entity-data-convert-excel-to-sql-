let selectedFile;

$("#input").change((event) => {
  selectedFile = event.target.files[0];
  $("#label_id").text(`${selectedFile.name}`);
});

$("#rb_sequential").change(() => {
  $(document).ready(function () {
    $("#num").prop("disabled", false);
  });
});

$("#rb_free").change(() => {
  $(document).ready(function () {
    $("#num").prop("disabled", true);
  });
});

$("button").click(() => {
  if (selectedFile) {
    $("#button").prop("disabled", true);
    $("#button").html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    );

    let codLenght = 10;
    let isSeqNumCode = true;

    var num_option = document.getElementById("num");
    codLenght = parseInt(num_option.options[num_option.selectedIndex].text);

    isSeqNumCode = document.getElementById("rb_sequential").checked;

    isCheckedCepApiRun = document.getElementById("checkCep").checked;

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach(async (sheet) => {
        let rw = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

        let sql_MA_CustSuppCli = "";

        for (let i = 0; i < rw.length; i++) {
          let leftCodeZeros = "";

          const codigo = rw[i].CustSupp;
          if (isSeqNumCode) {
            leftCodeZeros = formattingCode(codigo, codLenght);
          } else {
            leftCodeZeros = "";
          }

          let externalCode = rw[i].ExternalCode;
          externalCode = checkData(externalCode);
          externalCode = String(externalCode);

          let companyName = rw[i].CompanyName;
          companyName = checkData(companyName);
          companyName = checkText(String(companyName));

          let fantasyName = rw[i].FantasyName;
          fantasyName = checkData(fantasyName);
          fantasyName = checkText(String(fantasyName));

          let naturalPerson = rw[i].NaturalPerson;
          naturalPerson = checkData(naturalPerson);
          naturalPerson = checkNaturalPerson(naturalPerson);

          let taxpayerType = rw[i].TaxpayerType;
          taxpayerType = checkData(taxpayerType);
          taxpayerType = reclassifyTaxpayerType(taxpayerType);

          let taxIdNumber = rw[i].TaxIdNumber;
          taxIdNumber = checkData(taxIdNumber);
          taxIdNumber = checkText(String(taxIdNumber));

          let municipalityReg = rw[i].MunicipalityReg;
          municipalityReg = checkData(municipalityReg);
          municipalityReg = checkText(String(municipalityReg));

          let fedStateReg = rw[i].FedStateReg;
          fedStateReg = checkData(fedStateReg);
          fedStateReg = checkText(String(fedStateReg));

          let fiscalCode = rw[i].FiscalCode;
          fiscalCode = checkData(fiscalCode);
          fiscalCode = checkText(String(fiscalCode));

          let genRegNo = rw[i].GenRegNo;
          genRegNo = checkData(genRegNo);
          genRegNo = checkText(String(genRegNo));

          let zipCode = rw[i].ZIPCode;
          zipCode = checkData(zipCode);
          zipCode = String(zipCode);

          let address = rw[i].Address;
          address = checkData(address);
          address = checkText(address);

          let address2 = rw[i].Address2;
          address2 = checkData(address2);
          address2 = checkText(address2);

          let streetNo = rw[i].StreetNo;
          streetNo = checkData(streetNo);
          streetNo = checkText(String(streetNo));

          let district = rw[i].District;
          district = checkData(district);
          district = checkText(district);

          let federalState = rw[i].FederalState;
          federalState = checkData(federalState);
          federalState = checkText(federalState);

          let city = rw[i].City;
          city = checkData(city);
          city = checkText(city);

          let country = rw[i].Country;
          country = checkData(country);
          country = checkText(country);

          let telephone1 = rw[i].Telephone1;
          telephone1 = checkData(telephone1);
          telephone1 = String(telephone1);

          let telephone2 = rw[i].Telephone2;
          telephone2 = checkData(telephone2);
          telephone2 = String(telephone2);

          let fax = rw[i].Fax;
          fax = checkData(fax);
          fax = String(fax);

          let eMail = rw[i].EMail;
          eMail = checkData(eMail);
          eMail = checkEmail(eMail);

          let eMail2 = rw[i].EMail2;
          eMail2 = checkData(eMail2);
          eMail2 = checkEmail(eMail2);

          let suframa = rw[i].SUFRAMA;
          suframa = checkData(suframa);
          suframa = String(suframa);

          let notes = rw[i].Notes;
          notes = checkData(notes);
          notes = checkText(String(notes));

          if (isCheckedCepApiRun) {
            const cep = zipCode.replace(/\D/g, "");
            const url = `https://viacep.com.br/ws/${cep}/json`;
            const options = {
              method: "GET",
              mode: "cors",
              cache: "default",
            };

            var validacep = /^[0-9]{8}$/;

            if (validacep.test(cep)) {
              var dataApi = await fetch(url, options);
              var dataJson = (dataApi = await dataApi.json());
              sql_MA_CustSuppCli += `INSERT INTO MA_CustSupp(CustSupp,ExternalCode,CompanyName,FantasyName,NaturalPerson,TaxpayerType,TaxIdNumber,MunicipalityReg,FedStateReg,FiscalCode,GenRegNo,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,Fax,EMail,SUFRAMA,Notes,CustSuppType,ISOCountryCode,Language,Disabled,DocumentSendingType,MailSendingType,CustSuppKind) VALUES('${leftCodeZeros}${codigo}','${externalCode}','${companyName}','${fantasyName}','${naturalPerson}',${taxpayerType},'${taxIdNumber}','${municipalityReg}','${fedStateReg}','${fiscalCode}','${genRegNo}','${zipCode}','${dataJson.logradouro}','${address2}','${streetNo}','${dataJson.bairro}','${dataJson.localidade}','${dataJson.uf}','${country}','${telephone1}','${telephone2}','${fax}','${eMail};${eMail2}','${suframa}','${notes}',3211264,'BR','PORT',0,11337729,12451841,7733248);\n`;
            } else {
              sql_MA_CustSuppCli += `INSERT INTO MA_CustSupp(CustSupp,ExternalCode,CompanyName,FantasyName,NaturalPerson,TaxpayerType,TaxIdNumber,MunicipalityReg,FedStateReg,FiscalCode,GenRegNo,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,Fax,EMail,SUFRAMA,Notes,CustSuppType,ISOCountryCode,Language,Disabled,DocumentSendingType,MailSendingType,CustSuppKind) VALUES('${leftCodeZeros}${codigo}','${externalCode}','${companyName}','${fantasyName}','${naturalPerson}',${taxpayerType},'${taxIdNumber}','${municipalityReg}','${fedStateReg}','${fiscalCode}','${genRegNo}','${zipCode}','${address}','${address2}','${streetNo}','${district}','${city}','${federalState}','${country}','${telephone1}','${telephone2}','${fax}','${eMail};${eMail2}','${suframa}','${notes}',3211264,'BR','PORT',0,11337729,12451841,7733248);\n`;
            }
          } else {
            sql_MA_CustSuppCli += `INSERT INTO MA_CustSupp(CustSupp,ExternalCode,CompanyName,FantasyName,NaturalPerson,TaxpayerType,TaxIdNumber,MunicipalityReg,FedStateReg,FiscalCode,GenRegNo,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,Fax,EMail,SUFRAMA,Notes,CustSuppType,ISOCountryCode,Language,Disabled,DocumentSendingType,MailSendingType,CustSuppKind) VALUES('${leftCodeZeros}${codigo}','${externalCode}','${companyName}','${fantasyName}','${naturalPerson}',${taxpayerType},'${taxIdNumber}','${municipalityReg}','${fedStateReg}','${fiscalCode}','${genRegNo}','${zipCode}','${address}','${address2}','${streetNo}','${district}','${city}','${federalState}','${country}','${telephone1}','${telephone2}','${fax}','${eMail};${eMail2}','${suframa}','${notes}',3211264,'BR','PORT',0,11337729,12451841,7733248);\n`;
          }
        }
      });
    };
    setTimeout(function () {
      $("#button").prop("disabled", false);
      $("#button").html(
        `Converter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="feather icon-play"> </i>`
      );

      download(`${sql_MA_CustSuppCli}`, "MA_CustSuppCli.sql", "text/plain");
    }, 2000);
  }
});

function formattingCode(y, z) {
  let w = "";

  for (let i = 0; i < z; i++) {
    w += `0`;
  }

  let x = "";
  if (y <= 9) {
    x = w.slice(0, -1);
  } else if (y <= 99) {
    x = w.slice(0, -2);
  } else if (y <= 999) {
    x = w.slice(0, -3);
  } else if (y <= 9999) {
    x = w.slice(0, -4);
  } else if (y <= 99999) {
    x = w.slice(0, -5);
  } else if (y <= 999999) {
    x = w.slice(0, -6);
  } else if (y <= 9999999) {
    x = w.slice(0, -7);
  } else if (y <= 99999999) {
    x = w.slice(0, -8);
  } else if (y <= 999999999) {
    x = w.slice(0, -9);
  } else if (y <= 9999999999) {
    x = w.slice(0, -10);
  } else {
    x = w;
  }
  return x;
}

function checkText(txt) {
  var a = /'/g;
  var b = /Ç/g;
  var c = /Ç/g;
  var d = /[^\w\s]/gi;

  let w = txt.replace(a, "");
  let x = w.replace(b, "C");
  let y = x.replace(c, "c");
  let z = y.replace(d, "");

  return z;
}

function checkEmail(txt) {
  var a = /'/g;
  let x = txt.replace(a, "");
  return x;
}

function checkNaturalPerson(val) {
  let x;
  switch (val) {
    case "FISICA":
      x = 1;
      break;
    case "FÍSICA":
      x = 1;
      break;
    case "JURIDICA":
      x = 0;
      break;
    case "JURÍDICA":
      x = 0;
      break;
    default:
      x = 0;
      break;
  }
  return x;
}

function reclassifyTaxpayerType(val) {
  let x;
  switch (val) {
    case "Contribuinte ICMS":
      x = 30212096;
      break;
    case "Contribuinte":
      x = 30212096;
      break;
    case "Contribuinte Isento":
      x = 30212097;
      break;
    case "Isento":
      x = 30212097;
      break;
    case "Não Contribuinte":
      x = 30212098;
      break;
    case "Nao Contribuinte":
      x = 30212098;
      break;
    default:
      x = 30212096;
      break;
  }
  return x;
}

function checkData(data) {
  let x = "";
  if (data == undefined) {
    return x;
  } else {
    return data;
  }
}
