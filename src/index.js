import Post from "./Post";
import json from "./assets/json.json";
import './styles/styles.css';

const post = new Post('Webpack post title')

console.log('Post to string:', post.toString())

console.log('JSON:', json)