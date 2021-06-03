var newPassword = document.getElementById("newPassword")
const email = localStorage.getItem('email')
const password = localStorage.getItem('password')
document.getElementById("newEmail").value = email;
document.getElementById("newPassword").value = password;
if (localStorage.getItem('sOrT') === "student") {
    var grade = localStorage.getItem('Grade')
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Grade : " + grade
    document.getElementById("field").innerHTML = "<label>Grade:</label><input type='number' class='form-control' id='grade' min='06' max='12' placeholder=" + grade + ">";
    document.getElementById("navbar").innerHTML = "  <li><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Subjects</a></li> <li><a href='Teacher.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Teachers</a></li>"
} else {
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Teacher"
    var qualification = localStorage.getItem('qualification')
    document.getElementById("field").innerHTML = "<label>Qualification:</label><select name='qualification' id='qual'><option value='PGT'>PGT</option><option value='TGT'>TGT</option></select><br><br>"
    document.getElementById("navbar").innerHTML = "<li ><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Grades</a></li> <li><a href='tChat.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Chats</a></li>"
    document.getElementById("qual").value = qualification
}

document.getElementById("Updatebtn").addEventListener('click', e => {
    e.preventDefault();


    const newEmail = document.getElementById("newEmail").value
    const newPassword1 = document.getElementById("newPassword").value
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (userCredentials) {

            userCredentials.user.updateEmail(newEmail)
            userCredentials.user.updatePassword(newPassword1)
            if (localStorage.getItem('sOrT') === "teacher") {
                const qualValue = document.getElementById("qual").value
                db.collection("users").doc(userCredentials.user.uid).update({
                    Qualification: qualValue
                })
                localStorage.setItem('qualification', qualValue)
            } else {
                const newGrade = document.getElementById('grade').value

                db.collection("users").doc(userCredentials.user.uid).update({
                    Grade: newGrade
                })
                localStorage.setItem('Grade', newGrade)
            }
            alert("Your Profile has been updated")
        })


}
)

function show() {

    var icon = document.getElementById("icon")
    if (newPassword.type === "password") {
        newPassword.type = "text"
        icon.style.color = "grey"
    } else {
        newPassword.type = "password"
        icon.style.color = '#eeeeee';
    }
}
function Signout() {
    firebase.auth().signOut().then(() => {
        location.href = "HomePage2.html"
    })
}