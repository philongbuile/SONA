let cards = 
{
    "cardData": [
        {
            "id":1,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :2,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :3,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :4,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :5,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :6,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :7,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        },
        {
            "id" :8,
            "img": "../cover.jpg",
            "title": "Pic 1",
            "testResult": "Test Result", 
            "diagnosis": "Diagnosis",
            "treatment": "Treatment"
        }
    ]
}

   
let dataSearch = cards.cardData.filter((item) => {
    return Object.keys(item).some(key => 
    item[key].toString().toLowerCase().includes(cards.cardData.toString().toLowerCase())
    )
})

console.log(cards.cardData.filter())