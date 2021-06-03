var userid = localStorage.getItem('uid')
console.log(userid)
const txt = document.getElementById("txt");
var Name, signinGrade, userName;
var chosenSubject = localStorage.getItem("clickedSubject")
var text
var currentdate = new Date();
var date = currentdate.toString();
var x = 0;
var TName = localStorage.getItem('Tname')
var rName, rMessage, rTime, replyInfo;
var docref = db.collection('users').get().then(
    (snapshot) => {
        snapshot.forEach(doc => {
            if (doc.id === userid) {
                userName = doc.data().Name
                signinGrade = doc.data().Grade;
            }
        });
    }
)


if(localStorage.getItem('sOrT')==="student"){
 
    document.getElementById("navbar").innerHTML="  <li><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Subjects</a></li> <li><a href='Teacher.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Teachers</a></li>"
document.getElementById('send').addEventListener('click', e => {
    
    db.collection('users').doc(tId).update({
        Chats:firebase.firestore.FieldValue.arrayUnion(userid)
    })
})
var docref = db.collection('users').get().then(
    (snapshot) => {
        snapshot.forEach(doc => {
            if (doc.id === userid) {
                Name = doc.data().Name
                signinGrade = doc.data().Grade;
                localStorage.setItem("sName", userName)
                
            }
        });
    }
)
document.getElementById("TeacherName").innerHTML=TName
localStorage.setItem('sId', userid)
document.getElementById("tooltiptext").innerHTML=localStorage.getItem('Name')+"<br>"+"Grade : "+localStorage.getItem('Grade')
}
document.getElementById('send').addEventListener('click', e => {
    var text = txt.value;
   e.preventDefault();
    if(text !== ""){
    var xyz = db.collection('users').doc(tId).collection(sId).doc();
    console.log(userName)
    xyz.set({
        text: text,
        name: userName,
        CreatedAt: date,
        timeStamp: currentdate
    })
.then( e=>{location.reload()})
}
}) 
var sName= localStorage.getItem('sName')
if(localStorage.getItem('sOrT')==="teacher"){
    document.getElementById("tooltiptext").innerHTML=TName+"<br>"+"Teacher"
    document.getElementById("navbar").innerHTML="<li ><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Grades</a></li> <li><a href='tChat.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Chats</a></li>"
    localStorage.setItem('tId', userid)
db.collection('users').doc(userid).get().then((snapshot)=>{
    localStorage.setItem('Tname', snapshot.data().Name)
})
document.getElementById("TeacherName").innerHTML=sName
}
var sId = localStorage.getItem('sId')
console.log(sId)
var tId= localStorage.getItem('tId');

db.collection('users').doc(tId).collection(sId)
    .orderBy("timeStamp", "asc")
    .get().then(
        (snapshot) => {
            snapshot.forEach(doc => {
                console.log(doc.data());
                var qName = doc.data().name;
                var CreatedAt = doc.data().CreatedAt;
                var qTime = CreatedAt.slice(16, 21)
                var qMessage = doc.data().text;
                console.log(qMessage)
                x = x + 1
               document.getElementById("Message").innerHTML +="<section id='text'>"  + "<p style='font-size:20px; margin-right:150px; width:75%; word-wrap:break-word'><b>" + qMessage+ '<p/>' + 
               "<p style='color:#eeeee;width:20%;word-wrap:break-word'><p style='margin-top:-20px; text-align:right; margin-left:5px'>"
               + qName + " " + qTime+ "<b/><p/>"+"</section>" +
                '<br/>' + '<br/>';
                    
            })
        })

function Signout() {
    firebase.auth().signOut().then(() => {
        location.href = "HomePage2.html"
    })
}
function back(){
    location.href="Teacher.html"
}