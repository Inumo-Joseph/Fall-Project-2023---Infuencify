import { Auth } from "../Auth";
import '../tailwind.css'
import HeaderTrainer from "../components/Header-Trainer";

function Login(){
    return(
        <div className="bg-purple">
            <Auth />
        </div>
    );
}

export default Login;