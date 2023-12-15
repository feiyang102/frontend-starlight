class AnimalDog {
    public name = "旺财";
    sayHello() {
        console.log("汪汪汪");
    }
}

class AnimalCat {
    public name = "咪咪";
    sayHello() {
        console.log("喵喵喵");
    }
}

class AnimalCow {
    public name = "小奶牛";
    sayHello() {
        console.log("哞哞！");
    }
}

function AnimalFactory(type) {
    switch (type) {
        case "dog":
            return new AnimalCat();
        case "cat":
            return new AnimalCat();
        case "pig":
            return new AnimalCat();
        default: throw "找不到！";
    }
}

export AnimalFactory;