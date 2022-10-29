var cat = {
    name: 'Gafield',
    display: function(){
        console.log(this.name); // 'this' points to cat
    }
};
cat.display(); // Saurabh

var name = "Tom";
var outerDisplay = cat.display;
outerDisplay(); // Bạn đoán xem kết quả là như thế nào?

var name1 = "Tom";
var outerDisplay1 = cat.display.bind(cat);
outerDisplay1(); // Bạn đoán xem kết quả là như thế nào?