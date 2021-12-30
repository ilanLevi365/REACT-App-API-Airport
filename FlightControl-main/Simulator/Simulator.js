//מיקום של הסרבר
const url = "http://localhost:5000/flight"

//מערך מספרים ושמות של חברות הטיסות
const flightNumbers = ["113", "456", "6780", "3456", "7569", "111", "777", "345", "435", "999", "223", "678", "2345"];
const flightBrands = ["XM", "EL", "AR", "KL", "TG", "FF", "ER", "ZZ", "GH", "TY", "LZ", "LT", "PO", "TQ", "GY", "GQ"];

//פונקציה להוצאה מספר רנדומלי
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//פונקצייה ליצירת פרטי טיסה: מספר ושם טיסה, המראה או לא, נחיתת קריטית או לא
function createFlight() {
    //מספר ושם טיסה
    const number = flightNumbers[getRndInteger(0, flightNumbers.length)];
    const brand = flightBrands[getRndInteger(0, flightBrands.length)];
    //המראה או לא
    const isDeparture = getRndInteger(0, 2) == 1;
    let isCritical;
    // קריטית או לא
    if (!isDeparture) {
        // isCritical = getRndInteger(0, 10) == 0;
    }
    else {
        isCritical = false;
    }
    return { brand, number, isCritical, isDeparture };
}
//פונקציה הפועלת ללא הפסקה כל 2 שניות
setInterval(async () => {
    //שליחת הטיסות לסרבר כל 2 שניות מייצרת טיסה חדשה ושולחת
    fetch(url, {
        //למתודה פוסט שיש שם
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createFlight())
    });
}, 2000);


