import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const SearchByKeyWord = () => {
    const [filter, setFilter] = useState('');
    const [cards, setCards] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/record/getall')
            .then(res => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setCards(data);
            })
            .catch(error => {
                return error;
            });
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

                    {cards.response.filter((res) => {
                        if(filter == ''){
                            return res
                        }else if(res.OperatorName.toLowerCase().includes(filter.toLowerCase()) || 
                                    res.Record_ID.toLowerCase().includes(filter.toLowerCase())){
                            return res
                        }
                    }).map((item, index) => {
                        return(
                            <div className='col-12 col-md-6 col-lg-3 mx-0 mb-4' >
                                {<div className='card p-0 overflow-hidden h-100 shadow'>
                                    {/* <img src={item.img} alt="" className='card-img-top img-fluid'/> */}
                                    <div className='card-body' key={item.MedicalInfo_ID}>
                                        <Link to={`/record/query/${item.MedicalInfo_ID}`}>
                                        <h5 className='card-title'>{item.MedicalInfo_ID}</h5>
                                            <div className='panel-body'>
                                                <p className ='card-text'>{item.OperatorName}</p>
                                                <p className ='card-text'>{item.Operation}</p>
                                                <p className ='card-text'>{item.Roles}</p>
                                                <p className ='card-text'>{item.Record_ID}</p>
                                                <p className ='card-text'>{item.Times}</p>
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