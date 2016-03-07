<?php
 
     if($_POST){
         header('content-type: application/json; charset=utf-8');
         header("access-control-allow-origin: *");
 
         $to = $_POST['to'];
         $name = $_POST['name'];
         $from = $_POST['from'];
         $message = $_POST['message'];
         
         $subject = $_POST['subject'];
         
         $headers= "From: Outage Notify <noreply@outage.net>\r\n";
         $headers.= "Reply-To: $name <$from>\r\n";
         $headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
         $headers.= "MIME-Version: 1.0" . "\r\n";
         $headers.= "Content-type: text/html; charset=iso-8859-1";
 
         $result = mail($to, $subject, $message, $headers);
         
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