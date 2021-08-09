import  {parse, stringify}  from 'roman-numerals';

const convert =()=>{
    try {
        console.log(parse('XXXIIII'))
        console.log(stringify(3999))
    }catch (error){
        console.log(error.message)
    }
   
    
    
    console.log(parse('XXX'))
}
convert()