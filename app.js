

class faction{
    constructor(name,strength,growth,neighbour){
        this.name = name;
        this.strength = strength;
        this.growth = growth;
        this.neighbour = neighbour;
    }
}

function totalwar(fac1,fac2){
    return new Promise((res,rej)=>{
        let vic = fac2, growth = 0;
        while(fac1.strength && fac2.strength){//just playing with the async feature
            fac1.strength--;
            fac2.strength--;
            growth++;
        }
        //can be optimized to just take growth as min(fac1.strength,fac2.strength)
        //optimization: vic assigned to the max(fac1,fac2)
        if(fac1.strength>0){
            vic=fac1;
        }
        vic.growth+=growth*2;
        res(vic.name + " is victorious");
    })
}



var rome = new faction("Rome",120,50,[]);
            
var macedon = new faction("Macedon", 70, 20, []);

console.log(rome,macedon);

totalwar(rome,macedon).then((msg)=>{console.log(msg);})

console.log(rome,macedon);
