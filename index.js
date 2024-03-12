const express = require("express");
const app = express();
const port = 5005;
const bodyParser = require("body-parser");

const users = require("./data/users");
const posts = require("./data/posts");