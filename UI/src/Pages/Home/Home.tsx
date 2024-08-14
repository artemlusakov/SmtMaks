import React from 'react';
import Navigation from "../../Components/Navigation/Navigation";
import s from './Home.module.css'

const Home = () => {
    return (
        <div className={`${s.Home} ${'Flex'}`}>
            <Navigation/>

            <div className={s.Home__content}>
                <h1>Приветсвую вас на Web ресурсе для просмотра log файлов</h1>
            </div>
        </div>
    );
};

export default Home;