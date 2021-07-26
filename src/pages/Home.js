import React from 'react'
import Card from '../components/Card'

const Home = ({ data }) => {

    if (data) {
        return (
            <main>
                <Card data={data}></Card>
            </main>
        )
    } else

        return (
            <main>

            </main>
        )
}

export default Home
