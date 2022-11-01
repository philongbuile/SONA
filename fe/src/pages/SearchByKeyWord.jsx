import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
 
import Navbar from '../components/Navbar'

const SearchByKeyWord = () => {
    const [keywords, setKeywords] = useState('[]');
    const [cards, setCards] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/medinfo/query_by_keyword/')
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
    }, [keywords]);

    return(
        <div className=''>
            <Navbar/>
            {cards && <section className='py-4 container'>
                <div className='row justify-content-center'> 
                    <div className='col-12 mb-5'>
                        <div className='mb-3 col-4 mx-auto text-center'>
                        <form class="form-inline">
                                
                                <div class="form-group mx-sm-3 mb-2">
                                    <label class="sr-only">Query By Keywords</label>
                                    <input class="form-control" id="search-box" placeholder="ex: cancer, diabete"/>
                                </div>
                               
                                <button type='button' class="btn btn-primary mb-2" onClick={ () => {
                                    console.log('button clicked');
                                    let kw_str = document.getElementById("search-box").value;
                                    kw_str = kw_str.trim();
                                    kw_str = kw_str.replace(/ +/g, "");
                                    let kw = kw_str.split(',');
                                    setKeywords(JSON.stringify(kw));
                                    console.log(kw);

                                }}>Search</button>
                        </form>
                            
                        </div>
                    </div>

                    {cards.response.filter((res) => {
                        if(filter === ''){
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
                                    <div className='card-body' key={item.ID}>
                                        <Link to={`/record/query/${item.ID}`}>
                                        <h5 className='card-title'>{item.ID}</h5>
                                            <div className='panel-body'>
                                                {/* <p className ='card-text'>{item.docType}</p>                                     */}
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