<?php
 
     if($_POST){
         header('content-type: application/json; charset=utf-8');
         header("access-control-allow-origin: *");
 
         $to = $_POST['to'];
         $name = $_POST['name'];
         $from = $_POST['from'];
         $bcc = $_POST['bcc'];
         $message = $_POST['message'];
         $subject = $_POST['subject'];
         
         $headers= "From: IT Notify <noreply@notifyme.net>\r\n";
         $headers.= "Reply-To: $name <$from>\r\n";
         $headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
         $headers.= "MIME-Version: 1.0" . "\r\n";
         $headers.= "Content-type: text/html; charset=iso-8859-1\r\n";
         $headers.= "Bcc: $bcc";
 
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