import React, { useState, useEffect } from 'react'
import {list} from './api';
import Fiche from './Fiche';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';

const SearchResults = () => {

    let searchedWord = useLocation().search.substr(1)

    const [data, setData] = useState({
        results: [],
        search: useLocation().search.substr(1),
        searched: false
    })
    const {results, search, searched} = data
    console.log('dataopp', data)

    useEffect(()=> {
        console.log('yo', searchedWord)
        setData({...data, search: searchedWord})
        searchData()
    }, [searchedWord])


    const searchData = () => {
        console.log('search', search)
        if (search) {
            list({search: searchedWord || undefined})
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    setData({search: searchedWord, results: res, searched: true})
                }
            })
        }
    }

    return (
        <div>
            <Menu/>
            <div className="row col-12 mt-5  justify-content-center">
                <div className="col-10 ml-4">
                    <h2 className="mt-4 mb-4">
                        {
                            (searched && results.length === 1) ?
                            (`Trouvé ${results.length} résultat pour "${search}"`) : (
                                (searched && results.length > 1) ?
                                (`Trouvé ${results.length} résultats pour "${search}"`) :
                                (`Aucun résultat trouvé pour "${search}"`)
                            )
                        }
                    </h2>
                    <div className="row">
                        {
                            (results.length > 0) ? (
                                results.map((product, index) => (
                                    <div key={index} className="col-md-4 col-sm-10 mb-3">
                                        <Fiche product={product} />
                                    </div>
                                ))
                            ) : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults
