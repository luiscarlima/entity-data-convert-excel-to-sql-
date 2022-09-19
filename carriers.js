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

        let sql_MA_Carriers = "";

        for (let i = 0; i < rw.length; i++) {
          let leftCodeZeros = "";

          const codigo = rw[i].Carrier;
          if (isSeqNumCode) {
            leftCodeZeros = formattingCode(codigo, codLenght);
          } else {
            leftCodeZeros = "";
          }

          let companyName = rw[i].CompanyName;
          companyName = checkData(companyName);
          companyName = checkText(String(companyName));

          let naturalPerson = rw[i].NaturalPerson;
          naturalPerson = checkData(naturalPerson);
          naturalPerson = checkNaturalPerson(naturalPerson);

          let taxIdNumber = rw[i].TaxIdNumber;
          taxIdNumber = checkData(taxIdNumber);
          taxIdNumber = checkText(String(taxIdNumber));

          let fedStateReg = rw[i].FedStateReg;
          fedStateReg = checkData(fedStateReg);
          fedStateReg = checkText(String(fedStateReg));

          let fiscalCode = rw[i].FiscalCode;
          fiscalCode = checkData(fiscalCode);
          fiscalCode = checkText(String(fiscalCode));

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

          let eMail = rw[i].EMail;
          eMail = checkData(eMail);
          eMail = checkEmail(eMail);

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
              sql_MA_Carriers += `INSERT INTO MA_Carriers(Carrier,CompanyName,NaturalPerson,TaxIdNumber,FedStateReg,FiscalCode,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,EMail,Notes,ISOCountryCode,Disabled) VALUES('${leftCodeZeros}${codigo}','${companyName}','${naturalPerson}','${taxIdNumber}','${fedStateReg}','${fiscalCode}','${zipCode}','${dataJson.logradouro}','${address2}','${streetNo}','${dataJson.bairro}','${dataJson.localidade}','${dataJson.uf}','${country}','${telephone1}','${telephone2}','${eMail}','BR',0);\n`;
            } else {
              sql_MA_Carriers += `INSERT INTO MA_Carriers(Carrier,CompanyName,NaturalPerson,TaxIdNumber,FedStateReg,FiscalCode,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,EMail,Notes,ISOCountryCode,Disabled) VALUES('${leftCodeZeros}${codigo}','${companyName}','${naturalPerson}','${taxIdNumber}','${fedStateReg}','${fiscalCode}','${zipCode}','${address}','${address2}','${streetNo}','${district}','${city}','${federalState}','${country}','${telephone1}','${telephone2}','${eMail}','BR',0);\n`;
            }
          } else {
            sql_MA_Carriers += `INSERT INTO MA_Carriers(Carrier,CompanyName,NaturalPerson,TaxIdNumber,FedStateReg,FiscalCode,ZIPCode,Address,Address2,StreetNo,District,City,FederalState,Country,Telephone1,Telephone2,EMail,Notes,ISOCountryCode,Disabled) VALUES('${leftCodeZeros}${codigo}','${companyName}','${naturalPerson}','${taxIdNumber}','${fedStateReg}','${fiscalCode}','${zipCode}','${address}','${address2}','${streetNo}','${district}','${city}','${federalState}','${country}','${telephone1}','${telephone2}','${eMail}','BR',0);\n`;
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

      download(`${sql_MA_Carriers}`, "MA_Carriers.sql", "text/plain");
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

function checkData(data) {
  let x = "";
  if (data == undefined) {
    return x;
  } else {
    return data;
  }
}
