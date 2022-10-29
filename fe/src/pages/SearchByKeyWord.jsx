import Navbar from '../components/navbar.jsx';
import data from '../assets/data/data';
import React, {useState} from 'react';
 
const SearchByKeyWord = () => {
    const [filter, setFilter] = useState('');
    const searchText = (event) => {
        setFilter(event.target.value);
    }
    // console.warn(filter)
    let dataSearch = data.cardData.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })

    return(
        <div className=''>
            <Navbar/>
            <section className='py-4 container'>
                <div className='row justify-content-center'> 
                    <div className='col-12 mb-5'>
                        <div className='mb-3 col-4 mx-auto text-center'>
                            <label className='form-lable h4'>Search:&nbsp;&nbsp;</label>
                            <input type="text" className='from-control'
                                value={filter}
                                onChange={searchText.bind(this)}
                            />
                           
                        </div>
                    </div>

                    {dataSearch.map((item, index) => {
                        return(
                            <div className='col-12 col-md-6 col-lg-3 mx-0 mb-4'>
                                <div className='card p-0 overflow-hidden h-100 shadow'>
                                    <img src={item.img} alt="" className='card-img-top img-fluid'/>
                                    <div className='card-body'>
                                    <h5 className='card-title'>{item.title}</h5>
                                        <div className='panel-body'>

                                            <p className ='card-text'>{item.testResult}</p>
                                            <p className ='card-text'>{item.diagnosis}</p>
                                            <p className ='card-text'>{item.treatment}</p>
                                        </div>
                                        <br></br>
                                        <button type='button' className='btn btn-primary'> Ask for Authorization</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default SearchByKeyWord;