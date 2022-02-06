from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:"password"@localhost/login'#plug in ur real password and create a database w the name login
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
    return render_template("register.html")

@app.route("/Project5",methods=['POST','GET'])
def Project5():
    if request.method=='POST':
        email=request.form["email"]
        password=request.form["password"]
        print(request.form)
        data=Data(email,password)
        db.session.add(data)
        db.session.commit()
    return render_template("Project5.html")
if __name__ == '__main__':
    app.debug=True
    app.run()
