<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['name'])) {$name = $_POST['name'];} /*Имя поля формы*/
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}/*Имя поля формы*/
    if (isset($_POST['email'])) {$email = $_POST['email'];} /*Имя поля формы*/
    if (isset($_POST['formData2'])) {$formData = $_POST['formData2'];} /*Значение скрытого инпута в форме, нужно для заголовка письма*/
	
    
    $to = "uldalex@gmail.com"; 
    $sendfrom   = "uldalex@gmail.com"; /*Адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
    $message = "$formData
 <p>Сообщение с сайта GUARA из формы обратной связи</p>
 <b>Имя:</b> $name
<b>Телефон для связи:</b> $phone
<b>Адрес электронной почты:</b> $email ";
    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true')
    {
    echo '<center><span style="color:#000"> 

Спасибо! Наши менеджеры свяжутся  с Вами в ближайшее время.

</span></center>';
    }
    else
    {
    echo '<center>

<b>Ошибка. Сообщение не отправлено!</b>

</center>';
    }
} else {
    http_response_code(403);
    echo "Попробуйте еще раз";
}?>