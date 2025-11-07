
import { useState } from "react";
import movieData from "./MovieData.json";
import { useParams } from "react-router-dom";
export const MovieDetails=()=>{

const {id}=useParams();
console.log(id);
   

 return(
    <>
    <h1>Hii</h1>




    </>



 )



}