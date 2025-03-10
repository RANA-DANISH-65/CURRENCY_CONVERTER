const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  
  const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  
  const inputAmount = document.getElementById("amount");
  const genbtn = document.getElementById("btn");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const dropdowns = document.querySelectorAll(".dropdown select");
  const msg=document.querySelector(".msg")
  
  for (let select of dropdowns) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "PKR") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "USD") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
  function updateFlag(target){
    
    let currCode = target.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = target.parentElement.querySelector("img");
    img.src = newSrc;
  
  }const getExchange = async () => {
    inputAmount.disabled = true;
    fromCurr.disabled = true;
    toCurr.disabled = true;
    genbtn.disabled = true;
    genbtn.style.backgroundColor="#ff6a00"

    msg.innerText="PLEASE WAIT....."
    setTimeout(async()=>{
        let amountVal = parseFloat(inputAmount.value);

    
        if (isNaN(amountVal) || amountVal < 1) {
            amountVal = 1;
            inputAmount.value = 1;
        }
    
        let fromCode = fromCurr.value;
        let toCode = toCurr.value;
        let url = `https://v6.exchangerate-api.com/v6/1b1b609ae17593a6b7caa63f/latest/${fromCode}`;
    
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            let data = await response.json();
            let rate = data.conversion_rates[toCode];
           
            
            if (rate) {
                let finalAmount = amountVal * rate;
          
                msg.innerText = `${amountVal} ${fromCode} => ${finalAmount} ${toCode}`;
            } else {
                msg.innerText = `Conversion rate for ${toCode} not found.`;
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            msg.innerText = 'Error fetching exchange rate.';
        }


        inputAmount.disabled = false;
        fromCurr.disabled = false;
        toCurr.disabled = false;
        genbtn.disabled = false;
        genbtn.style.backgroundColor="#ef476f"
        inputAmount.value="";
    },1000)

};

  genbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchange();
  });
  
  window.addEventListener("load", () => {
    getExchange;
  });