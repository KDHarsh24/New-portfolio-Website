<?php
//get data from form  

$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$to = "kdharsh24@gmail.com";
$subject = "Mail From My Website";
$txt ="Name : ". $name . "\r\n  Email : " . $email . "\r\n Message :\n" . $message;
$headers = "From: noreply@MySite.com" . "\r\n" .
"CC: somebodyelse@example.com";
if($email!=NULL)
{
    mail($to,$subject,$txt,$headers);
}
?>