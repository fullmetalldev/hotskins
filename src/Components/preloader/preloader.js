import React from 'react';
import "./preloader.css";

const Preloader = ({bye}) => {
    return (

        <div className={bye ? "preloader preend" : "preloader"}>

            <svg className="circlePreload" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14 15C13.4477 15 13 15.4477 13 16C13 16.5523 13.4477 17 14 17V15ZM19 16H20C20 15.4477 19.5523 15 19 15V16ZM18 21C18 21.5523 18.4477 22 19 22C19.5523 22 20 21.5523 20 21H18ZM14 17H19V15H14V17ZM18 16V21H20V16H18Z"
                    fill="white"/>
                <path
                    d="M4.58253 14.9968C5.14322 16.3846 6.08197 17.5872 7.29208 18.468C8.50219 19.3488 9.93513 19.8725 11.428 19.9795C12.9209 20.0865 14.4139 19.7726 15.7373 19.0734C17.0606 18.3742 18.1613 17.3177 18.9142 16.0241"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M10 9C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7V9ZM5 8H4C4 8.55228 4.44772 9 5 9V8ZM6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3H6ZM10 7H5V9H10V7ZM6 8V3H4V8H6Z"
                    fill="white"/>
                <path
                    d="M19.4176 9.00315C18.8569 7.61541 17.9182 6.41278 16.7081 5.53197C15.498 4.65116 14.065 4.12749 12.5721 4.02048C11.0792 3.91346 9.58624 4.2274 8.26287 4.92661C6.9395 5.62582 5.83882 6.68226 5.08594 7.97584"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>


        </div>
    );
};

export default Preloader;