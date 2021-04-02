<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}/*Имя поля формы*/
    if (isset($_POST['formData'])) {$formData = $_POST['formData'];} /*Значение скрытого инпута в форме, нужно для заголовка письма*/
	
    
    $to = "uldalex@gmail.com"; 
    $sendfrom   = "uldalex@gmail.com"; /*Адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
    $message = "$formData
 <b>Сообщение из формы Свяжитесь со мной:</b>
<b>Телефон для связи:</b> $phone";
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