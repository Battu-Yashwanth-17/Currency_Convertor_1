const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");

//adding optiosn to seleect 
// for(let select of dropdowns){
    //     for(currCode in countryList){
        //          let newOption=document.createElement("option");
        //          newOption.innerText=currCode;
        //          newOption.value=currCode;
        //          select.append(newOption);
        //     }
        // }
        const fromCurr=document.querySelector(".from select");
        const toCurr=document.querySelector(".to select");
        const msg=document.querySelector(".msg");


        for(let select of dropdowns){ //here we add all country codes to option element
             for(currCode in countryList){
                let newOption=document.createElement("option");
                newOption.innerText=currCode;
                newOption.value=currCode;
                if(select.name==="from" && currCode==="USD"){
                    newOption.selected="selected";
            }
         else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
         }
         select.append(newOption);//this element will be added select element
    }
    select.addEventListener("change",(evt)=>{//on changing the country code the country icon, country code will be updated in the page
        updateFlag(evt.target);
    })
} 
window.addEventListener("load",()=>{
    updateExchangeRate();
})
const updateFlag=(ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let image=ele.parentElement.querySelector("img");//as the parent node of element is image tag , so we change the flag according to country code
    image.src=newSrc;
}
const btn=document.querySelector("form button");
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtValue=amount.value;
    if(amtValue<1 || amtValue==="") {
        amtValue=1;
        amount.value="1";
    }
    //console.log(fromCurr,toCurr);
    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response=  await fetch(url);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];//if we want to print only rate
    let finalAmount=amtValue*rate;
    msg.innerText=`${amtValue}${fromCurr.value}=${finalAmount}${toCurr.value}`;
    console.log(rate);
}


