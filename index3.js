//Variable spreadsheet storage
let selectedFile;

//Show worksheet name in input field
$("#input").change((event) => {
  selectedFile = event.target.files[0];
  $("#label_id").text(`${selectedFile.name}`);
});

//When selecting radio button sequentially enables the checkbox
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

    //Product code lenght
    let codLenght = 10;
    var num_option = document.getElementById("num");
    codLenght = parseInt(num_option.options[num_option.selectedIndex].text);

    //Sequential or non-sequential code
    let isSeqNumCode = true;
    isSeqNumCode = document.getElementById("rb_sequential").checked;

    //Filereader Instance
    let fileReader = new FileReader();

    //Convert Spreadsheet to Binary String
    fileReader.readAsBinaryString(selectedFile);

    //Binary file read event
    fileReader.onload = (event) => {
      //Results event
      let data = event.target.result;

      //Workbook readed
      let workbook = XLSX.read(data, { type: "binary" });

      //Get the name of the first > main worksheet
      let sheetName = workbook.SheetNames[0];

      //Get the worksheet header > fields from the imported data
      const fieldsArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      })[0];

      //Function performed for each worksheet found in the file
      workbook.SheetNames.forEach((sheet) => {
        //sheet is the name of worksheet

        //Transforming the worksheet into an array for each row
        let row = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

        //?Building the initial part of the query structure for tabel MA_Items [BEGIN]
        let ju = `INSERT INTO `;
        let li = `(`;
        let a = `) VALUES (`;
        let na = `);`;
        //?Building the initial part of the query structure for tabel MA_Items [END]

        //Table Object Arrays
        let ma_items_object_array = [
          { column_name: "Item", type: "varchar", lenght: 21, nullable: false },
          {
            column_name: "SaleBarCode",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          {
            column_name: "Description",
            type: "varchar",
            lenght: 128,
            nullable: true,
          },
          { column_name: "IsGood", type: "char", lenght: 1, nullable: true },
          {
            column_name: "TaxCode",
            type: "varchar",
            lenght: 4,
            nullable: true,
          },
          {
            column_name: "BaseUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "BasePrice",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "Discount1",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "Discount2",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "DiscountFormula",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          { column_name: "Markup", type: "float", lenght: 8, nullable: true },
          {
            column_name: "ItemType",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "CommodityCtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "HomogeneousCtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "CommissionCtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "SaleOffset",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "PurchaseOffset",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "AvailabilityDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          { column_name: "SaleType", type: "int", lenght: 4, nullable: true },
          {
            column_name: "HasCustomers",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "HasSuppliers",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "InternalNote",
            type: "varchar",
            lenght: 128,
            nullable: true,
          },
          {
            column_name: "PublicNote",
            type: "varchar",
            lenght: 128,
            nullable: true,
          },
          {
            column_name: "Producer",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "UseSerialNo",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "OldItem",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          { column_name: "Disabled", type: "char", lenght: 1, nullable: true },
          {
            column_name: "ProductCtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ProductSubCtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "KitExpansion",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "PostKitComponents",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "Picture",
            type: "varchar",
            lenght: 128,
            nullable: true,
          },
          {
            column_name: "StandardCostDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          { column_name: "Nature", type: "int", lenght: 4, nullable: true },
          {
            column_name: "SecondRateUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "SecondRate",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          {
            column_name: "PurchaseType",
            type: "int",
            lenght: 4,
            nullable: true,
          },
          {
            column_name: "ConsuptionOffset",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "NotPostable",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "SalespersonComm",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "CostCenter",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "NoUoMSearch",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          { column_name: "Job", type: "varchar", lenght: 10, nullable: true },
          {
            column_name: "DescriptionText",
            type: "varchar",
            lenght: 64,
            nullable: true,
          },
          {
            column_name: "CanBeDisabled",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "ProductLine",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ShortDescription",
            type: "varchar",
            lenght: 40,
            nullable: true,
          },
          {
            column_name: "BasePriceWithTax",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "SubjectToWithholdingTax",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "CreationDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ModificationDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "NoAddDiscountInSaleDoc",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "BarcodeSegment",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          {
            column_name: "ReverseCharge",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "RCTaxCode",
            type: "varchar",
            lenght: 4,
            nullable: true,
          },
          { column_name: "Draft", type: "char", lenght: 1, nullable: true },
          { column_name: "Valorize", type: "char", lenght: 1, nullable: true },
          {
            column_name: "FiscalUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "AccountingType",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "AccountingRuleCode",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "NoPaymDiscountInDoc",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "ToBeDiscontinued",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "LastSubIdNotes",
            type: "int",
            lenght: 4,
            nullable: true,
          },
          { column_name: "Deposit", type: "char", lenght: 1, nullable: true },
          {
            column_name: "EITypeCode",
            type: "varchar",
            lenght: 35,
            nullable: true,
          },
          {
            column_name: "EIValueCode",
            type: "varchar",
            lenght: 35,
            nullable: true,
          },
          { column_name: "EITypeLine", type: "int", lenght: 4, nullable: true },
          {
            column_name: "AswAddChargeCode",
            type: "varchar",
            lenght: 60,
            nullable: true,
          },
          {
            column_name: "GroupItemCode",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          {
            column_name: "EIAdminstrativeRef",
            type: "varchar",
            lenght: 20,
            nullable: true,
          },
          {
            column_name: "TSChargeType",
            type: "varchar",
            lenght: 2,
            nullable: true,
          },
          {
            column_name: "TSChargeTypeFlag",
            type: "varchar",
            lenght: 1,
            nullable: true,
          },
          { column_name: "ISBN", type: "varchar", lenght: 15, nullable: true },
          {
            column_name: "AuthorCode",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "CoverPrice",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ItemCodes",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "AdditionalCharge",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "TBCreated",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBModified",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBCreatedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
          {
            column_name: "TBModifiedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
          {
            column_name: "TBGuid",
            type: "uniqueidentifier",
            lenght: 16,
            nullable: false,
          },
          {
            column_name: "LastSubIdStocks",
            type: "int",
            lenght: 4,
            nullable: true,
          },
        ];

        let ma_items_br_taxes_object_array = [
          { column_name: "Item", type: "varchar", lenght: 21, nullable: false },
          { column_name: "NCM", type: "varchar", lenght: 8, nullable: true },
          { column_name: "NVE", type: "varchar", lenght: 6, nullable: true },
          { column_name: "CEST", type: "varchar", lenght: 7, nullable: true },
          { column_name: "ANP", type: "varchar", lenght: 9, nullable: true },
          {
            column_name: "ServiceTypeCode",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ItemTypeTaxes",
            type: "int",
            lenght: 4,
            nullable: true,
          },
          {
            column_name: "ApproxTaxesImportPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ApproxTaxesDomesticPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "StateApproxTaxesImportPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "StateApproxTaxesDomesticPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "MunApproxTaxesImportPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "MunApproxTaxesDomesticPerc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          { column_name: "FCI", type: "varchar", lenght: 36, nullable: true },
          {
            column_name: "FiscalBenefCode",
            type: "varchar",
            lenght: 10,
            nullable: true,
          },
          {
            column_name: "PrevWithheldTaxApply",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "PrevICMSST_Taxable",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSST_Value",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSST_Perc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSSub_Value",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSSTFCP_Taxable",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSSTFCP_Value",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PrevICMSSTFCP_Perc",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "NonGTINBarcode",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "TBCreated",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBModified",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBCreatedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
          {
            column_name: "TBModifiedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
        ];

        let ma_items_goods_data_object_array = [
          { column_name: "Item", type: "varchar", lenght: 21, nullable: false },
          {
            column_name: "Supplier",
            type: "varchar",
            lenght: 12,
            nullable: true,
          },
          {
            column_name: "Location",
            type: "varchar",
            lenght: 32,
            nullable: true,
          },
          {
            column_name: "DefaultLocation",
            type: "varchar",
            lenght: 21,
            nullable: true,
          },
          {
            column_name: "Department",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "Appearance",
            type: "varchar",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "NoOfPacks",
            type: "smallint",
            lenght: 2,
            nullable: true,
          },
          {
            column_name: "NetWeight",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "GrossWeight",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "GrossVolume",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PacksIssueUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ReceiptUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "IssueUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ReportUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "OnInventoryLevel",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "OnInventorySheets",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          { column_name: "NoABC", type: "char", lenght: 1, nullable: true },
          {
            column_name: "MaxUnsoldMonths",
            type: "smallint",
            lenght: 2,
            nullable: true,
          },
          {
            column_name: "MinimumStock",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "MaximumStock",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "ReorderingLotSize",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "LastReceiptDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "LastIssueDate",
            type: "datetime",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "LastSupplier",
            type: "varchar",
            lenght: 12,
            nullable: true,
          },
          { column_name: "UseLots", type: "char", lenght: 1, nullable: true },
          {
            column_name: "LotPreexpiringDays",
            type: "smallint",
            lenght: 2,
            nullable: true,
          },
          {
            column_name: "LotValidityDays",
            type: "smallint",
            lenght: 2,
            nullable: true,
          },
          {
            column_name: "PacksReceiptUoM",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "MinimumSaleQty",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "TraceabilityCritical",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "WEEECtg",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "WEEEAmount",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "WEEECtg2",
            type: "varchar",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "WEEEAmount2",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "PostToInspection",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "SpecificationsForSupplier",
            type: "ntext",
            lenght: 16,
            nullable: true,
          },
          {
            column_name: "InsertAnalParam",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "ManageSample",
            type: "char",
            lenght: 1,
            nullable: true,
          },
          {
            column_name: "PercSample",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "SampleQty",
            type: "float",
            lenght: 8,
            nullable: true,
          },
          {
            column_name: "UseSupplierLotAsNewLotNumber",
            type: "int",
            lenght: 4,
            nullable: true,
          },
          {
            column_name: "TBCreated",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBModified",
            type: "datetime",
            lenght: 8,
            nullable: false,
          },
          {
            column_name: "TBCreatedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
          {
            column_name: "TBModifiedID",
            type: "int",
            lenght: 4,
            nullable: false,
          },
        ];

        //?Create and fill arrays containing only the Table Column Names [BEGIN]
        //Table Column Name Arrays
        let ma_items_column_name_array = [];
        let ma_items_br_taxes_column_name_array = [];
        let ma_items_goods_data_column_name_array = [];

        //MA_Items
        for (let i = 0; i < ma_items_object_array.length; i++) {
          ma_items_column_name_array.push(
            ma_items_object_array[i]["column_name"]
          );
        }
        //MA_ItemsBrTaxes
        for (let i = 0; i < ma_items_br_taxes_object_array.length; i++) {
          ma_items_br_taxes_column_name_array.push(
            ma_items_br_taxes_object_array[i]["column_name"]
          );
        }
        //MA_ItemsGoodsData
        for (let i = 0; i < ma_items_goods_data_object_array.length; i++) {
          ma_items_goods_data_column_name_array.push(
            ma_items_goods_data_object_array[i]["column_name"]
          );
        }
        //?Fill the arrays containing only the Table Column Names [END]

        //?Distribute data for each sql query fields [BEGIN]
        //For each field read from the worksheet, execute the function "sortFields"

        let ma_items_query_fields = ``;
        let ma_items_br_taxes_query_fields = ``;
        let ma_items_goods_data_query_fields = ``;

        let ma_items_column_name_array_aux = [];
        let ma_items_br_taxes_column_name_array_aux = [];
        let ma_items_goods_data_column_name_array_aux = [];

        fieldsArray.forEach(sortFields);

        //Function responsible for distributing each field to the respective string
        function sortFields(val) {
          if (ma_items_column_name_array.indexOf(val) > -1) {
            ma_items_query_fields += `${val}, `;
            ma_items_column_name_array_aux.push(val);
          }

          if (ma_items_br_taxes_column_name_array.indexOf(val) > -1) {
            ma_items_br_taxes_query_fields += `${val}, `;
            ma_items_br_taxes_column_name_array_aux.push(val);
          }

          if (ma_items_goods_data_column_name_array.indexOf(val) > -1) {
            ma_items_goods_data_query_fields += `${val}, `;
            ma_items_goods_data_column_name_array_aux.push(val);
          }
        }

        //Remove last ", " of strings
        ma_items_query_fields = ma_items_query_fields.slice(0, -2);
        ma_items_br_taxes_query_fields = ma_items_br_taxes_query_fields.slice(
          0,
          -2
        );
        ma_items_goods_data_query_fields =
          ma_items_goods_data_query_fields.slice(0, -2);

        //?Distribute data for each sql query [END]

        //Writing the complete query [BEGIN]

        let ma_items_sql_query;
        let ma_items_br_taxes_sql_query;
        let ma_items_goods_data_sql_query;

        let values = ``;

        ma_items_column_name_array_aux.forEach((item) => {
          for (let k = 0; k < ma_items_object_array.length; k++) {
            if (item == ma_items_object_array[k]["column_name"]) {
              let var_type = ma_items_object_array[k]["type"];
              if (var_type == "varchar") {
                values += `'${row[0][item]}', `;
              } else if (var_type == "float") {
                let float_x = row[0][item].replace(/,/g, ".");
                values += `${float_x}, `;
              }
            }
          }
        });
        console.log(values);

        for (let i = 0; i < row.length; i++) {
          //Writing the complete query [BEGIN]

          //Queries
          ma_items_sql_query =
            ju + "MA_Items" + li + ma_items_query_fields + a + values + na;

          ma_items_br_taxes_sql_query =
            ju +
            "MA_ItemsBRTaxes" +
            li +
            ma_items_br_taxes_query_fields +
            a +
            "" +
            na;
          ma_items_goods_data_sql_query =
            ju +
            "MA_ItemsGoodsData" +
            li +
            ma_items_goods_data_query_fields +
            a +
            "" +
            na;
          //Writing the complete query [END]
        }

        console.log(ma_items_sql_query);
        console.log("-------------------------------------");
        console.log(ma_items_br_taxes_sql_query);
        console.log("-------------------------------------");
        console.log(ma_items_goods_data_sql_query);

        let sql_MA_Items = "";
        let sql_MA_ItemsGoods =
          "--EXECUTAR ESTE COMANDO ANTES\nINSERT INTO MA_ItemsGoodsData(Item) SELECT MA_Items.Item FROM MA_Items;\n\n";
        let sql_MA_ItemsTax =
          "--EXECUTAR ESTE COMANDO ANTES\nINSERT INTO MA_ItemsBRTaxes(Item) SELECT MA_Items.Item FROM MA_Items;\n\n";
        let invetoryTxt = "";

        for (let i = 0; i < row.length; i++) {
          sql_MA_Items += `INSERT INTO MA_Items (Item,OldItem,Description,SaleBarCode,IsGood,BaseUoM,BasePrice,Nature,ItemType,CommodityCtg,HomogeneousCtg) VALUES ('${leftCodeZeros}${codigo}','${oldItem}';\n`;
          sql_MA_Items += `INSERT INTO MA_Items (Item,OldItem,Description,SaleBarCode,IsGood,BaseUoM,BasePrice,Nature,ItemType,CommodityCtg,HomogeneousCtg) VALUES ('${leftCodeZeros}${codigo}','${oldItem}';\n`;
        }

        /*for (let i = 0; i < rw.length; i++) {
          let leftCodeZeros = "";

          const codigo = rw[i].Item;
          if (isSeqNumCode) {
            leftCodeZeros = formattingCode(codigo, codLenght);
          } else {
            leftCodeZeros = "";
          }

          sql_MA_Items += `INSERT INTO MA_Items (Item,OldItem,Description,SaleBarCode,IsGood,BaseUoM,BasePrice,Nature,ItemType,CommodityCtg,HomogeneousCtg) VALUES ('${leftCodeZeros}${codigo}','${oldItem}','${description}','${saleBarCode}',${isGood},'${baseUoM}',${basePrice},${nature},'${itemType}','${commodityCtg}','${homogeneousCtg}');\n`;
          sql_MA_ItemsTax += `UPDATE MA_ItemsBRTaxes SET NCM='${ncm}', CEST='${cest}', ItemType=${typeBRTaxes} WHERE Item='${leftCodeZeros}${codigo}';\n`;
          sql_MA_ItemsGoods += `UPDATE MA_ItemsGoodsData SET MinimumStock=${minimumStock}, MaximumStock=${maximumStock}, GrossWeight=${grossWeight}, NetWeight=${netWeight}, Department='${department}', Location='${location}', UseLots=${useLots} WHERE Item='${leftCodeZeros}${codigo}';\n`;
          invetoryTxt += `${leftCodeZeros}${codigo};${rw[i].Qty}\n`;
        }*/

        /*setTimeout(function () {
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
        }, 2000);*/
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
