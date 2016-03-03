<?php

  if (isset($_POST['from']) && isset($_POST['message'])) 
  { 
     $to = "justjoe22@gmail.com";
     $subject = $_POST['from'];
     $body = $_POST['message'];

     if (mail($to, $subject, $body))
     echo json_encode('success'); 
     else 
     echo json_encode('failed');

    } 
    else
    echo json_encode('failed');

?>
