import { Link } from "react-router-dom";

export const Paginator = ({url, paginator}) => {
     
    return(
          <>
            {paginator?.totalPages == 1 ||
                <ul className="pagination">
                   
                    <li className={paginator.first ? 'page-item disabled' : 'page-item'}>
                            <Link className="page-link" to={`${url}/0`}>first</Link>   
                    </li>

                    {paginator.number == 0 ||
                        <li className="page-item">
                            <Link className="page-link" to={`${url}/${paginator.number -1}`}>previous</Link>   
                        </li>
                    }              
                    
                    {paginator.number >= paginator.totalPages - 1 ||
                        
                        <li className="page-item">
                            <Link className="page-link" to={`${url}/${paginator.number +1}`}>next</Link>   
                        </li>
                            
                    } 

                    <li className={paginator.last ? 'page-item disabled' : 'page-item'}>
                            <Link className="page-link" to={`${url}/${paginator.totalPages -1}`}>last</Link>   
                    </li>

                </ul>

            }
          </>  
    )
}