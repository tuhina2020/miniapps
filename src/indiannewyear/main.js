import Container from "./container";
import "@/style/main.css"
import configureStore from './store/configureStore'
const store = configureStore();
new Container({ store });