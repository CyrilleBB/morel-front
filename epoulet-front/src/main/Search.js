import React, {useState, useEffect} from 'react';
import {list} from './api';
import {useHistory} from 'react-router-dom'
import { IoIosSearch } from 'react-icons/io'

const Search = () => {
    const [data, setData] = useState({
        search: '',
        results: [],
        searched: false,
        finish: false
    })
    let hist = useHistory()

    const {search, results, searched, finish} = data;


    const searchSubmit = (e) => {
        e.preventDefault()
        if (search) {
            list({search: search || undefined})
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                } else {
                    console.log('res', res)
                    setData({...data, results: res, searched: true,  finish: true})
                    return  hist.push({
                        pathname: `/search`,
                        search: `${search}`,
                    })
                }
            })
        }
    }

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched: false});
    }

    return (
        <div className="row">
            <div className="container mb-3">
                <form onSubmit={searchSubmit} className="mt-3">
                    <div className="p-1 rounded border input-group rounded-pill shadow-sm">
                            <input type="search" className="form-control border-0" onChange={handleChange('search')} placeholder="Chercher un fromage" />
                            <div className="input-group-prepend">
                                <button type="submit" className="btn btn-link"><IoIosSearch/></button>
                            </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search;
