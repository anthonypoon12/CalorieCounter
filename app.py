from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
import sys
from datetime import timedelta
app=Flask(__name__)
app.secret_key= "Hello"
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:rock121212@localhost/login'#plug in ur real password and create a database w the name login
app.permanent_session_lifetime = timedelta(minutes=30)
db=SQLAlchemy(app)
class Data(db.Model):
    __tablename__="data"
    id=db.Column(db.Integer,primary_key=True)
    email_=db.Column(db.String(120),unique=True)
    password_=db.Column(db.String(120))

    def __init__(self, email_, password_):
        self.email_=email_
        self.password_=password_
@app.route("/")
def login():
    return render_template("login.html")

@app.route("/register")
def register():
    # print (, file=sys.stderr)
    return render_template("register.html")

@app.route("/registering",methods=['POST','GET'])#register
def registering():
    if request.method=='POST':
        email=request.form["email"]
        password=request.form["password"]
        found_user = Data.query.filter_by(email_=email).first()
        if found_user:
            flash("That username has already been chosen!", "info")
            return render_template("register.html")
        else:
            session["email"] = email
            session.permanent = True
            data=Data(email,password)
            db.session.add(data)
            db.session.commit()
            print(request.form)
            flash("Welcome!", "info")
            return redirect(url_for("user"))
    else:
        if "email" in session:
            flash("Welcome Back!", "info")
            return redirect(url_for("user"))
        return render_template("login.html")
@app.route("/loggingin",methods=['POST','GET'])#register
def loggingin():
    if request.method=='POST':
        email=request.form["email"]
        password=request.form["password"]
        found_user = Data.query.filter_by(email_=email, password_=password).first()
        if found_user:
            session["email"] = email
            session.permanent = True
            print(request.form)
            flash("Welcome!", "info")
            return redirect(url_for("user"))
        else:
            flash("Wrong log in!", "info")
            return render_template("login.html")
    else:
        if "email" in session:
            flash("Welcome Back!", "info")
            return redirect(url_for("user"))
        return render_template("login.html")

@app.route("/user")
def user():
    if "email" in session:
        email = session["email"]
        return render_template("Project5.html")
    else: #this means that no one has logged in yet
        return redirect(url_for("login"))

@app.route("/logout")
def logout():
    if "email" in session:
        email = session["email"]
        flash("You have been logged out!", "info")
        session.pop("email", None)
    return redirect(url_for("login"))
if __name__ == '__main__':
    app.debug=True
    app.run()
