function mailTest() {

  const recipient = 'from@example.com'; //送信先のメールアドレス
  const subject = 'subject';

  const recipientCompany = 'hoge';
  const recipientName = 'fuga';
  const body = `${recipientCompany}n${recipientName}様nテストメールをお送りいたします！`;
  
  const options = {name: 'piyo'};
  
  GmailApp.sendEmail(recipient, subject, body, options);

}
