
// personal details DOM 
const fname = document.getElementById("fName");
const username = document.getElementById("userName");
const gmail = document.getElementById("gmail");
const address = document.getElementById("address");
const idNum = document.getElementById("idCard");
const phone = document.getElementById("phoneNum");
const promo = document.getElementById("promoCode");

//room details DOM
const adult = document.getElementById("adultsRoom");
const infant = document.getElementById("infantsRoom");
const kid = document.getElementById("kidsRoom");
const single = document.getElementById("singleRoom");
const double = document.getElementById("doubleRoom");
const thriple = document.getElementById("thripleRoom");
const extraB = document.getElementById("extraBed");

var checkIn = Date(document.getElementById("checkIn"));
var checkOut = Date(document.getElementById("checkOut"));
const loyalBtn = document.getElementById("loyalityBtn");
const roomBookBtn = document.getElementById("book_nowBtn");

const roomTxt = document.getElementById("roomsOutput");
const overallTxt = document.getElementById("overallOutput");
const loyalTxt = document.getElementById("loyalOutput");

// special reqs DOM
const pool= document.getElementById("pool");
const garden = document.getElementById("garden");
const wifi = document.getElementById("wifi");
const specialReq = document.getElementById("specialReq");

// add to fav rooms
const favBtnR = document.getElementById("favBtnR");


//adventure bookings DOM

const localAdult = document.getElementById("localAdult");
const foreignAdult = document.getElementById("foreignAdult");
const localKid = document.getElementById("localKid");
const foreignKid = document.getElementById("foreignKid");
const timeAdv = document.getElementById("hours");
const overallAdv = document.getElementById("overallAdv");

//guide adventure DOM

var adultRadio = document.getElementById("adultG");
var kidRadio = document.getElementById("kidG");
var adultKidRadio = document.getElementById("adultKidG");




//adventure types DOM
const advType = document.getElementById("advType");

//adventure book and adventure output DOM

const advBook = document.getElementById("advBtn");
const advTxt = document.getElementById("advOutput");

//add to fav and final bill output DOM

const favBtnA= document.getElementById("favBtnA");

const final = document.getElementById("outputFinal");

// book now button event listener assigned to click function

roomBookBtn.addEventListener("click",bookNow);

// prices of single,double, thriple and extra beds put into constants [easy to use everywhere]

const singleRoom = 25000;
const DoubleRoom  = 35000;
const thripleRoom = 40000;
const extraBed = 8000;


// variables needed in calculations intialised 
let totalRooms = 0;
let roomCost = 0;
let totalBook = 0;
let totalAdven = 0;

function bookNow (){

    // extracting values from inputs
    let totalRooms = 0;
    let roomCost = 0;
    let singleR = parseInt(single.value) |0;
    let doubleR = parseInt(double.value) |0;
    let thripleR = parseInt(thriple.value) |0;
    let extra = parseInt(extraB.value) |0;


    let fullname = (fname.value);
    let nick = (username.value);
    let Gmail = (gmail.value);
    let add = (address.value);
    let idnum = (idNum.value);
    let tel = (phone.value);


    if (fullname === "" || nick === "" || Gmail === "" || add === "" || idnum === "" || tel === "") {
        alert("Please make sure to fill all the Personal Details");
        return;
    }
    

    let adults = (adult.value) |0;
    let infants = (infant.value) |0;
    let kids = (kid.value) |0;

    let meal = 0;

    meal = kids *5000;
    let specialReqs = (specialReq.value);

    // getting the dates from the date fields

    var checkIn = new Date(document.getElementById("checkIn").value);
    var checkOut = new Date(document.getElementById("checkOut").value);

     if (adults == ""){
         alert("Please enter number of Adults");
         return;
     }


    //  if (checkIn  == "") {
    //      alert("Please Fill in check-In");
    //      return;
    //  }

    //  if (checkOut == "") {
    //     alert("Please Fill in check-Out");
    //     return;
    // }


    //checking if checkout date is smaller than the check in date and if so displaying an alert.

    if (checkOut <= checkIn) {
        alert("Check-out date must be greater than the check-in date.");
        return;
    }

    //calculating the time difference and duration [hours *mins * seconds * miliseconds]

    const timeDifference = checkOut - checkIn;
    const duration = timeDifference / (1000 * 60 * 60 * 24);



    totalRooms = singleR + doubleR + thripleR;
    roomCost = (singleR * singleRoom + doubleR*DoubleRoom + thripleR*thripleRoom +extra*extraBed+meal)*duration;

    roomTxt.innerText =`${singleR} Single Room(s),  ${doubleR} Double Room(s),  ${thripleR} Thriple Room(s) \n Special Requirements : ${specialReqs} \n Cost : ${roomCost.toFixed(2)} LKR  (${duration} days)`;
      
    overallBill(roomCost, singleR, doubleR, thripleR, roomCost,duration, adults,infants,kids,extra);


    

}


