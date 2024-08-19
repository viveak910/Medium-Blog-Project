
import { Auth } from '../components/Auth';
import { Quote } from '../components/Quote';


export const Signin = () => {
    return <div className="grid grid-cols-2">
            <Auth type = "signin"/>
        <div className="invisible md:visible">
            <Quote/>
            </div>
        </div>
};
