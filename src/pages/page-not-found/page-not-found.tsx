import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function PageNotFound (): JSX.Element{
  return(
    <div className="page page--gray">
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <Header />

      <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px'}}>
        <p><b>404. Not Found</b></p>
        <Link to ="/" style={{textDecoration: 'underline'}}> Go to main page</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