function overallBill(roomCost, singleR, doubleR, thripleR, roomCost,duration,extra,kids,infants,adults){

    let specialReqs = (specialReq.value);
    let fullname = (fname.value);
    let nick = (username.value);
    let Gmail = (gmail.value);
    let add = (address.value);
    let idnum = (idNum.value);
    let tel = (phone.value);
    let promoC = (promo.value);

    var checkIn = new Date(document.getElementById("checkIn").value);
    var checkOut = new Date(document.getElementById("checkOut").value);


    //overallTxt.innerText += `You have ordered this many rooms : ${totalRooms} \n Your price of the rooms are : ${roomCost.toFixed(2)} during your stay of  ${duration} days`;
    overallTxt.innerText +=`${adults} Adults, ${infants} Infants, ${kids} Kids \n Check-In : ${checkIn} \n Check-Out : ${checkOut} \n ${singleR} Single Room(s),  ${doubleR} Double Room(s),  ${thripleR} Thriple Room(s) \n ${extra} Extra Beds \n Special Requirements : ${specialReqs} \n Cost : ${roomCost.toFixed(2)} LKR  (${duration} days) \n \n \n`;
    

    totalBook += roomCost;
    disc=0;


    //checking if the entered promo code is equal to the code which gives a discount, if so giving a 5% discount.
    if (promoC=="Promo123") {

        disc = totalBook - (0.05*totalBook);
        discounted ="Your promo code got you a discount of 5%!";

    }

    else {
        discounted = "No Discount are available for your entered promo code :("
    }

    // outputting the full name and other info in the total bill if the user only orders a room and not any adventure.
    final.innerText = `Name : ${fullname} \n Nickname : ${nick} \n Gmail : ${Gmail} \n 
    Home Address : ${add} \n ID/NIC : ${idnum} \n Contact No : ${tel}  \n \n ${overallTxt.innerText} \n \n Total Cost of Room Bookings : ${totalBook.toFixed(2)} LKR \n ${discounted} \n \n Your Discounted Price is :${disc.toFixed(2)} LKR \n `;


}

function checkLoyality() {

    let loyalPoints=0;
    
    let totalRooms = 0;
    

    let singleR = parseInt(single.value) |0;
    let doubleR = parseInt(double.value) |0;
    let thripleR = parseInt(thriple.value) |0;
    


    totalRooms = singleR + doubleR + thripleR;

   //checking if the total room is greater than 3, if so giving 20 loyal points per room booked. 
    if (totalRooms>3) {
        loyalPoints = totalRooms * 20;
        loyalTxt.textContent = `You have been awarded : ${loyalPoints} points!`;

    }

    else {
        loyalTxt.textContent = `Order more than 3 rooms for 20 loyality points per room! `;
    }

    let loyal_serial = JSON.stringify(loyalPoints);

    

    localStorage.setItem("Loyality Points", loyal_serial);
    


}

loyalBtn.addEventListener("click",checkLoyality);

advBook.addEventListener("click", adventureBook);

// constants for the prices of adults and kids 
const advLAdult = 5000;
const advFAdult = 10000;
const advLKid = 2000;
const advFKid = 5000;
let advCost =0;
let advenType;
let guideType;

