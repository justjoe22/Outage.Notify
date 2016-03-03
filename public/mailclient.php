<?php
 
     if($_POST){
         header('content-type: application/json; charset=utf-8');
         header("access-control-allow-origin: *");
 
         $name = $_POST['name'];
         $email = $_POST['email'];
         $message = $_POST['message'];
 
         $to = "justjoe22@gmail.com";
         $subject = "Order Request";
 
         $result = mail("justjoe22@gmail.com", "Comment from" .$email, $message);
         
         if(!$result) {   
             echo json_encode('failed');  
         } else {
             echo json_encode('success');
         }
     }
     else{
         echo json_encode('failed');
     }
 
 ?>