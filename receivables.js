let selectedFile;

$("#input").change((event) => {
  selectedFile = event.target.files[0];
  $("#label_id").text(`${selectedFile.name}`);
});

$("button").click(() => {
  if (selectedFile) {
    $("#button").prop("disabled", true);
    $("#button").html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`
    );

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      workbook.SheetNames.forEach(async (sheet) => {
        let rw = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);

        let sql_MA_Rcvbls = "";

        for (let i = 0; i < rw.length; i++) {
          let custSupp = rw[i].CustSupp;
          custSupp = checkData(custSupp);
          custSupp = String(custSupp);

          let pymtSchedId = rw[i].PymtSchedId;
          pymtSchedId = checkData(pymtSchedId);

          let installmentNo = rw[i].InstallmentNo;
          installmentNo = checkData(installmentNo);

          workbook.SheetNames.forEach(async (sheet) => {
            let t = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );

            for (let j = 0; j < t.length; j++) {
              console.log(t[j].PymtSchedId);
            }
          });

          /*if (i == 0) {
            var index = 0;
          } else {
            var index = i - 1;
          }

          while (rw[i].PymtSchedId == rw[index].PymtSchedId) {
            console.log(rw[i].PymtSchedId);
          }*/

          let docNo = rw[i].DocNo;
          docNo = checkData(docNo);
          docNo = String(docNo);

          let amount = rw[i].Amount;
          amount = checkData(amount);

          let openingDate = rw[i].OpeningDate;
          openingDate = checkData(openingDate);
          openingDate = String(openingDate);

          let installmentDate = rw[i].InstallmentDate;
          installmentDate = checkData(installmentDate);
          installmentDate = String(installmentDate);

          sql_MA_Rcvbls = `BEGIN TRANSACTION
          DECLARE @PymtSchedId INT;
          DECLARE @TotalAmount FLOAT;
          DECLARE @CustSupp VARCHAR(10);
          SET @PymtSchedId = (SELECT (MAX(PymtSchedId)+1) FROM MA_PyblsRcvbls);
          SET @TotalAmount = 0;
          SET @CustSupp = (SELECT CustSupp FROM MA_CustSupp WHERE ExternalCode='${custSupp}');
        
            INSERT INTO MA_PyblsRcvbls(PymtSchedId,DocNo,CustSupp,CustSuppType,Currency,DocumentDate) 
            VALUES (@PymtSchedId,'${docNo}',@CustSupp,3211264,'BRL','${openingDate}');
        
            INSERT INTO MA_PyblsRcvblsDetails(InstallmentNo,PymtSchedId,Amount,OpeningDate,InstallmentType,ClosingType,InstallmentDate,PaymentTerm,CustSuppType,CustSupp,DebitCreditSign,Currency,Closed,DocumentType,MandateSequenceType,AmountType) 
            VALUES (${installmentNo},@PymtSchedId,${amount},'${openingDate}'5505024,6946816,'${installmentDate}',2686976,3211264,@CustSupp,4980737,'BRL','0',3801088,29425665,6356995);
        
          SET @TotalAmount = (SELECT SUM(Amount) FROM MA_PyblsRcvblsDetails WHERE PymtSchedId=@PymtSchedId);
        
          UPDATE MA_PyblsRcvbls SET TotalAmount=@TotalAmount WHERE PymtSchedId=@PymtSchedId;
        COMMIT;\n`;
        }

        //download(`${sql_MA_Rcvbls}`, "MA_Rcvbls.sql", "text/plain");
      });
    };
    setTimeout(function () {
      $("#button").prop("disabled", false);
      $("#button").html(
        `Converter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <i class="feather icon-play"> </i>`
      );
    }, 2000);
  }
});

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

function checkData(data) {
  let x = "";
  if (data == undefined) {
    return x;
  } else {
    return data;
  }
}
