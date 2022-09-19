//Variable spreadsheet storage
let selectedFile;

//Show worksheet name in input field
$("#input").change((event) => {
  selectedFile = event.target.files[0];
  $("#label_id").text(`${selectedFile.name}`);
});

//Whan selecting radio button sequentially enables the checkbox
$("#rb_sequential").change(() => {
  $(document).ready(function () {
    $("#num").prop("disabled", false);
  });
});

//When selecting radio button free numbering, enables the checkbox
$("#rb_free").change(() => {
  $(document).ready(function () {
    $("#num").prop("disabled", true);
  });
});

//Conversion button click event
$("button").click(() => {
  //Checking if a sheet is selected for reading
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

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let rw = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

        let sql_MA_Items = "";
        let sql_MA_ItemsGoods =
          "--EXECUTAR ESTE COMANDO ANTES\nINSERT INTO MA_ItemsGoodsData(Item) SELECT MA_Items.Item FROM MA_Items;\n\n";
        let sql_MA_ItemsTax =
          "--EXECUTAR ESTE COMANDO ANTES\nINSERT INTO MA_ItemsBRTaxes(Item) SELECT MA_Items.Item FROM MA_Items;\n\n";
        let invetoryTxt = "";

        for (let i = 0; i < rw.length; i++) {
          let leftCodeZeros = "";

          const codigo = rw[i].Item;
          if (isSeqNumCode) {
            leftCodeZeros = formattingCode(codigo, codLenght);
          } else {
            leftCodeZeros = "";
          }

          let oldItem = rw[i].OldItem;
          oldItem = checkData(oldItem);
          oldItem = String(oldItem);

          let description = rw[i].Description;
          description = checkData(description);
          description = checkText(description);

          let saleBarCode = rw[i].SaleBarCode;
          saleBarCode = checkData(saleBarCode);
          saleBarCode = checkBarCode(saleBarCode);

          let isGood = rw[i].IsGood;
          isGood = checkData(isGood);
          isGood = checkItemGood(isGood);

          let baseUoM = rw[i].BaseUoM;
          baseUoM = checkData(baseUoM);
          baseUoM = checkText(baseUoM);

          let basePrice = rw[i].BasePrice;
          basePrice = checkData(basePrice);

          let nature = rw[i].Nature;
          nature = checkData(nature);
          nature = reclassifyItemType(nature);

          let itemType = rw[i].ItemType;
          itemType = checkData(itemType);
          itemType = String(itemType);

          let commodityCtg = rw[i].CommodityCtg;
          commodityCtg = checkData(commodityCtg);
          commodityCtg = String(commodityCtg);

          let homogeneousCtg = rw[i].HomogeneousCtg;
          homogeneousCtg = checkData(homogeneousCtg);
          homogeneousCtg = String(homogeneousCtg);

          let ncm = rw[i].NCM;
          ncm = checkData(ncm);
          ncm = checkText(String(ncm));

          let cest = rw[i].CEST;
          cest = checkData(cest);
          cest = checkText(String(cest));

          let typeBRTaxes = rw[i].TypeBRTaxes;
          typeBRTaxes = checkData(typeBRTaxes);
          typeBRTaxes = reclassifyItemFiscalCategory(typeBRTaxes);

          let minimumStock = rw[i].MinimumStock;
          minimumStock = checkData(minimumStock);

          let maximumStock = rw[i].MaximumStock;
          maximumStock = checkData(maximumStock);

          let grossWeight = rw[i].GrossWeight;
          grossWeight = checkData(grossWeight);

          let netWeight = rw[i].NetWeight;
          netWeight = checkData(netWeight);

          let department = rw[i].Department;
          department = checkData(department);
          department = String(department);

          let location = rw[i].Location;
          location = checkData(location);
          location = String(location);

          let useLots = rw[i].UseLots;
          useLots = checkData(useLots);
          useLots = checkControlsLots(useLots);

          sql_MA_Items += `INSERT INTO MA_Items (Item,OldItem,Description,SaleBarCode,IsGood,BaseUoM,BasePrice,Nature,ItemType,CommodityCtg,HomogeneousCtg) VALUES ('${leftCodeZeros}${codigo}','${oldItem}','${description}','${saleBarCode}',${isGood},'${baseUoM}',${basePrice},${nature},'${itemType}','${commodityCtg}','${homogeneousCtg}');\n`;
          sql_MA_ItemsTax += `UPDATE MA_ItemsBRTaxes SET NCM='${ncm}', CEST='${cest}', ItemType=${typeBRTaxes} WHERE Item='${leftCodeZeros}${codigo}';\n`;
          sql_MA_ItemsGoods += `UPDATE MA_ItemsGoodsData SET MinimumStock=${minimumStock}, MaximumStock=${maximumStock}, GrossWeight=${grossWeight}, NetWeight=${netWeight}, Department='${department}', Location='${location}', UseLots=${useLots} WHERE Item='${leftCodeZeros}${codigo}';\n`;
          invetoryTxt += `${leftCodeZeros}${codigo};${rw[i].Qty}\n`;
        }

        setTimeout(function () {
          $("#button").prop("disabled", false);
          $("#button").html(
            `Converter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <i class="feather icon-play"> </i>`
          );
          download(`${sql_MA_Items}`, "MA_Items.sql", "text/plain");
          download(`${sql_MA_ItemsTax}`, "MA_ItemsBRTaxes.sql", "text/plain");
          download(
            `${sql_MA_ItemsGoods}`,
            "MA_ItemsGoodsData.sql",
            "text/plain"
          );
          download(`${invetoryTxt}`, "Inventario.txt", "text/plain");
        }, 2000);
      });
    };
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

  let x = txt.replace(a, "");

  return x;
}

