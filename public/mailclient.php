<?php
 
     if($_POST){
         header('content-type: application/json; charset=utf-8');
         header("access-control-allow-origin: *");
 
         $to = $_POST['to'];
         $name = $_POST['name'];
         $from = $_POST['from'];
         $message = $_POST['message'];
         
         $subject = "Your approval is required";
 
         $result = mail($to, $from, $message);
         
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