function adventureBook (){

    
    let advCost = 0;
    
    let numLAdult = parseInt(localAdult.value) |0;
    let numFAdult = parseInt(foreignAdult.value) |0;
    let numLKid = parseInt(localKid.value) |0;
    let numFKid = parseInt(foreignKid.value) |0;
    let hour = parseInt(timeAdv.value) |0;

    let advenType = (advType.value);
    advCost = numLAdult*advLAdult + numFAdult*advFAdult + numFKid*advFKid + numLKid*advLKid;



    if (hour==0) {
        alert("Please enter the number of hours");
        return;
    }

    // checks which radio button is clicked and assigned a message for the guide type to display which is needed.
    if (adultRadio.checked) {
        advCost+=1000;
        guideType = "Guide for Adults Required"
    } else if (kidRadio.checked) {
        advCost+=500;
        guideType = "Guide for Kids Required"

    } else if (adultKidRadio.checked) {
        advCost+=1500;
        guideType = "Guide for Adults & Kids Required"

    }

    else {
        advCost+=0;
        guideType = "No Guides Required"
    }

    let LA = (localAdult.value) |0;
    let LK = (localKid.value) |0;
    let FA = (foreignAdult.value) |0;
    let FK = (foreignKid.value) |0;

    advCost = advCost * hour;

    advTxt.innerText = `Type of Adventure : ${advenType} \n Total Cost of Adventure :  ${advCost.toFixed(2)} LKR  (${hour} Hrs) \n ${guideType}`;

    alert(`Thank you for booking at Kingsman Hotels \n \n ${LA} Local Adults, ${LK} Local Kids, ${FA} Foreign Adults, ${FK} Foreign Kids \n Type of Adventure : ${advenType} \n Total Cost of Adventure :  ${advCost.toFixed(2)} LKR  (${hour} Hrs) \n ${guideType} \n\n`);



    overallAdven(advenType,advCost,hour,guideType,LA,LK,FA,FK);

    let fullname = (fname.value);
    let nick = (username.value);
    let Gmail = (gmail.value);
    let add = (address.value);
    let idnum = (idNum.value);
    let tel = (phone.value);
    let promoC = (promo.value);
    let adults = (adult.value);
    let infants = (infant.value);
    let kids = (kid.value);

    let totalRooms = 0;
    let roomCost = 0;
    
    let singleR = parseInt(single.value) |0;
    let doubleR = parseInt(double.value) |0;
    let thripleR = parseInt(thriple.value) |0;
    let extra = parseInt(extraB.value) |0;
    let specialReqs = (specialReq.value) |0;
    var checkIn = new Date(document.getElementById("checkIn").value);
    var checkOut = new Date(document.getElementById("checkOut").value);

    const timeDifference = checkOut - checkIn;
    const duration = timeDifference / (1000 * 60 * 60 * 24);


    let meal = 0;

    meal = kids *5000;

    totalRooms = singleR + doubleR + thripleR;
    roomCost = (singleR * singleRoom + doubleR*DoubleRoom + thripleR*thripleRoom +extra*extraBed+meal)*duration;

    totalCost = 0;
    reduced = 0;

    totalCost = totalAdven + totalBook;

    if (promoC=="Promo123") {

        reduced = totalCost - (0.05*totalCost);
        discounted ="Your promo code got you a discount of 5%!";

    }

    else {
        discounted = "No Discount are available for your entered promo code :("
    }

    

    final.innerText = `Name : ${fullname} \n Nickname : ${nick} \n Gmail : ${Gmail} \n 
    Home Address : ${add} \n ID/NIC : ${idnum} \n Contact No : ${tel} \n \n \n ${overallTxt.innerText} \n  Total Cost of Room Bookings : ${totalBook.toFixed(2)} LKR \n \n \n
     ${overallAdv.innerText} \n \n Total Cost of Adventure Bookings : ${totalAdven.toFixed(2)} LKR  \n \n \n TOTAL COST : ${totalCost.toFixed(2)} LKR \n ${discounted} \n \n Your discounted total price is ${reduced.toFixed(2)} LKR ` ; 
     
     
    
}


function overallAdven(advenType,advCost,hour,guideType,LA,LK,FA,FK) {

    overallAdv.innerText += `${LA} Local Adults, ${LK} Local Kids, ${FA} Foreign Adults, ${FK} Foreign Kids \n Type of Adventure : ${advenType} \n Total Cost of Adventure :  ${advCost.toFixed(2)} LKR  (${hour} Hrs) \n ${guideType} \n\n`;
    totalAdven += advCost;

}

favBtnR.addEventListener("click",addFav) 