function checkBarCode(sbc) {
  if (sbc == "") {
    return "SEM GTIN";
  } else if (sbc == undefined) {
    return "SEM GTIN";
  } else if (sbc == null) {
    return "SEM GTIN";
  } else {
    return sbc;
  }
}

function checkItemGood(val) {
  let x;
  switch (val) {
    case "SERVICO":
      x = 0;
      break;
    case "SERVIÇO":
      x = 0;
      break;
    case "MERCADORIA":
      x = 1;
      break;
    default:
      x = 1;
      break;
  }
  return x;
}

function reclassifyItemType(val) {
  let x;
  switch (val) {
    case "COMPRA":
      x = 22413314;
      break;
    case "PRODUTO ACABADO":
      x = 22413313;
      break;
    case "SEMIACABADO":
      x = 22413312;
      break;
    default:
      x = 22413314;
      break;
  }
  return x;
}

function reclassifyItemFiscalCategory(val) {
  let x;
  switch (val) {
    case "00 - Mercadoria para Revenda":
      x = 31719424;
      break;
    case "01 - Matéria-Prima":
      x = 31719425;
      break;
    case "02 - Embalagem":
      x = 31719426;
      break;
    case "03 - Produto em Processo":
      x = 31719427;
      break;
    case "04 - Produto Acabado":
      x = 31719428;
      break;
    case "05 - Subproduto":
      x = 31719429;
      break;
    case "06 - Produto Intermediário":
      x = 31719430;
      break;
    case "07 - Material de Uso e Consumo":
      x = 31719431;
      break;
    case "08 - Ativo Imobilizado":
      x = 31719432;
      break;
    case "09 - Serviços":
      x = 31719433;
      break;
    case "10 - Outros insumos":
      x = 31719434;
      break;
    default:
      x = 31719424;
      break;
  }
  return x;
}

function checkControlsLots(val) {
  let x;
  switch (val) {
    case "SIM":
      x = 1;
      break;
    case "NAO":
      x = 0;
      break;
    case "NÃO":
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
