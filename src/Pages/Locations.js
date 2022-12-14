import React,{useState, useEffect} from 'react'
import Cards from '../comps/cards/Cards';
import InputGroup from '../comps/filters/Category/InputGroup';

const Location = () => {
    let [id, setId] = useState(1);
    let [info, setInfo] = useState([]);
    let [results, setResults] = useState([])
    let {name, type, dimension} = info
    let api = `https://rickandmortyapi.com/api/location/${id}`
    

    useEffect(()=>{
        (async function(){
            let data = await fetch(api).then(res=>res.json());
            setInfo(data);

            let a = await Promise.all(
                data.residents.map((x)=>{
                    return fetch(x).then((resp)=>resp.json())
                })
                );
                setResults(a)
        })()
    },[api])
    
    return (
        <div className='container'>
                <div className='row mb-4'>
                    <h1 className='text-center mb-4'>
                        Location : {""}
                        <span className='text-primary'>
                            {name ===""? "Unkown" : name}
                        </span>      
                    </h1>
                    <h5 className='text-center'>
                        {/* Air Date {air_date ===""? "Unkown" : air_date} */}
                        </h5>        
                </div> 

                <div className='row'>

                    <div className='col-3'> 
                        <h4 className='text-center mb-4'>Pick Episode</h4>
                        <InputGroup total = {51} name="Episode" setId={setId}/>
                    </div>

                    <div className='col-8'>
                        <div className='row'> 
                            <Cards results={results} />
                         </div>
                    </div>
                </div> 
        </div>
    )
}

export default Location
