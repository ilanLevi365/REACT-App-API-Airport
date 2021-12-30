//לג זה שלב
class Leg{
    constructor(number,capacity,crossingTime){
        //מספר שלב (השער)
        this.number = number;
        //כמה מטוסים יכולים להיות בו באותו הזמן
        this.capacity = capacity;
        //כמה זמן לוקח לעבור אותו
        this.crossingTime = crossingTime;
        //כמה מטוסים יש בו עכשיו בשטח הזה
        this.flights = [];
    }
}

module.exports = Leg;