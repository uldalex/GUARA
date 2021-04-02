<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	if (isset($_POST['razm'])) {$razm= $_POST['razm'];} /*Поле размещение камеры*/
	if (isset($_POST['expl'])) {$expl= $_POST['expl'];} /*Поле эксплуатация*/
	if (isset($_POST['temp'])) {$temp= $_POST['temp'];} /*Температурный режим*/
	if (isset($_POST['ob'])) {$ob= $_POST['ob'];} /*Объем помещения*/
	if (isset($_POST['ut'])) {$ut= $_POST['ut'];} /*Утепление*/
	if (isset($_POST['tol'])) {$tol= $_POST['tol'];} /*Толщина утепления мм*/
	if (isset($_POST['pr'])) {$pr= $_POST['pr'];} /*Продукт хранения*/
	if (isset($_POST['obq'])) {$obq= $_POST['obq'];} /*Объем продукта, кг */
	if (isset($_POST['tkam'])) {$tkam= $_POST['tkam'];} /*Температура в камере*/
	if (isset($_POST['sity'])) {$sity= $_POST['sity'];} /*Город*/
	if (isset($_POST['ur'])) {$ur= $_POST['ur'];} /*Юридическая форма*/
    if (isset($_POST['fio'])) {$name = $_POST['fio'];} /*Имя поля формы*/
    if (isset($_POST['ph'])) {$phone = $_POST['ph'];}/*Имя поля формы*/
    if (isset($_POST['ma'])) {$email = $_POST['ma'];} /*Имя поля формы*/
	if (isset($_POST['msg'])) {$comment = $_POST['msg'];} /*Имя поля формы*/
    if (isset($_POST['formData1'])) {$formData = $_POST['formData1'];} /*Значение скрытого инпута в форме, нужно для заголовка письма*/
	
    
    $to = "uldalex@gmail.com"; 
    $sendfrom   = "uldalex@gmail.com"; /*Адрес, с которого будет приходить письмо, можно не настоящий, нужно для формирования заголовка письма*/
    $headers  = "From: " . strip_tags($sendfrom) . "\r\n";
    $headers .= "Reply-To: ". strip_tags($sendfrom) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";
    $subject = "$formData";
    $message = "$formData
	<p><b>Требуется расчет по параметрам:</b></p></br>
	<b>Размещение камеры</b>  $razm </br>
	<b>Эксплуатация</b> $expl </br>
	<b>Температурный режим</b>  $temp </br>
	<b>Объем помещения</b> $ob </br>
	<b>Утепление</b>  $ut </br>
	<b>Толщина утепления мм</b> $tol </br>
	<b>Продукт хранения</b>  $pr </br>
	<b>Объем продукта, кг</b> $obq </br>
	<b>Температура в камере</b> $tkam </br>
	<b>Город</b> $sity </br> 
	<b>Юридическая форма</b> $ur </br> 
	<b>Имя:</b> $name </br>
	<b>Телефон для связи:</b> $phone </br>
	<b>Адрес электронной почты:</b> $email </br>
	<b>Комментарий:</b> $comment ";
    $send = mail ($to, $subject, $message, $headers);
    if ($send == 'true')
    {
    echo '<center><span style="color:#000"> 

Наши менеджеры свяжутся  с Вами в ближайшее время.

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