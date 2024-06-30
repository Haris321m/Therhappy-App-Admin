
import axios from "axios";


async function getSubscriptions(){
    const response=await axios.get("http://localhost:5000/api/subscription");
    console.log(response.data);
    const getSubscriptions=response.data;
}

export default getSubscriptions;

