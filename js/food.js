class Food{
    constructor(){
        this.image=loadImage("images/Milk.png");
        this.foodStock=0;
        this.lastFed=0;
    }
    getFedTime(time){
        this.lastFed=time;
    }
    updateFoodStock(data){
        this.foodStock=data;
    }
    deductFoodStock(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }

    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
 
        
        var x=10,y=450;
        if(this.foodStock!=0){
            for (var i=0;i<this.foodStock-1;i++){
                image (milkBottle,x,y,70,70)
                x+=40;
                if(x==730){
                    x=10;
                    y+=70
                }
            }
            image(milkBottle,mouseX,mouseY,170,170)
        }
        
        
    }
    bedroom(){
        background(roomImage)
    }
    garden(){
        background(gardenImage)
    }
    washroom(){
        background(wsImage)
    }
    park(){
        background(parkImage)
    }
}