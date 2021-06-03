const txtEmail = document.getElementById("Email")
const txtPassword = document.getElementById("password")
const txtName = document.getElementById("Name")
const txtST = document.getElementsByName("optRadio");
var  txtGrade;
function teacherClick(){
    document.getElementById("Grade1").innerHTML="<select name='qualification' id='qual'><option value='' disabled selected>Qualification</option><option value='PGT'>PGT</option><option value='TGT'>TGT</option></select><br><br>"+
    "<select name='subject' id='subject'><option value='' disabled selected>Subject</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option></select>"
    
}
function studentClick(){
    document.getElementById("Grade1").innerHTML="<input type='number' class='form-control' id='grade' min='06' max='12' placeholder='Grade'>";
    txtGrade=document.getElementById("grade")
}
document.getElementById("Register").addEventListener('click', e => {
    e.preventDefault();
    const email = txtEmail.value;
    const password = txtPassword.value;
    const name = txtName.value
    var ST
        if (document.getElementById("teacher").checked === false && document.getElementById("student").checked === false) {
            alert("Please enter all the fields ")
        } else {
            if (document.getElementById("teacher").checked === false) {
                ST = "student"
                const grade = txtGrade.value;
                const promise = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    e.preventDefault();
                    db.collection('users').doc(cred.user.uid).set({
                        Name: name,
                        Grade: grade,
                        studOrTeach: ST,
                        
                    }).then (()=>{ 
                        e.preventDefault();
                        if(confirm("You have been successfully registered")){
                        location.href="Login.html"
                    }});

                })
            promise.catch(e => {
                console.log(e.message)
                alert(e.message);
            })
            } else {
                ST = "teacher" 
                const qualification = document.getElementById("qual");
                const qualificationValue = qualification.value;
                const subject = document.getElementById("subject");
                const subjectValue = subject.value;
                console.log(txtEmail)
                const promise = firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    e.preventDefault();
                    
                    db.collection('users').doc(cred.user.uid).set({
                        Name: name,
                        Qualification:qualificationValue,
                        Subject:subjectValue,
                        studOrTeach: ST,
                        Chats:[]
                    }).then (()=>{ 
                        e.preventDefault();
                        if(confirm("You have been successfully registered")){
                        location.href="Login.html"
                    }});

                })
            promise.catch(e => {
                console.log(e.message)
                alert(e.message);
            })
            }
          
        }
    })
function show() {
    var icon = document.getElementById("icon")
    if (txtPassword.type === "password") {
        txtPassword.type = "text"
        icon.style.color = "grey"
    } else {
        txtPassword.type = "password"
        icon.style.color = '#eeeeee';
    }
}
