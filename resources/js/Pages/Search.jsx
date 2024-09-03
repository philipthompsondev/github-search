import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react'

export default function Search(data) {
    const [values, setValues] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [page, setPage] = useState(0);
    const [followers, setFollowers] = useState( []);
    const [newSearch, setNewSearch] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);

    function change(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function submit(e) {
        e.preventDefault()
        router.post('/', values);

        setNewSearch(true);
        setShowFollowers(true);
    }

    function loadMoreClick() {
        setPage((prev) => prev + 1);
    }

    useEffect(() => {
        if( newSearch === true || page > 1 ) {
            getFollowers();
        }

        if (data.user !== undefined){
            if((page * 5) < data.user.followers){
                setShowLoadMore(true);
            } else {
                setShowLoadMore(false);
            }
        }

    }, [page, newSearch]);

    function getFollowers(){
        if(newSearch === true) {
            axios.post('/followers?page=1', values)
                .then(function (response) {
                    setFollowers(response.data)
                    setNewSearch(false);
                    setPage(1);
                })
                .catch(function (err) {
                    console.log('Error: ' + err);
                });
        } else {
            axios.post('/followers?page='+page, values)
                .then(function (response) {
                    setFollowers((prev) =>
                        [...prev, ...response.data]);
                })
                .catch(function (err) {
                    console.log('Error: ' + err);
                });
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="title">Github Username:</label>
                <input id="username" name="username" onChange={change} />

                <button type="submit">Search</button>
            </form>

            {showFollowers
                ?
                <div>
                    <h3>Results</h3>

                    { data.user ?
                        <div>
                            { data.user.login ?
                                <div>
                                    {/*<img src={data.user.avatar_url} alt=""></img>*/}
                                    <p>Username: {data.user.login}</p>
                                    <p>Followers: {data.user.followers}</p>

                                    { data.user.followers > 0
                                        ?
                                        <div>
                                            {followers.map((follower) =>
                                                <p key={follower.id}>{follower.login}</p>)}

                                            {showLoadMore ?
                                                <div className="load-more">
                                                    <button onClick={loadMoreClick} className="btn-grad">
                                                        Load more followers
                                                    </button>
                                                </div>
                                                :
                                                <div></div>
                                            }
                                        </div>
                                        :
                                        <p>No Followers</p>
                                    }
                                </div>
                                :
                                <p>User not found.</p>
                            }
                        </div>
                        :
                        'Searching'
                    }
                </div>
                :
                <div>Start searching!</div>
            }
        </div>
    )
}
