#+title: A Simple Web Server using nodejs
#+description: 

* git

#+begin_src emacs-lisp :results code
git init
cp ~/pnotes/git/.gitignore .
cp ~/pnotes/git/.gitconfig .
git add .
git status
git commit -m "A Simple Web Server using nodejs"
# git tag -a v1 -m "It works"
# git tag -l
# git tag -d v1
git tag -a v1-it-works -m "It works"
#+end_src

* npm init

#+begin_src emacs-lisp :results code
npm init -y
npm install express --save
#+end_src

* server.js

#+begin_src emacs-lisp :results code
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8080, '127.0.0.1')
#+end_src

* create a file to serve

#+file: ./public/node-running.html
#+begin_src emacs-lisp :results code
<html>
<body>
</bod>
<h1>Nodejs is up and running</h1>
<p>nice start!</p>
</html>
#+end_src

* run

node server.js


* check webpage 

http://127.0.0.1:8080/node-running.html
