import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
 
const SearchByKeyWord = () => {
    const [filter, setFilter] = useState('');
    const [cards, setCards] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/cardData')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setCards(data);
            })
    }, []);


    return(
        <div className=''>
            {cards && <section className='py-4 container'>
                <div className='row justify-content-center'> 
                    <div className='col-12 mb-5'>
                        <div className='mb-3 col-4 mx-auto text-center'>
                            <label className='form-lable h4'>Search:&nbsp;&nbsp;</label>
                            <input type="text" className='from-control'
                                onChange={(event) => {
                                    setFilter(event.target.value);
                                }}
                            />
                           
                        </div>
                    </div>

                    {(cards.cardData?.filter((res) => {
                        if(filter === ''){
                            return res
                        }else if(res.title.toLowerCase().includes(filter.toLowerCase())){
                            return res
                        }
                    }) || cards.cardData)?.map((item, index) => {
                        return(
                            <div className='col-12 col-md-6 col-lg-3 mx-0 mb-4' >
                                {<div className='card p-0 overflow-hidden h-100 shadow'>
                                    <img src={item.img} alt="" className='card-img-top img-fluid'/>
                                    <div className='card-body' key={item.id}>
                                        <Link to={`/case/${item.id}`}>
                                        <h5 className='card-title'>{item.title}</h5>
                                            <div className='panel-body'>
                                                <p className ='card-text'>{item.testResult}</p>
                                                <p className ='card-text'>{item.diagnosis}</p>
                                                <p className ='card-text'>{item.treatment}</p>
                                            </div>
                                        </Link>
                                        <button type='button' className='btn btn-primary'> Ask for Authorization</button>
                                    </div>
                                </div>
                                }

                            </div>
                        )
                    })}
                </div>
            </section>}
        </div>
    )
}

export default SearchByKeyWord;