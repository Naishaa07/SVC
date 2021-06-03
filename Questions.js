
var userid = localStorage.getItem('uid')
console.log(userid)
const txt = document.getElementById("txt");
var Name;
var chosenSubject=localStorage.getItem("clickedSubject")
var signinGrade = localStorage.getItem("Grade")
var text
var currentdate = new Date();
var date = currentdate.toString();
var x = 0;
var rName, rMessage, rTime, replyInfo;

var collection= signinGrade+chosenSubject
document.getElementById('send').addEventListener('click', e => {
    var text = txt.value;
    console.log(text)
    var xyz = db.collection(collection).doc();
    xyz.set({
        text: text,
        name: localStorage.getItem('Name'),
        CreatedAt: date,
        timeStamp: currentdate
    })
    console.log(xyz)
    xyz.collection("reply").add({
        time: "",
        name: "",
        Message: ""
    })
    /*Email.send({
        Host: "Mail.Crackit.com",
        Username: "Crackit!!",
        Password: "princess2007",
        To: 'naishaa2007@gmail.com',
        From: "noreply@silicon-valley-challenge-97eed.firebaseapp.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
      })
        .then(function (message) {
          alert("mail sent successfully")
        });*/
   
})

console.log(collection)
var abc = db.collection(collection)
.orderBy("timeStamp", "asc")
.get().then(
    (snapshot) => {

        snapshot.forEach(doc => {


            console.log(doc.data());
            var qName = doc.data().name;
            var CreatedAt = doc.data().CreatedAt;
            var qTime = CreatedAt.slice(16, 21)
            var qMessage = doc.data().text;
            db.collection(signinGrade+chosenSubject).doc(doc.id).collection("reply")
                .orderBy("timeStamp", "asc")
                .get().then(
                    (snapshot) => {
                        x = x + 1
                        document.getElementById("Message").innerHTML += "<pre style='background-color:#00adb5; color:#f8f3d4;white-space:pre-wrap'><p style='margin-bottom:-35px; text-align:right; margin-left:5px'>"
                            + qName + " " + qTime + '<p/>' + "<p style='font-size:20px; margin-right:150px'><b>" + qMessage + '<b/><p/>' + '<pre/>' + '<br/>' +
                            '<p id="replyinfo" style="padding-left: 20px; padding-right: 20px;"></p>' +
                            '<input type="text" class="form-control" id="reply" placeholder="type your reply">' +
                            '<center><button type="button" id="replyButton" onClick="replyButton(this.id)" style="background-color:#00adb5;margin-top:10px; height:40px; width:70px;border-radius:10px; color:#222831;font-weight:bold">Reply</button></center>' 
                            + '<br/>' + '<br/>';
                        document.getElementById('replyinfo').id = "replyinfo" + x;
                        document.getElementById('replyButton').id = "replyButton" + x;
                        document.getElementById('reply').id = "reply" + x;
                        document.getElementById('replyButton' + x).setAttribute('docId', doc.id);
                        document.getElementById('reply' + x).setAttribute('docId', doc.id);
                        document.getElementById('replyButton' + x).setAttribute('no', x);
                        document.getElementById('reply' + x).setAttribute('no', x);


                        snapshot.forEach(doc => {
                            rName = doc.data().name
                            rMessage = doc.data().Message
                            rTime = doc.data().time.slice(16, 21)
                            if (rMessage !== "") {
                                document.getElementById("replyinfo" + x).innerHTML += "<div style='background-color:#00adb5; padding:5px; border-radius:10px;margin-bottom:10px;'>"+"<div><p style='font-size:15px;white-space:normal;width:85%;color:#222831;'>" + rMessage + "<p/><div/>"+"<div style='margin-left:86%' ><p style='margin-top:-30px;text-align:right;width:15%;color:#222831;'>" + rName + " " + rTime +"<p/><div/><div/>";
                            }
                        })
                    })
        }
        )
    }
);

function replyButton(clicked_id) {
    var id = document.getElementById(clicked_id).getAttribute('docId');
    var no = document.getElementById(clicked_id).getAttribute('no');
    const replyMessage = document.getElementById('reply' + no);
    //  document.getElementById('replyButton' + x).addEventListener('click', e => {

    var replyMessage1 = replyMessage.value;
    if (replyMessage1 !== "") {
        db.collection(signinGrade+chosenSubject).doc(id).collection("reply").add({
            Message: replyMessage1,
            time: date,
            name: localStorage.getItem('Name'),
            timeStamp: currentdate
        })
    }
}
function Signout(){
firebase.auth().signOut().then(()=>{
 location.href="HomePage2.html"
    })
}
if(localStorage.getItem('sOrT')==="student"){
    document.getElementById("tooltiptext").innerHTML=localStorage.getItem('Name')+"<br>"+"Teacher"
    document.getElementById("navbar").innerHTML="  <li><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Subjects</a></li> <li><a href='Teacher.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Teachers</a></li>"
} else{
    document.getElementById("tooltiptext").innerHTML=localStorage.getItem('Name')+"<br>"+"Teacher"
    document.getElementById("navbar").innerHTML="  <li><a href='AfterSignin.html' style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Grades</a></li> <li><a href='tChat.html'style='color: eeeeee; font-size: 25px;height: 100px;padding: 37.5px;background-color:#393e46'>Chats</a></li>"
}