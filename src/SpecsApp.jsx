import { useState } from "react";
import SpecsList from "./components/SpecsList";
// import SpecInfo from "./components/SpecInfo";
// import SpecsKpi from "./components/SpecsKpi";



function SpecsApp(){
    let [page,setPage] = useState('SpecsList');
    return(
        <div>
            {page === 'SpecsList' && <SpecsList page={setPage}/>} 
            {/* {page === 'SpecsInfo' && <SpecInfo page={setPage}/>}  */}
            {/* {page === 'SpecsKpi' && <SpecsKpi page={setPage}/>}  */}
        </div>
    )

}
export default SpecsApp;