function addFav () {

    let totalRooms = 0;
    let roomCost = 0;
    let singleR = parseInt(single.value) |0;
    let doubleR = parseInt(double.value) |0;
    let thripleR = parseInt(thriple.value) |0;
    let extra = parseInt(extraB.value) |0;

    let adults = (adult.value) |0;
    let infants = (infant.value) |0;
    let kids = (kid.value) |0;
    let specialReqs = (specialReq.value);

    let fullname = (fname.value);
    let nick = (username.value);
    let Gmail = (gmail.value);
    let add = (address.value);
    let idnum = (idNum.value);
    let tel = (phone.value);
    let promoC = (promo.value);

    totalBook += roomCost;


    var checkIn = new Date(document.getElementById("checkIn").value);
    var checkOut = new Date(document.getElementById("checkOut").value);

    if (checkOut <= checkIn) {
        alert("Check-out date must be greater than the check-in date.");
        return;
    }

    const timeDifference = checkOut - checkIn;
    const duration = timeDifference / (1000 * 60 * 60 * 24);


    let meal = 0;

    meal = kids *5000;



    totalRooms = singleR + doubleR + thripleR;
    roomCost = (singleR * singleRoom + doubleR*DoubleRoom + thripleR*thripleRoom +extra*extraBed+meal)*duration;


    

    //console.log("hello this button is working");

    //numbers put so it will be displayed in order, since the local storage display items in alphabetical order which is not the right order to be displayed in this matter

    let room = {

        "1. Full Name" : fullname,
        "2. Nickname" : nick,
        "3. Gmail" : Gmail,
        "4. Home Address" : add,
        "5. ID/NIC" : idnum,
        "6. Telephone" : tel,
        "7. Promo Code" : promoC,
        "8. check-In" : checkIn,
        "9. check-Out" : checkOut,
        "10. Adults" : adults,
        "11. Infants" : infants,
        "12. Children" : kids,

        "13. Single Rooms" : singleR,
        "14. Double Rooms" : doubleR,
        "15. Triple Rooms" : thripleR,
        "16. Extra Beds"   : extra,
        
        "17. Special_Requirmenets" : specialReqs,

        "18. Total Cost of Rooms" : roomCost

    }

    // makes the data into strings for displaying
    let room_serial = JSON.stringify(room);

    //sets the items into local storage giving the key name as  Room

    localStorage.setItem("Room", room_serial);


}

favBtnA.addEventListener("click",addFavA)


function addFavA () {



    const advLAdult = 5000;
    const advFAdult = 10000;
    const advLKid = 2000;
    const advFKid = 5000;
    
    
    let guideType;
    
    let advCost = 0;
    
    let numLAdult = parseInt(localAdult.value) |0;
    let numFAdult = parseInt(foreignAdult.value) |0;
    let numLKid = parseInt(localKid.value) |0;
    let numFKid = parseInt(foreignKid.value) |0;
    let hour = parseInt(timeAdv.value) |0;

    let advenType = (advType.value);
    advCost = numLAdult*advLAdult + numFAdult*advFAdult + numFKid*advFKid + numLKid*advLKid;


    if (adultRadio.checked) {
        advCost+=1000;
        guideType = "Guide for Adults Required"
    } else if (kidRadio.checked) {
        advCost+=500;
        guideType = "Guide for Kids Required"

    } else if (adultKidRadio.checked) {
        advCost+=1500;
        guideType = "Guide for Adults & Kids Required"

    } 
    
    else {
        advCost+=0;
        guideType = "No Guides Required"
    }

    advCost = advCost * hour;

    //advTxt.innerText = `Type of Adventure : ${advenType} \n Total Cost of Adventure :  ${advCost.toFixed(2)} LKR  (${hour} Hrs) \n ${guideType}`;


    let LA = parseInt(localAdult.value);
    let LK = parseInt(localKid.value);
    let FA = parseInt(foreignAdult.value);
    let FK = parseInt(foreignKid.value);



    let adventure = {

        "1. Adventure_Type": advenType,
        "2. Local Adults" : LA,
        "3. Local Kids" : LK,
        "4. Foreign Adults" : FA,
        "5. Foreign Kids" : FK,
        "6. Guide" : guideType,
        "7. Hours" : hour,
        "8. Total Cost of Adventure" : advCost,


    }

  

    let adventure_serial = JSON.stringify(adventure);

    

    localStorage.setItem("Adventure", adventure_serial);



}

// 2 functions to show the menu and hide the menu in mobile views

var navLinks = document.getElementById("navLinks");
    
            function showMenu() {
                navLinks.style.right = "0";
            }
    
            function hideMenu(){
                navLinks.style.right="-200px";
            }






























